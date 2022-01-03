import "./App.css";
import "./normalize.css";
import Homepage from "./pages/Homepage";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Homepage />
    </AppContextProvider>
  );
}

export default App;
