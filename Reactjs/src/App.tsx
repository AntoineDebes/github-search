import "./App.css";
import "./normalize.css";
import Homepage from "./pages/Homepage";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <>
        <Homepage />
      </>
    </AppContextProvider>
  );
}

export default App;
