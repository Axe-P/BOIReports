import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import CompletionPage from './pages/CompletionPage';
import Navbar from './components/Navbar'; // Import Navbar

function App() {
  return (
    <>
      {/* Navbar is always rendered */}
      <Navbar />
      
      {/* Offset the page content for the fixed navbar */}
      <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/completion" element={<CompletionPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;