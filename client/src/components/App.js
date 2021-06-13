import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import Post from "./Pages/Post";
import Layout from "./Layout";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#000000",
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
            <Route path="/profile/:id">
              <Profile />
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
