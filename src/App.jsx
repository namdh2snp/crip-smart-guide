import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './context/ConfigContext';
import { LanguageProvider } from './context/LanguageContext';
import PassengerPage from './pages/PassengerPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <ConfigProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PassengerPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ConfigProvider>
  );
}
