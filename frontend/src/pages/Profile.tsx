import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Edit, MapPin, Calendar, BookOpen } from 'lucide-react';
import type { User } from '../types/User';
import api from '../services/api';

const API_GET_END_POINT = "/usuario";

export default function Profile() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    birth_date: "",
    biography: "",
    profile_picture: "",
    address: {
        id: 0,
        street: "",
        number: 0,
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zip_code: "",
    }
  });

  const fetchUser = useCallback(async () => {
    const editedUser = location.state?.user;

    if (editedUser) {
      setUser(editedUser);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(API_GET_END_POINT);
      if (response.data?.status === "ok") {
        setUser(response.data.user);
      } else {
        throw new Error("User data not found");
      }
    } catch (err) {
      console.error("Error requesting user data from the API", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [location.state]);

  useEffect (() => {
      fetchUser();
  }, [fetchUser]);

  const handleGoToEditPage = () => {
    navigate('/edit', { state: { user } });
  };

  const formatCep = (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`;
    }
    return cep;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-500"></div>
          <p className="text-blue-600 font-medium text-lg">Carregando perfil...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <h2 className="text-gray-800 text-2xl font-bold mb-2">Ops! Algo deu errado</h2>
        <p className="text-gray-600 mb-4">Houve um problema ao buscar as informações do usuário.</p>
        <button
          onClick={fetchUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.profile_picture}
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {user.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 mb-4">
                <Calendar size={16} />
                <span className="text-sm">{new Date(user.birth_date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
              </div>
              <button 
                onClick={handleGoToEditPage}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors mx-auto md:mx-0"
              >
                <Edit size={16} />
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-blue-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Biografia</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {user.biography || 'Nenhuma biografia adicionada.'}
          </p>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-blue-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Endereço</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
              <p className="text-gray-600">{formatCep(user.address.zip_code)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
              <p className="text-gray-600">{user.address.street}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
              <p className="text-gray-600">{user.address.number}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
              <p className="text-gray-600">{user.address.complement || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
              <p className="text-gray-600">{user.address.neighborhood}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <p className="text-gray-600">{user.address.city}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <p className="text-gray-600">{user.address.state}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};