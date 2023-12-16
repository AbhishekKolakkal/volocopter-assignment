// import { useEffect, useState } from "react";

// export const App = () => {
// 	const [apiStatus, setApiStatus] = useState<string | null>(null);

// 	useEffect(() => {
// 		fetch("/api/health")
// 			.then((response) => response.json())
// 			.then((data) => {
// 				setApiStatus(data.status);
// 			});
// 	}, []);

// 	return (
// 		<div>
// 			<p>Volocopter Code Challenge</p>
// 			<p>API Status: {apiStatus}</p>
// 		</div>
// 	);
// };

// src/App.tsx
import React from 'react';
import { MissionProvider } from './contexts/MissionContext';
import MissionList from './components/MissionList';
import CreateMissionForm from './components/CreateMissionForm';

const App: React.FC = () => {
  return (
    <MissionProvider>
      <div>
        <h1>Flight Mission Control</h1>
        <CreateMissionForm />
        <MissionList />
      </div>
    </MissionProvider>
  );
};

export default App;
