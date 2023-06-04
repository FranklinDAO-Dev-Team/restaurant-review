import { Request, Response } from "express";
import stream from "stream";
import {
  ReviewMetadata,
  getReviewsByRestaurantIdFromDb,
} from "../models/review";

const getFileFromIpfs = async (ipfsHash: string) => {
  const result = await fetch(
    `${process.env.IPFS_GATEWAY_URL}/ipfs/${ipfsHash}`
  );

  return result;
};

const getReviewsByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const rawResult = await getReviewsByRestaurantIdFromDb(
    parseInt(restaurantId, 10)
  );

  const result = await Promise.all(
    rawResult.map(async (review) => {
      if (!review.metadata) {
        return review;
      }
      const response = await getFileFromIpfs(review.metadata);
      const metadata = (await response.json()) as ReviewMetadata;
      return {
        ...review,
        parsedMetadata: metadata,
      };
    })
  );

  res.send(result);
};

const getReviewImageByIpfsHash = async (req: Request, res: Response) => {
  const { ipfsHash } = req.params;
  const response = await getFileFromIpfs(ipfsHash);
  res.set("Content-Type", response.headers.get("Content-Type") || undefined);

  const fileContents = Buffer.from(await response.arrayBuffer());

  const readStream = new stream.PassThrough();
  readStream.end(fileContents);

  readStream.pipe(res);
};

const pinFileToIPFS = async (file: Express.Multer.File) => {
  const formData = new FormData();

  formData.append("file", new Blob([file.buffer]));

  const metadata = JSON.stringify({
    name: file.originalname,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  const res = await fetch(`${process.env.PINATA_URL}/pinning/pinFileToIPFS`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_TOKEN}`,
    },
    body: formData,
  });

  const json = await res.json();

  return json.IpfsHash;
};

const createReviewMetadata = async (req: Request, res: Response) => {
  const { comment } = req.body;
  const images = req.files as Express.Multer.File[];
  const fileHashes = await Promise.all(
    images.map((image) => pinFileToIPFS(image))
  );

  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 0,
    },
    pinataMetadata: {
      name: "review",
    },
    pinataContent: {
      comment: comment,
      imageHashes: fileHashes,
    },
  });

  const result = await fetch(
    `${process.env.PINATA_URL}/pinning/pinJSONToIPFS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: data,
    }
  );

  const json = await result.json();

  res.send(json.IpfsHash);
};

export {
  getReviewsByRestaurantId,
  getReviewImageByIpfsHash,
  createReviewMetadata,
};
