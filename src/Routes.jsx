import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import VehicleTracking from './pages/vehicle-tracking';
import EmergencyCallProcessing from './pages/emergency-call-processing';
import EmergencyDashboard from './pages/emergency-dashboard';
import IncidentManagement from './pages/incident-management';
import HospitalCoordination from './pages/hospital-coordination';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/vehicle-tracking" element={<VehicleTracking />} />
        <Route path="/emergency-call-processing" element={<EmergencyCallProcessing />} />
        <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
        <Route path="/incident-management" element={<IncidentManagement />} />
        <Route path="/hospital-coordination" element={<HospitalCoordination />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
