import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import RoadDefects from './pages/RoadDefects';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/traffic"
          element={
            <DashboardLayout>
              <Traffic />
            </DashboardLayout>
          }
        />
        <Route
          path="/road-defects"
          element={
            <DashboardLayout>
              <RoadDefects />
            </DashboardLayout>
          }
        />
        <Route
          path="/incidents"
          element={
            <DashboardLayout>
              <Incidents />
            </DashboardLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />
        {/* Fallback route back to dashboard */}
        <Route
          path="*"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;