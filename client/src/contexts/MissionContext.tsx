// src/contexts/MissionContext.tsx
import React, { createContext, useState, useContext } from 'react';

export const apiBaseUrl = 'http://localhost:9000';

export interface Mission {
  id: number;
  name: string;
  state: 'pre-flight' | 'in-flight' | 'post-flight';
}

interface MissionContextProps {
  missions: Mission[];
  createMission: (name: string, state: string) => void;
  moveMission: (id: string, newState: 'pre-flight' | 'in-flight' | 'post-flight') => void;
  deleteMission: (id: number) => void;
  getMissions: () => Promise<void>; 
}

export const MissionContext = createContext<MissionContextProps | undefined>(undefined);

export const MissionProvider: React.FC = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  const getMissions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/missions`);
      console.log(response)
      const data = await response.json();
      console.log(data)
      setMissions(data);
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  };


  const createMission = async (name: string, state: string) => {
    console.log(JSON.stringify({ name, state }))
    try {
      const response = await fetch(`${apiBaseUrl}/missions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, state }),
      });
      console.log(response)
      const data = await response.json();
      // Handle success or error
    } catch (error) {
      console.error('Error creating mission:', error);
    } finally {
      getMissions();
    }
  };

  const moveMission = async (id: string, newState: 'pre-flight' | 'in-flight' | 'post-flight') => {
    console.log(newState)
    try {
      const response = await fetch(`${apiBaseUrl}/missions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newState),
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error moving mission:', error);
    } finally {
      getMissions()
    }
  };

  const deleteMission = async (id: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/missions/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error deleting mission:', error);
    } finally {
      getMissions()
    }
  };

  return (
    <MissionContext.Provider value={{ missions, createMission, moveMission, deleteMission, getMissions }}>
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
