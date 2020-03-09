import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
//https://github.com/facebook/create-react-app/issues/3621
import './styles/main.css';
import './styles/Responsive.css';
import { BrowserRouter, HashRouter,Router, Route } from "react-router-dom";
import { withTracker } from './utils/withTracker';
import { Provider } from "react-redux";
import store from './store/configureStore';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={withTracker(App)} />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root")
);