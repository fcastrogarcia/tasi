import { createMuiTheme, withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fb923c",
      main: "#ff6319",
      dark: "#ef4d00",
      contrastText: "#fff",
    },
  },
});

export const GlobalCss = withStyles({
  "@global": {
    ".container": {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100%",
      width: "100%",
      maxWidth: 1280,
      position: "relative",
    },
  },
})(() => null);

export default theme;
