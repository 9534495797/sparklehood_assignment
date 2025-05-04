// src/components/IncidentItem.tsx

import React, { useState } from 'react';
import { Incident } from '../types/Incident';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  // Toggle incident details visibility
  const toggleDetails = () => {
    setDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className="incident-item">
      <h3>{incident.title}</h3>
      <p>Severity: {incident.severity}</p>
      <p>Reported At: {new Date(incident.reported_at).toLocaleString()}</p>

      {/* "View Details" Button */}
      <button onClick={toggleDetails}>
        {isDetailsVisible ? 'Hide Details' : 'View Details'}
      </button>

      {/* Full Description */}
      {isDetailsVisible && <p>{incident.description}</p>}
    </div>
  );
};

export default IncidentItem;
