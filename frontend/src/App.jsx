import { Routes, Route } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { contactConfig } from './config/data';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

export const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={contactConfig.recaptcha.siteKey}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </GoogleReCaptchaProvider>
  );
};
