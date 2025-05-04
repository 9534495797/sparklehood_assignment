// src/components/IncidentList.tsx

import React, { useState } from 'react';
import { Incident } from '../types/Incident';
import { mockIncidents } from '../data/mockData';
import IncidentItem from './IncidentItem';

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filteredSeverity, setFilteredSeverity] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('Newest First');

  // Filter incidents by severity
  const filteredIncidents = incidents.filter((incident) => {
    if (filteredSeverity === 'All') return true;
    return incident.severity === filteredSeverity;
  });

  // Sort incidents by reported date
  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'Newest First' ? dateB - dateA : dateA - dateB;
  });

  // Handle severity filter change
  const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredSeverity(e.target.value);
  };

  // Handle sort order change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      {/* Filter and Sort Controls */}
      <div className="controls">
        <select onChange={handleSeverityChange} value={filteredSeverity}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select onChange={handleSortChange} value={sortOrder}>
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>

      {/* Display List of Incidents */}
      <div>
        {sortedIncidents.map((incident) => (
          <IncidentItem key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};

export default IncidentList;
