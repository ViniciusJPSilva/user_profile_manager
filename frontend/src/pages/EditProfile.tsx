import { Link } from 'react-router-dom';

const EditProfile = () => (
  <div>
    <h2 className="text-2xl font-semibold">Editar Perfil</h2>
    <Link to="/" className="text-blue-500 underline">Voltar ao perfil</Link>
  </div>
);

export default EditProfile;
