import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import CompletionPage from './pages/CompletionPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard
import ContactPage from './pages/ContactPage'; // Import ContactPage
import Navbar from './components/Navbar'; // Import Navbar
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      {/* Navbar is always rendered */}
      <Navbar />

      {/* Offset the page content for the fixed navbar */}
      <div style={{ marginTop: '80px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/completion" element={<CompletionPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Add Contact Route */}
          <Route path="/contact" element={<ContactPage />} /> {/* Added the /contact route */}
        </Routes>
      </div>
    </>
  );
}

export default App;