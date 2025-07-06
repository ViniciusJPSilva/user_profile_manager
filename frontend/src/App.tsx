import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App
