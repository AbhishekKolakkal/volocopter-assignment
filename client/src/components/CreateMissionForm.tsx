// components/CreateMissionForm.tsx
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useMissionContext } from '../contexts/MissionContext';

interface CreateMissionFormProps {
  show: boolean;
  onClose: () => void;
}

const CreateMissionForm: React.FC<CreateMissionFormProps> = ({ show, onClose }) => {
  const [newMissionName, setNewMissionName] = useState('');
  const [newMissionDescription, setNewMissionDescription] = useState('');
  const [selectedState] = useState('');
  const { createMission } = useMissionContext();

  const handleCreateMission = () => {
    if (newMissionName.trim() !== '') {
      // Pass mission name, description, and state to createMission
      createMission(newMissionName, newMissionDescription);
      setNewMissionName('');
      setNewMissionDescription('');
      onClose(); // Close the modal after creating the mission
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Mission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formMissionName">
            <Form.Label>Mission Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mission name"
              value={newMissionName}
              onChange={(e) => setNewMissionName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMissionDescription">
            <Form.Label>Mission Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter mission description"
              value={newMissionDescription}
              onChange={(e) => setNewMissionDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateMission}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMissionForm;
