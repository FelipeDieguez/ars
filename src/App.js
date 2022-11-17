import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FundArs from "./components/pages/FundArs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FundArs />} />
      </Routes>
    </Router>
  );
}

export default App;
