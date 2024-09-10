import React, { useState } from 'react';
import AssignPage from './AssignPage';
import DashboardPage from './DashboardPage';
import SearchPage from './SearchPage';

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'assign':
        return <AssignPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'search':
        return <SearchPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="w-full text-black">
      <div className="flex bg-gray-200">
        {['assign', 'dashboard', 'search'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 text-center capitalize ${activeTab === tab ? 'bg-white' : 'hover:bg-gray-300'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button
          className="py-2 px-4 text-center bg-red-500 text-white hover:bg-red-600"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Navigation;