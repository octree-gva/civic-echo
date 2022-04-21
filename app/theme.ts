import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "IBM Plex Mono",
  },
  palette: {
    primary: {
      light: "#79f466",
      main: "#3fc035",
      dark: "#008e00",
    },
    secondary: {
      light: "#f6f5f2",
      main: "#e1e0dd",
      dark: "#818181",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
        },
        textSecondary: {
          color: "#818181",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
          },
        },
      },
    },
  },
});

export default theme;
