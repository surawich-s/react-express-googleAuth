import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import Post from "./Pages/Post";
import EditProfile from "./Pages/EditProfile";
import Layout from "./Layout";

const theme = createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: 0,
        },
      },
    },
    MuiOutlinedInput: {
      multiline: {
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingRight: "5px",
        paddingLeft: "5px",
      },
      input: {
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingRight: "5px",
        paddingLeft: "5px",
      },
    },
  },
  palette: {
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route exact path="/profile/:id">
              <Profile />
            </Route>
            <Route path="/profile/:id/edit">
              <EditProfile />
            </Route>
            <Route path="/p/:id">
              <Post />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
