import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMissionContext } from '../contexts/MissionContext';

interface MoveMissionFormProps {
  missionId: number; // Update to use the correct type for missionId
}

const MoveMissionForm: React.FC<MoveMissionFormProps> = ({ missionId }) => {
  const [newState, setNewState] = useState('');
  const { moveMission } = useMissionContext();

  const handleMoveMission = () => {
    if (['pre-flight', 'in-flight', 'post-flight'].includes(newState)) {
      moveMission(missionId.toString(), newState as 'pre-flight' | 'in-flight' | 'post-flight');
      setNewState(''); // Reset selected state after moving the mission
    }
  };

  return (
    <div>
      <h2>Move Mission</h2>
      <Form>
        <Form.Select value={newState} onChange={(e) => setNewState(e.target.value)}>
          <option value="">Select State</option>
          <option value="pre-flight">Pre-Flight</option>
          <option value="in-flight">In-Flight</option>
          <option value="post-flight">Post-Flight</option>
        </Form.Select>
        <Button onClick={handleMoveMission}>Move</Button>
      </Form>
    </div>
  );
};

export default MoveMissionForm;
