import React from 'react';
import { MissionProvider } from './contexts/MissionContext';
import MissionBoard from './components/MissionBoard';
import CreateMissionForm from './components/CreateMissionForm';
import { Mission } from './contexts/MissionContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const App: React.FC = () => {

  return (
    <div className="App">
      <MissionProvider>
        <Container>
          <Row className="mt-4 mb-4">
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* MissionBoard component */}
              <MissionBoard  />
            </Col>
          </Row>
        </Container>
      </MissionProvider>
    </div>
  );
};

export default App;
