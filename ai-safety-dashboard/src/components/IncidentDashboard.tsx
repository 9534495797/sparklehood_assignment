import React, { useState } from "react";

type Incident = {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
};

const IncidentDashboard: React.FC = () => {
  // Mock data
  const mockData = [
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description: "Algorithm consistently favored certain demographics...",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z",
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description: "LLM provided incorrect safety procedure information...",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z",
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description: "Chatbot inadvertently exposed non-sensitive user metadata...",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z",
    },
  ];

  // State to hold incidents
  const [incidents, setIncidents] = useState<Incident[]>(mockData);
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "Low",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewIncident((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncidentWithId = {
      ...newIncident,
      id: incidents.length + 1, // auto-generate ID
      reported_at: new Date().toISOString(),
    };
    setIncidents((prevIncidents) => [...prevIncidents, newIncidentWithId]);
    setShowForm(false); // Hide form after submission
    setNewIncident({ title: "", description: "", severity: "Low" }); // Reset form
  };

  // Filter incidents based on severity
  const filteredIncidents =
    filterSeverity === "All"
      ? incidents
      : incidents.filter((incident) => incident.severity === filterSeverity);

  // Sort incidents based on the selected sort order
  const sortedIncidents = filteredIncidents.sort((a, b) => {
    return sortOrder === "Newest First"
      ? new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
      : new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
  });

  return (
    <div className="IncidentDashboard">
      <h1>AI Safety Incident Dashboard</h1>

      <div className="controls">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Report New Incident"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newIncident.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newIncident.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              name="severity"
              value={newIncident.severity}
              onChange={handleInputChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit">Submit Incident</button>
        </form>
      )}

      <div>
        {sortedIncidents.map((incident) => (
          <div key={incident.id} className="incident-item">
            <h3>{incident.title}</h3>
            <p>{incident.severity} | {new Date(incident.reported_at).toLocaleDateString()}</p>
            <button onClick={() => alert(incident.description)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentDashboard;
