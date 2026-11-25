import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminTabs from '../components/admin/AdminTabs';
import Tab1Ship from '../components/admin/Tab1Ship';
import Tab2Logistics from '../components/admin/Tab2Logistics';
import Tab3MapPoi from '../components/admin/Tab3MapPoi';
import Tab4Itinerary from '../components/admin/Tab4Itinerary';
import Tab5Phrases from '../components/admin/Tab5Phrases';
import Tab6Emergency from '../components/admin/Tab6Emergency';
import Tab7Dictionary from '../components/admin/Tab7Dictionary';
import Tab8DataOps from '../components/admin/Tab8DataOps';
import { ArrowLeft, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('ship');

  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* Admin Top Header */}
      <header className="bg-navy text-white px-4 py-3 border-b border-navy-light sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all flex items-center space-x-1"
              title="Quay lại Giao diện Hành khách"
            >
              <ArrowLeft className="w-5 h-5 text-teal" />
              <span className="text-xs font-bold hidden sm:inline">Về App Khách</span>
            </Link>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-teal" />
              <div>
                <h1 className="text-sm sm:text-base font-black tracking-tight text-white leading-tight">
                  TRUNG TÂM QUẢN TRỊ NỘI DUNG CRIP
                </h1>
                <p className="text-[10px] text-teal-light font-medium">
                  Cảng Quốc tế Cam Ranh • 100% CMS-Driven Realtime Control
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="text-xs font-black bg-teal hover:bg-teal-dark text-white px-3 py-1.5 rounded-xl shadow transition-all"
          >
            Mở Tab Khách (Live Preview)
          </Link>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <AdminTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Dynamic Tab Panes */}
        <div>
          {activeTab === 'ship' && <Tab1Ship />}
          {activeTab === 'logistics' && <Tab2Logistics />}
          {activeTab === 'mappoi' && <Tab3MapPoi />}
          {activeTab === 'itinerary' && <Tab4Itinerary />}
          {activeTab === 'phrases' && <Tab5Phrases />}
          {activeTab === 'emergency' && <Tab6Emergency />}
          {activeTab === 'dictionary' && <Tab7Dictionary />}
          {activeTab === 'dataops' && <Tab8DataOps />}
        </div>
      </main>
    </div>
  );
}
