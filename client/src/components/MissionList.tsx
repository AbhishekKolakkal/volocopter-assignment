// src/components/MissionList.tsx
import React, {useEffect} from 'react';
import { useMissionContext } from '../contexts/MissionContext';
import MoveMissionForm from './MoveMissionForm';

const MissionList: React.FC = () => {
  const { missions, getMissions, deleteMission } = useMissionContext();

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        await getMissions();
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  const handleDeleteMission = async (id: string) => {
    try {
      await deleteMission(id);
    } catch (error) {
      console.error('Error deleting mission:', error);
    }
  };

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
