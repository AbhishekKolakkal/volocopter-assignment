import React, { useState } from 'react';
import { Card, Button, Collapse, Modal } from 'react-bootstrap'; // Import Modal component
import { Mission } from '../contexts/MissionContext';
import MoveMissionForm from './MoveMissionForm'; // Import MoveMissionForm
import { useMissionContext } from '../contexts/MissionContext';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { deleteMission } = useMissionContext();

  const toggleForm = () => setOpen(!open);

  const handleDelete = (id: number) => {
    // Add logic here to handle deletion (e.g., calling deleteMission from context)
    deleteMission(id);
    // Once deleted, close the modal
    setShowModal(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{mission.name}</Card.Title>
        <Card.Text>{mission.state}</Card.Text>
        <Button onClick={toggleForm} className="me-2">
          Move Mission
        </Button>
        {/* Delete Button */}
        <Button variant="danger" onClick={() => setShowModal(true)}>
          Delete Mission
        </Button>

        {/* MoveMissionForm */}
        <Collapse in={open}>
          <div>
            <MoveMissionForm missionId={mission.id} />
          </div>
        </Collapse>

        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Mission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the mission "{mission.name}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() =>handleDelete(mission.id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default MissionCard;
