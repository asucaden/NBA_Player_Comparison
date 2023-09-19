import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Rater from "./components/rater/Rater";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App2.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rater" element={<Rater />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
