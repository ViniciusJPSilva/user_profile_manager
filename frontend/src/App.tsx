import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
