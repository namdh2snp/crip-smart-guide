import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomBar from '../components/common/BottomBar';
import EmergencyModal from '../components/common/EmergencyModal';
import PassengerTabs from '../components/passenger/PassengerTabs';
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
import { Settings, AlertCircle } from 'lucide-react';

export default function PassengerPage() {
  const [activeTab, setActiveTab] = useState('ship');
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const { currentLang } = useLanguage();
  const { config, t } = useConfig();

  const alertMsg = config.emergencyAlert?.enabled
    ? (config.emergencyAlert.message?.[currentLang] ||
        config.emergencyAlert.message?.en ||
        config.emergencyAlert.message?.vi)
    : null;

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Fixed Sticky Header */}
      <Header onOpenEmergency={() => setEmergencyOpen(true)} />

      {/* Sticky Feature Tabs Navigation */}
      <PassengerTabs activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Main Passenger Active Tab Content */}
      <main className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Global Emergency Alert Banner (always visible across all tabs if enabled) */}
        {alertMsg && (
          <div className="bg-sos text-white p-3.5 rounded-2xl shadow-lg flex items-start space-x-2.5 animate-pulse">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-xs font-bold leading-relaxed">{alertMsg}</p>
          </div>
        )}

        {/* Active Feature Tab Panel */}
        <section role="tabpanel" className="space-y-4">
          {activeTab === 'ship' && (
            <>
              <ShipStatusCard hideAlert />
              <WifiBanner />
            </>
          )}
          {activeTab === 'logistics' && <LogisticsFlow />}
          {activeTab === 'map' && <TerminalMap />}
          {activeTab === 'itinerary' && <ItineraryList />}
          {activeTab === 'phrases' && <PhraseCards />}
          {activeTab === 'currency' && <CurrencyCalc />}
          {activeTab === 'feedback' && <FeedbackForm />}
        </section>

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
