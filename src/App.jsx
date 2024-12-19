import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Add more routes for dashboards */}
      </Routes>
    </Router>
  );
}

export default App;