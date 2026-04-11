import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};
