import * as React from "react";
import * as ReactDOM from "react-dom";

import { takeLatest } from "@redux-saga/core/effects";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { SagaIterator } from "redux-saga";
import { Results } from "~components/results";
import { SearchBox } from "~components/search-box";
import { searchReposReducer, searchReposSaga } from "~state/github";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  combineReducers({ repos: searchReposReducer }),
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function* rootSaga(): SagaIterator {
  yield takeLatest("SEARCH_REPOS", searchReposSaga);
}

// then run the saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SearchBox />
      <Results />
    </div>
  </Provider>,
  document.getElementById("root")
);
