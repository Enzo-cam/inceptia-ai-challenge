import './index.css';
import React from 'react'; // Asegúrate de importar React
import ReactDOM from 'react-dom'; // Usar 'ReactDOM' en lugar de 'reactDom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store';
import App from './App';
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root") as HTMLElement; // Asegurar el tipo de `rootElement`

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
