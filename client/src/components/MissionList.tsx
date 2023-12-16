// src/components/MissionList.tsx
import React from 'react';
import { useMissionContext } from '../contexts/MissionContext';
import MoveMissionForm from './MoveMissionForm';

const MissionList: React.FC = () => {
  const { missions, deleteMission } = useMissionContext();

  return (
    <div>
      <h2>Missions</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission.id}>
            {mission.name} - {mission.state}{' '}
            <button onClick={() => deleteMission(mission.id)}>Delete</button>
            <MoveMissionForm missionId={mission.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionList;
