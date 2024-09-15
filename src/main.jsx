import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";
import "./style.css";
import "./index.css";
import ModalContextProvider from "./providers/ModalProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </Provider>
);
