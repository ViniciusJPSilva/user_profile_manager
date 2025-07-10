import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, MapPin, BookOpen, Loader2, User as UserIcon, AlertCircle } from 'lucide-react';
import axios from 'axios';
import type { User } from '../types/User';
import type { AddressApi } from '../types/AddressAPI';
import api from '../services/api';

const API_UPDATE_ENDPOINT = "/usuario";

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = location.state?.user;
  const [formData, setFormData] = useState<User>(user || {
    id: "",
    name: "",
    birth_date: "",
    biography: "",
    profile_picture: "",
    address: {
        street: "",
        number: 0,
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zip_code: "",
    }
  });
  
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  /**
   * Valida os dados do formulário e atualiza o estado de erros de validação.
   *
   * @returns {boolean} True se o formulário é válido, false caso contrário.
   */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!formData.birth_date) {
      errors.birth_date = 'Data de nascimento é obrigatória';
    }

    if (!formData.address.zip_code.trim()) {
      errors.zip_code = 'CEP é obrigatório';
    } else if (formData.address.zip_code.replace(/\D/g, '').length !== 8) {
      errors.zip_code = 'CEP deve ter 8 dígitos';
    }

    if (!formData.address.street.trim()) {
      errors.street = 'Rua é obrigatória';
    }

    if (!formData.address.number) {
      errors.number = 'Número é obrigatório';
    }

    if (!formData.address.neighborhood.trim()) {
      errors.neighborhood = 'Bairro é obrigatório';
    }

    if (!formData.address.city.trim()) {
      errors.city = 'Cidade é obrigatória';
    }

    if (!formData.address.state.trim()) {
      errors.state = 'Estado é obrigatório';
    } else if (formData.address.state.length !== 2) {
      errors.state = 'Estado deve ter 2 caracteres';
    }

    if (formData.profile_picture && !isValidUrl(formData.profile_picture)) {
      errors.profile_picture = 'URL da foto deve ser válida';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Verifica se uma string é uma URL válida.
   *
   * @param {string} string - A string a ser verificada.
   * @returns {boolean} True se for uma URL válida, false caso contrário.
   */
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Atualiza o estado do formulário quando um input é alterado.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Evento de alteração do input.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (name === 'address.number') {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          number: Number(value) || 0
        }
      }));
    } else if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Busca dados de endereço pelo CEP usando a API ViaCEP.
   *
   * @param {string} cep - O CEP a ser consultado (apenas números).
   */
  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setCepError('CEP deve ter 8 dígitos');
      return;
    }

    setIsLoadingCep(true);
    setCepError('');

    try {
      const response = await axios.get<AddressApi>(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = response.data;

      if (data.erro) {
        setCepError('CEP não encontrado');
        return;
      }

      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          zip_code: cleanCep,
          street: data.logradouro || '',
          complement: data.complemento || prev.address.complement,
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || ''
        }
      }));

      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.zip_code;
        delete newErrors.street;
        delete newErrors.neighborhood;
        delete newErrors.city;
        delete newErrors.state;
        return newErrors;
      });

    } catch {
      setCepError('Erro ao buscar CEP');
    } finally {
      setIsLoadingCep(false);
    }
  };

  /**
   * Trata a mudança no campo CEP, formatando e buscando o endereço se válido.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de alteração do input CEP.
   */
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    
    let formattedCep = cep;
    if (cep.length > 5) {
      formattedCep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
    }
    
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        zip_code: formattedCep
      }
    }));

    if (cepError) {
      setCepError('');
    }

    if (cep.length === 8) {
      fetchAddressByCep(cep);
    }
  };

  /**
   * Manipula o envio do formulário, validando e enviando os dados para a API.
   *
   * @param {React.FormEvent} e - Evento de submissão do formulário.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const updateData = {
        ...formData,
        birth_date: `${(formData.birth_date.includes('T')) ? formData.birth_date.split('T')[0] : formData.birth_date}T00:00:00.000`,
        address: {
          ...formData.address,
          zip_code: formData.address.zip_code.replace(/\D/g, '') // Remove formatting for API
        }
      };

      const response = await api.post(`${API_UPDATE_ENDPOINT}`, updateData);
      
      if (response.data?.status === "ok") {
        navigate('/', { state: { user: response.data.user } });
      } else {
        navigate('/', { state: { user: updateData } });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setSaveError('Erro ao salvar as alterações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Cancela a edição e retorna à tela principal com os dados originais.
   */
  const handleCancel = () => {
    navigate("/", { state: { user } });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleCancel}
              className="text-blue-500 hover:text-blue-600 transition-colors"
              disabled={isSaving}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Editar Perfil
            </h1>
          </div>
          
          {saveError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span>{saveError}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <UserIcon className="text-blue-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSaving}
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date ? new Date(formData.birth_date).toISOString().split("T")[0] : ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.birth_date ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSaving}
                />
                {validationErrors.birth_date && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.birth_date}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Foto de Perfil
                </label>
                <input
                  type="url"
                  name="profile_picture"
                  value={formData.profile_picture}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.profile_picture ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/photo.jpg"
                  disabled={isSaving}
                />
                {validationErrors.profile_picture && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.profile_picture}</p>
                )}
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
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Conte um pouco sobre você..."
                disabled={isSaving}
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
                  CEP *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address.zip_code"
                    value={formData.address.zip_code}
                    onChange={handleCepChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      validationErrors.zip_code || cepError ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="00000-000"
                    maxLength={9}
                    disabled={isSaving}
                  />
                  {isLoadingCep && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 size={16} className="animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
                {(cepError || validationErrors.zip_code) && (
                  <p className="text-red-500 text-sm mt-1">{cepError || validationErrors.zip_code}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rua *
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.street ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSaving}
                />
                {validationErrors.street && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.street}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  name="address.number"
                  value={formData.address.number}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.number ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSaving}
                />
                {validationErrors.number && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.number}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  name="address.complement"
                  value={formData.address.complement}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isSaving}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  name="address.neighborhood"
                  value={formData.address.neighborhood}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.neighborhood ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSaving}
                />
                {validationErrors.neighborhood && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.neighborhood}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.city ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSaving}
                />
                {validationErrors.city && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    validationErrors.state ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={2}
                  placeholder="SP"
                  disabled={isSaving}
                />
                {validationErrors.state && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.state}</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Salvar Alterações
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg transition-colors"
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