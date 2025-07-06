import { Link } from 'react-router-dom';

const Profile = () => (
  <div>
    <h2 className="text-2xl font-semibold">Página de Perfil</h2>
    <Link to="/edit" className="text-blue-500 underline">Editar perfil</Link>
  </div>
);

export default Profile;
