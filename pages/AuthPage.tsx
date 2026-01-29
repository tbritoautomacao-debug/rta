
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

interface AuthPageProps {
  type: 'login' | 'register';
}

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Carlos Restaurante',
        email: 'contato@restaurante.com'
      });
      setLoading(false);
      navigate('/onboarding');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
            <span className="font-bold text-2xl tracking-tight text-[#0A1F44]">RTA</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {type === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta grátis'}
          </h2>
          <p className="mt-2 text-gray-600">
            {type === 'login' ? 'Acesse sua conta para gerenciar seu restaurante' : 'Comece a vender hoje mesmo com o RTA'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {type === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Restaurante</label>
                <input required className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4 transition-all" placeholder="Ex: Pizzaria do Zé" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4 transition-all" placeholder="contato@restaurante.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input required type="password" title="Mínimo 8 caracteres" minLength={8} className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4 transition-all" placeholder="••••••••" />
            </div>
            {type === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input required className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4 transition-all" placeholder="(00) 00000-0000" />
              </div>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
            ) : null}
            {type === 'login' ? 'Entrar' : 'Criar minha conta'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {type === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <Link to={type === 'login' ? '/cadastro' : '/login'} className="ml-1 text-blue-600 font-bold hover:underline">
              {type === 'login' ? 'Cadastre-se grátis' : 'Faça login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
