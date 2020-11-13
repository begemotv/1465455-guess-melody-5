import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from "./components/app/app";
import rootReducer from "./store/reducers";
import {requireAuthorization} from "./store/action";
import {fetchQuestionList, checkAuth} from "./store/api-actions/api-actions";
import {AuthorizationStatus} from "./const";
import {createAPI} from "./services/api";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(fetchQuestionList());
store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
