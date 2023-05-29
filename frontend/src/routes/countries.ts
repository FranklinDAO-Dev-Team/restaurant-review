import axios from "axios";
import { BASE_SERVER_URL } from "../../utils/env";

const getAllCountries = async () => {
  const result = await axios.get(`${BASE_SERVER_URL}/api/countries`);
  return result.data;
};

export { getAllCountries };
