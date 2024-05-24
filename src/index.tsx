import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import App from './App';
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    rootElement
);

serviceWorker.unregister();
