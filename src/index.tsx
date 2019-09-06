import * as React from "react";
import * as ReactDOM from "react-dom";

import { Box, makeStyles, Toolbar, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { takeLatest } from "@redux-saga/core/effects";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { SagaIterator } from "redux-saga";
import { Results } from "~components/results";
import { SearchBox } from "~components/search-box";
import { rootReducer, rootSaga } from "~state/github";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  combineReducers(rootReducer),
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(rootSaga);

const Root = () => (
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

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
