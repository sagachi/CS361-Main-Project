import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/UserDashboardPage";
import CreateTournament from "./pages/CreateTournamentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
      </Routes>
    </Router>
  );
}

export default App;
