import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMissionContext } from '../contexts/MissionContext';

interface MoveMissionFormProps {
  missionId: number;
}

const MoveMissionForm: React.FC<MoveMissionFormProps> = ({ missionId }) => {
  const [newState, setNewState] = useState('');
  const { moveMission, missionStates } = useMissionContext();

  const handleMoveMission = () => {
    if (newState.trim() !== '') {
      moveMission(missionId.toString(), newState);
      setNewState('');
    }
  };

  return (
    <div>
      <h2>Move Mission</h2>
      <Form>
        <Form.Select value={newState} onChange={(e) => setNewState(e.target.value)}>
          <option value="">Select State</option>
          {missionStates.map((state) => (
            <option key={state.id} value={state.state_name}>
              {state.display_name}
            </option>
          ))}
        </Form.Select>
        <Button onClick={handleMoveMission}>Move</Button>
      </Form>
    </div>
  );
};

export default MoveMissionForm;
