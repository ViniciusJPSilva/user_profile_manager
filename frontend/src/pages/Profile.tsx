import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { User } from '../types/User';
import api from '../services/api';

const API_GET_END_POINT = "/usuario";

const Profile = () => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    name: '',
    birth_date: '',
    biography: '',
    address: {
      street: '',
      number: 0,
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: '',
    },
    image_url: '',
  }); 


  useEffect (() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(API_GET_END_POINT);
        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Erro ao requisitar os dados do usuário à API", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect (() => {
    console.log(user);
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error ao obter os dados do usuário</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Página de Perfil</h2>
      <Link to="/edit" className="text-blue-500 underline">Editar perfil</Link>
    </div>
  );
};

export default Profile;
