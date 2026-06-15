import { useState, useEffect } from 'react';
import './App.css'
import StatutoryRulesPage from './pages/StatutoryRulesPage';
import TaxSlabPage from './pages/TaxSlabPage';




function App() {
  const [currentPage, setCurrentPage] = useState('statutory');


 /* useEffect(() => {
    // Simulate auth check (replace with real auth later)
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const response = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include'
        });
        if (!response.ok) {
          // Redirect to login if not authenticated
          window.location.href = '/login';
        }
      } catch (error) {
        console.log('Auth check:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
    */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payroll System - Statutory 
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('statutory')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'statutory'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Statutory Rules
            </button>
            <button
              onClick={() => setCurrentPage('tax')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'tax'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Tax Slabs
            </button>

          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {currentPage === 'statutory' && <StatutoryRulesPage />}
        {currentPage === 'tax' && <TaxSlabPage />}
        

      </main>
    </div>
  );
}

export default App;
