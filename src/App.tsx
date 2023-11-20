import React from 'react';
import { HomePage } from './Pages/index'
import { Route, Routes } from 'react-router-dom';
import { Engagements } from './Components/Engagements';
import { CreateEngagement } from './Components/CreateEngagement';
import { ViewEngagement } from './Components/ViewEngagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/engagement" element={<Engagements tableArray={undefined} />} />
      <Route path="/createEngagement" element={<CreateEngagement />} />
      <Route path="/viewEngagement/:id" element={<ViewEngagement />} />
    </Routes>
  );
}

export default App;
