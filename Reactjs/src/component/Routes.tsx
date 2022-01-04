import {
  BrowserRouter as Router,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";
import Homepage from "../pages/Homepage";

function Routes() {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<Homepage />} />
      </ReactRoutes>
    </Router>
  );
}

export default Routes;
