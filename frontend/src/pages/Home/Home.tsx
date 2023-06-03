import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAllCountries } from "../../routes/countries";
import { getAllCitiesByCountryName } from "../../routes/cities";

function Home() {
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<string[] | null>(null);
  const [cities, setCities] = useState<string[] | null>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);

  const handleChangeCountry = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    event.preventDefault();
    setSelectedCountryName(value);
  };

  const handleSubmitCountry = (event: FormEvent<HTMLButtonElement>) => {
    console.log("submit");
    event.preventDefault();
    if (selectedCountryName != null) {
      setStage(2);
      (async () => {
        setLoading(true);
        setCities(await getAllCitiesByCountryName(selectedCountryName));
        setLoading(false);
      })();
    }
  };

  const handleChangeCity = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    event.preventDefault();
    setSelectedCityName(value);
  };

  const handleSubmitCity = (event: FormEvent<HTMLButtonElement>) => {
    console.log("submit");
    event.preventDefault();
    if (selectedCityName != null) {
      setStage(3);
    }
  };

  useEffect(() => {
    if (countries != null) return;

    (async () => {
      setLoading(true);
      setCountries(await getAllCountries());
      setLoading(false);
    })();
  });

  if (stage === 1) {
    return (
      <>
        <Typography variant="h3" fontWeight="bold" color="white">
          So... wya?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "1rem",
          }}
        >
          <Autocomplete
            autoComplete
            autoSelect
            sx={{
              width: "30rem",
            }}
            options={countries ?? []}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter a country..."
              />
            )}
            onChange={handleChangeCountry}
          />
          <Button
            variant="outlined"
            sx={{ height: "100%", fontSize: "30px" }}
            onClick={handleSubmitCountry}
          >
            ➤
          </Button>
        </Box>
      </>
    );
  }

  if (stage === 2) {
    return (
      <>
        <Typography variant="h3" fontWeight="bold">
          So, u in {selectedCountryName}, eh?
        </Typography>
        <Typography variant="h3" fontWeight="bold">
          ... but where u <span style={{ color: "yellow" }}>really</span> at?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "1rem",
          }}
        >
          <Autocomplete
            autoComplete
            autoSelect
            sx={{
              width: "30rem",
            }}
            options={cities ?? []}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter a city..."
              />
            )}
            onChange={handleChangeCity}
          />
          <Button
            variant="outlined"
            sx={{ height: "100%", fontSize: "30px" }}
            onClick={handleSubmitCity}
          >
            ➤
          </Button>
        </Box>
      </>
    );
  }

  if (stage === 3) {
    return (
      <Navigate to={`/${selectedCountryName}/${selectedCityName}`} replace />
    );
  }

  return (
    <Button
      variant="outlined"
      size="large"
      sx={{ fontSize: "30px" }}
      onClick={() => setStage(1)}
    >
      Enter the restaurantverse ➤
    </Button>
  );
}

export { Home };
