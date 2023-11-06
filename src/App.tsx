import React from 'react';
import {HomePage} from './Pages/index'
import { Route, Routes } from 'react-router-dom';
import { Engagements } from './Components/Engagements';
import { CreateEngagement } from './Components/CreateEngagement';

function App() {
  return (
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/engagement" element={ <Engagements tableArray={undefined}/> } />
        <Route path="/createEngagement" element={ <CreateEngagement/> } />
      </Routes>
  );
}

export default App;
