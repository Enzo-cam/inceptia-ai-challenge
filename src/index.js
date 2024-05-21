import './index.css';
import { StrictMode } from "react";
import reactDom from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import App from './App';


const rootElement = document.getElementById("root");
  
reactDom.render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </StrictMode>,
    rootElement
);

serviceWorker.unregister();
