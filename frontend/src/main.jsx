import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./bootstrap.min.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { MathJaxContext } from "better-react-mathjax";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MathJaxContext>
      <App />
    </MathJaxContext>
  </Provider>
);
