// src/contexts/MissionContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface Mission {
  id: string;
  name: string;
  state: 'pre-flight' | 'in-flight' | 'post-flight';
}

interface MissionContextProps {
  missions: Mission[];
  createMission: (name: string, state: string) => void;
  moveMission: (id: string, newState: 'pre-flight' | 'in-flight' | 'post-flight') => void;
  deleteMission: (id: string) => void;
}

export const MissionContext = createContext<MissionContextProps | undefined>(undefined);

export const MissionProvider: React.FC = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  const createMission = (name: string, state: string) => {
    const newMission: Mission = {
      id: Date.now().toString(),
      name,
      state: state as 'pre-flight' | 'in-flight' | 'post-flight',
    };
    setMissions((prevMissions) => [...prevMissions, newMission]);
  };

  const moveMission = (id: string, newState: 'pre-flight' | 'in-flight' | 'post-flight') => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === id ? { ...mission, state: newState } : mission
      )
    );
  };

  const deleteMission = (id: string) => {
    setMissions((prevMissions) => prevMissions.filter((mission) => mission.id !== id));
  };

  return (
    <MissionContext.Provider value={{ missions, createMission, moveMission, deleteMission }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissionContext = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMissionContext must be used within a MissionProvider');
  }
  return context;
};
