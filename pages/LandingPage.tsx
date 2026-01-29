
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, ShieldCheck, DollarSign } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">R</div>
            <span className="font-bold text-2xl tracking-tight text-[#0A1F44]">RTA</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a href="#beneficios" className="hover:text-blue-600">Benefícios</a>
            <a href="#funcionalidades" className="hover:text-blue-600">Funcionalidades</a>
            <Link to="/login" className="text-gray-900">Entrar</Link>
            <Link to="/cadastro" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">Começar Agora</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 gradient-hero text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              A tecnologia que serve o <span className="text-cyan-400">seu sucesso.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              O sistema de gestão completo para restaurantes que automatiza seu atendimento via WhatsApp e centraliza seus pedidos. Sem taxas, sem burocracia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/cadastro" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all text-center">
                Criar minha conta grátis
              </Link>
              <a href="#funcionalidades" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center">
                Ver demonstração
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img src="https://picsum.photos/seed/dashboard/800/600" alt="Dashboard RTA" className="w-full" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="beneficios" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Tudo o que você precisa para crescer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Desenvolvido especificamente para o setor alimentício, focando na agilidade e lucro.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Atendimento Automático</h3>
              <p className="text-gray-600">Integração com WhatsApp para responder clientes instantaneamente com seu cardápio digital.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Comissões</h3>
              <p className="text-gray-600">Diferente de marketplaces, aqui o lucro é 100% seu. Não cobramos taxas por pedido.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gestão Centralizada</h3>
              <p className="text-gray-600">Painel Kanban intuitivo para gerenciar cozinha, entregas e fechamento de caixa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1F44] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">R</div>
            <span className="font-bold text-xl tracking-tight">RTA</span>
          </div>
          <p className="text-gray-400">© 2026 RTA - Restaurant Technology Assistant. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white">Termos</a>
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
