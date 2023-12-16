// src/components/MoveMissionForm.tsx
import React, { useState } from 'react';
import { useMissionContext } from '../contexts/MissionContext';

interface MoveMissionFormProps {
  missionId: string;
}

const MoveMissionForm: React.FC<MoveMissionFormProps> = ({ missionId }) => {
  const [newState, setNewState] = useState('');
  const { moveMission } = useMissionContext();

  const handleMoveMission = () => {
    if (['pre-flight', 'in-flight', 'post-flight'].includes(newState)) {
      moveMission(missionId, newState as 'pre-flight' | 'in-flight' | 'post-flight');
      setNewState(''); // Reset selected state after moving the mission
    }
  };

  return (
    <div>
      <h2>Move Mission</h2>
      <label>
        Select New State:
        <select value={newState} onChange={(e) => setNewState(e.target.value)}>
          <option value="">Select State</option>
          <option value="pre-flight">Pre-Flight</option>
          <option value="in-flight">In-Flight</option>
          <option value="post-flight">Post-Flight</option>
        </select>
      </label>
      <button onClick={handleMoveMission}>Move</button>
    </div>
  );
};

export default MoveMissionForm;
