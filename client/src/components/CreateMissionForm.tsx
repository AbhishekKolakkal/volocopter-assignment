// src/components/CreateMissionForm.tsx
import React, { useState } from 'react';
import { useMissionContext } from '../contexts/MissionContext';

const CreateMissionForm: React.FC = () => {
  const [newMissionName, setNewMissionName] = useState('');
  const [selectedState, setSelectedState] = useState('pre-flight');
  const { createMission } = useMissionContext();

  const handleCreateMission = () => {
    if (newMissionName.trim() !== '') {
      createMission(newMissionName, selectedState);
      setNewMissionName('');
      setSelectedState('pre-flight'); // Reset selected state after creating a mission
    }
  };

  return (
    <div>
      <h2>Create Mission</h2>
      <input
        type="text"
        placeholder="Mission Name"
        value={newMissionName}
        onChange={(e) => setNewMissionName(e.target.value)}
      />
      <label>
        Select State:
        <select defaultValue={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="pre-flight">Pre-Flight</option>
          <option value="in-flight">In-Flight</option>
          <option value="post-flight">Post-Flight</option>
        </select>
      </label>
      <button onClick={handleCreateMission}>Create</button>
    </div>
  );
};

export default CreateMissionForm;
