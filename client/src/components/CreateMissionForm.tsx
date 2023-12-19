import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
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
    <Container>
      <h2>Create Mission</h2>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Mission Name"
              value={newMissionName}
              onChange={(e) => setNewMissionName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="pre-flight">Pre-Flight</option>
              <option value="in-flight">In-Flight</option>
              <option value="post-flight">Post-Flight</option>
            </Form.Select>
          </Col>
          <Col>
            <Button onClick={handleCreateMission}>Create</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateMissionForm;
