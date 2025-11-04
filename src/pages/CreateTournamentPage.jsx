import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTournament.css";

function CreateTournament() {
  const navigate = useNavigate();
  const [uploadMethod, setUploadMethod] = useState("computer");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    logo: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file");
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData({
          ...formData,
          logo: reader.result, // Store base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      logo: url,
    });
    
    // Set preview if URL is valid
    if (url) {
      setLogoPreview(url);
    } else {
      setLogoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("Please log in first");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/tournament/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate back to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to create tournament");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Create tournament error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleAddTeams = () => {
    navigate("/add-teams");
  };

  return (
    <div className="create-tournament-container">
      <h1 className="page-title">Create Tournament</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="content-wrapper">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="form-input"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="time"
              name="time"
              placeholder="Time"
              className="form-input"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </form>
        </div>

        <div className="logo-section">
          <h3 className="logo-title">Add Tournament Logo</h3>
          <div className="logo-upload-area">
            {/* Image preview at the top */}
            {logoPreview && (
              <div className="logo-preview-wrapper">
                <img src={logoPreview} alt="Logo preview" className="logo-preview" />
              </div>
            )}
            
            {/* Upload options always visible */}
            <div className="upload-options">
              <div className="computer-upload">
                <label htmlFor="file-upload" className="upload-btn">
                  Upload from<br />computer
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                />
              </div>
              <div className="url-upload">
                <label>Upload from url:</label>
                <input
                  type="text"
                  name="logo"
                  placeholder="https://"
                  value={formData.logo}
                  onChange={handleUrlChange}
                  className="url-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-row">
        <button type="submit" className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Submit"}
        </button>
      </div>

      <div className="bottom-buttons">
        <button className="back-btn" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <button className="add-teams-btn" onClick={handleAddTeams}>
          Add Teams
        </button>
      </div>
    </div>
  );
}

export default CreateTournament;