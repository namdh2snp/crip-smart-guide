import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomBar from '../components/common/BottomBar';
import EmergencyModal from '../components/common/EmergencyModal';
import ShipStatusCard from '../components/passenger/ShipStatusCard';
import LogisticsFlow from '../components/passenger/LogisticsFlow';
import TerminalMap from '../components/passenger/TerminalMap';
import ItineraryList from '../components/passenger/ItineraryList';
import PhraseCards from '../components/passenger/PhraseCards';
import CurrencyCalc from '../components/passenger/CurrencyCalc';
import WifiBanner from '../components/passenger/WifiBanner';
import FeedbackForm from '../components/passenger/FeedbackForm';
import { useLanguage } from '../context/LanguageContext';
import { useConfig } from '../context/ConfigContext';
import { Settings } from 'lucide-react';

export default function PassengerPage() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const { currentLang } = useLanguage();
  const { t } = useConfig();

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Fixed Sticky Header */}
      <Header onOpenEmergency={() => setEmergencyOpen(true)} />

      {/* Main Passenger Scrollable Content Container */}
      <main className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Voyage Status & All Aboard Countdown */}
        <ShipStatusCard />

        {/* Free Wi-Fi 1-Tap Copy Banner */}
        <WifiBanner />

        {/* Passenger Logistics: Tour Bus Area vs Free Shuttle & Taxi */}
        <LogisticsFlow />

        {/* Interactive Terminal Floor Plan Map with POI Filters */}
        <TerminalMap />

        {/* 4h / 6h / 8h Time-boxed Discovery Itineraries */}
        <ItineraryList />

        {/* Large Vietnamese Phrase Cards with Web Speech Synthesis */}
        <PhraseCards />

        {/* Offline Currency Converter */}
        <CurrencyCalc />

        {/* 30-Second Passenger Experience Survey */}
        <FeedbackForm />

        {/* Footer Admin Link */}
        <footer className="text-center pt-4 pb-8 space-y-2">
          <p className="text-[11px] text-slate-400 font-medium">
            © 2026 Cảng Quốc tế Cam Ranh (Cam Ranh International Port - CRIP).
          </p>
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-navy bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-teal" />
              <span>{t('adminLink', currentLang)}</span>
            </Link>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Bar: Big "Take me back to Port" & SOS */}
      <BottomBar onOpenEmergency={() => setEmergencyOpen(true)} />

      {/* Full-screen Emergency SOS & Driver Card Modal */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />
    </div>
  );
}
