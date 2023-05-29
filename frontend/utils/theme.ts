import {
  autocompleteClasses,
  buttonClasses,
  outlinedInputClasses,
  textFieldClasses,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderColor: "white",
          "&:hover": {
            color: "yellow",
            borderColor: "yellow",
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "white",
            borderWidth: "1px",
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "yellow",
            borderWidth: "1px",
          },
          [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: "yellow",
              borderWidth: "2px",
            },
          [`& .${outlinedInputClasses.input}`]: {
            color: "white",
            fontSize: "2rem",
            textAlign: "center",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        clearIndicator: {
          color: "yellow",
        },
        popupIndicator: {
          color: "yellow",
        },
        paper: {
          marginTop: "1rem",
          backgroundColor: "transparent",
          border: "solid",
          borderColor: "yellow",
          borderWidth: "2px",
          color: "white",
        },
        noOptions: {
          color: "white",
        },
        loading: {
          color: "white",
        },
        listbox: {
          [`& .${autocompleteClasses.option}`]: {
            backgroundColor: "transparent",
          },
          [`& .${autocompleteClasses.option}.Mui-focused`]: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
          [`& .${autocompleteClasses.option}[aria-selected="true"]`]: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          [`& .${autocompleteClasses.option}.Mui-focused[aria-selected="true"]`]:
            {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
        },
      },
    },
  },
});

export { theme };
