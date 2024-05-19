import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-app-polyfill/ie11";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  "Welcome to Inceptia React Challenge",
  document.getElementById("root")
);

serviceWorker.unregister();