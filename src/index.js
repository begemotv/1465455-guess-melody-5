import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import App from "./components/app/app";
import rootReducer from "./store/reducers";
import {fetchQuestionList} from "./store/api-actions/api-actions";
import {createAPI} from "./services/api";

const api = createAPI(
    () => store.dispatch()
);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(fetchQuestionList());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
