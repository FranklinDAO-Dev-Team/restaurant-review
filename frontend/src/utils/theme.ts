import { autocompleteClasses, outlinedInputClasses } from "@mui/material";
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
          backgroundColor: "rgba(40, 40, 40)",
          "&:hover": {
            color: "yellow",
            borderColor: "yellow",
            backgroundColor: "rgba(50, 50, 50)",
          },
        },
        outlined: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            color: "white",
            fontSize: "1.5rem",
            textAlign: "center",
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
            fontSize: "1.5rem",
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
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
        bar: {
          backgroundColor: "yellow",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
        circle: {
          color: "white",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: "solid",
          borderColor: "yellow",
          borderWidth: "2px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(50, 50, 50)",
          border: "solid",
          borderColor: "yellow",
          borderWidth: "2px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "white",
          textAlign: "center",
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          color: "yellow",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(40, 40, 40)",
          },
          "&.Mui-selected": {
            backgroundColor: "yellow",
            color: "black",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
  },
});

export { theme };
