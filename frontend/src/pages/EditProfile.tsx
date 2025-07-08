import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Save, MapPin, BookOpen, Loader2 } from 'lucide-react';
import type { User } from '../types/User';

export default function EditProfile() {
  const location = useLocation();
  const user = location.state?.user;

  const [formData, ] = useState<User>(user);
  const [isLoadingCep, ] = useState(false);
  const [cepError, ] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Editar Perfil
            </h1>
          </div>
        </div>

        <form className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birth_date}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Foto de Perfil
                </label>
                <input
                  type="url"
                  name="profileImage"
                  value={formData.profile_picture}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-blue-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Biografia</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sobre você
              </label>
              <textarea
                name="bio"
                value={formData.biography}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Conte um pouco sobre você..."
              />
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="text-blue-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Endereço</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address.cep"
                    value={formData.address.zip_code}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="00000-000"
                    maxLength={8}
                  />
                  {isLoadingCep && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 size={16} className="animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
                {cepError && (
                  <p className="text-red-500 text-sm mt-1">{cepError}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número
                </label>
                <input
                  type="text"
                  name="address.number"
                  value={formData.address.number}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  name="address.complement"
                  value={formData.address.complement}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <input
                  type="text"
                  name="address.neighborhood"
                  value={formData.address.neighborhood}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  maxLength={2}
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Save size={16} />
                Salvar Alterações
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
