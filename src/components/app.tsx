import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { Results } from "./results";
import { SearchBox } from "./search-box";

export const App = () => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">React Redux Saga Sagamatron 🧙🧙🧙</Typography>
      </Toolbar>
    </AppBar>

    <Container maxWidth="md">
      <Box paddingTop={5}>
        <SearchBox />
      </Box>
      <Box paddingTop={5}>
        <Results />
      </Box>
    </Container>
  </div>
);
