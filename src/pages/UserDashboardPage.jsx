import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/tournament/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setTournaments(data.tournaments);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTournament = () => {
    navigate("/create-tournament");
  };

  const handleEdit = (tournamentId) => {
    // TODO: Navigate to edit page
    console.log("Edit tournament:", tournamentId);
  };

  const handleDelete = async (tournamentId) => {
    if (!window.confirm("Are you sure you want to delete this tournament?\n\n*Removing this tournament will result in loss of tournament data*")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/tournament/${tournamentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh tournaments list
        fetchTournaments();
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  const handleViewDetails = (tournamentId) => {
    // TODO: Navigate to details page
    console.log("View details:", tournamentId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="create-tournament-section">
        <button className="create-tournament-btn" onClick={handleCreateTournament}>
          Create<br />Tournament
        </button>
        <p className="instructions">
          *To create a tournament press the Create Tournament button and fill out the form with the tournament, location, date, and time. Press the submit button, and you will be able to add the teams later*
        </p>
      </div>

      <div className="active-tournaments-section">
        <h3 className="section-title">Active Tournaments</h3>

        {loading ? (
          <p className="no-tournaments">Loading...</p>
        ) : tournaments.length === 0 ? (
          <p className="no-tournaments">No active tournaments</p>
        ) : (
          <div className="tournaments-list">
            {tournaments.map((tournament) => (
              <div key={tournament._id} className="tournament-card">
                <span className="tournament-name">{tournament.name}</span>
                <div className="tournament-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(tournament._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(tournament._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleViewDetails(tournament._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;