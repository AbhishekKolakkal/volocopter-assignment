import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export const apiBaseUrl = 'http://localhost:9000/api/v1';

export interface Mission {
  id: number;
  name: string;
  state: string;
  description: string
}

interface MissionState {
  id: number;
  display_name: string;
  state_name: string;
}

interface MissionContextProps {
  missions: Mission[];
  missionStates: MissionState[];
  createMission: (name: string, description: string) => void;
  moveMission: (id: string, newState: string) => void;
  deleteMission: (id: number) => void;
  getMissions: () => Promise<void>;
  getMissionStates: () => Promise<void>;
}

export const MissionContext = createContext<MissionContextProps | undefined>(undefined);

export const MissionProvider: React.FC = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [missionStates, setMissionStates] = useState<MissionState[]>([]);

  const getMissions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/missions`);
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  };

  const getMissionStates = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/mission_state`);

      const data = await response.json();
      console.log(data)
      setMissionStates(data);
    } catch (error) {
      console.error('Error fetching mission states:', error);
    }
  };

  const createMission = async (name: string, description: string, state: string = "pre-flight") => {
    try {
      const response = await fetch(`${apiBaseUrl}/missions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, state }),
      });
      if (response.status == 200) {
        toast.success('Mission created successfully');
      }
    } catch (error) {
      console.error('Error creating mission:', error);
      toast.error('Failed to create mission. Please try again.');
    } finally {
      getMissions();
    }
  };

  const moveMission = async (id: string, newState: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/missions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_state: newState }),
      });

      if (response.status == 200) {
        toast.success('Mission moved successfully');
      }
    } catch (error) {
      console.error('Error moving mission:', error);
      toast.error('Failed to move mission. Please try again.');
    } finally {
      getMissions();
    }
  };

  const deleteMission = async (id: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/missions/${id}`, {
        method: 'DELETE',
      });
      if (response.status == 200) {
        toast.success('Mission deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting mission:', error);
      toast.error('Failed to delete mission. Please try again.');
    } finally {
      getMissions();
    }
  };


  return (
    <MissionContext.Provider value={{ missions, missionStates, createMission, moveMission, deleteMission, getMissions, getMissionStates }}>
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
