import * as React from "react";
import * as ReactDOM from "react-dom";

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
import { Typography, Toolbar, Box, makeStyles } from "@material-ui/core";

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

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    // tslint:disable-next-line: no-unsafe-any
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Root = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Redux Saga Sagamatron 🧙🧙🧙
          </Typography>
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
};

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
