import { useState } from 'react';
import { Dashboard } from '../adminPanelComponents/Dashboard';
import { AnalyticsPage } from '../adminPanelComponents/AnalyticsPage';
import { AboutPage } from '../adminPanelComponents/AboutPage';
import { ServicesPage } from '../adminPanelComponents/ServicesPage';
import { PortfolioPage } from '../adminPanelComponents/PortfolioPage';
import { CommentsPage } from '../adminPanelComponents/CommentsPage';
import { SuggestionsPage } from '../adminPanelComponents/SuggestionsPage';
import { Sidebar } from '../adminPanelComponents/Sidebar';

export default function AdminPanelLayout() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'comments':
        return <CommentsPage />;
      case 'suggestions':
        return <SuggestionsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
