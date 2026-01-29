
import React, { useState } from 'react';
import { useStore } from '../store';
import { Store, CreditCard, MessageSquare, ShieldCheck, Save, Copy, Check } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { restaurant, setRestaurant } = useStore();
  const [activeTab, setActiveTab] = useState<'restaurant' | 'payment' | 'whatsapp' | 'account'>('restaurant');
  const [copied, setCopied] = useState(false);

  const copyMenuLink = () => {
    const url = `${window.location.origin}/#/m/${restaurant?.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A1F44]">Configurações</h1>
        <p className="text-gray-500">Gerencie sua conta e o perfil do seu restaurante</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 space-y-1">
          {[
            { id: 'restaurant', label: 'Meu Restaurante', icon: Store },
            { id: 'payment', label: 'Pagamentos', icon: CreditCard },
            { id: 'whatsapp', label: 'WhatsApp Bot', icon: MessageSquare },
            { id: 'account', label: 'Minha Conta', icon: ShieldCheck },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {activeTab === 'restaurant' && (
            <div className="space-y-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Perfil do Restaurante</h2>
                  <p className="text-sm text-gray-500">Como os clientes veem seu negócio</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Seu Link do Cardápio</div>
                  <div className="text-sm font-medium text-blue-900">{window.location.origin}/#/m/{restaurant?.slug}</div>
                </div>
                <button 
                  onClick={copyMenuLink}
                  className="bg-white p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors shadow-sm flex items-center gap-2 font-bold text-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input defaultValue={restaurant?.name} className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Funcionamento</label>
                    <input defaultValue={restaurant?.openingHours} className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                    <input defaultValue={restaurant?.address} className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug da URL</label>
                    <div className="flex">
                      <span className="bg-gray-200 text-gray-500 px-3 py-3 rounded-l-lg border-2 border-transparent">rta.ai/</span>
                      <input defaultValue={restaurant?.slug} className="flex-1 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-r-lg py-3 px-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Métodos de Pagamento</h2>
                <p className="text-sm text-gray-500">Selecione o que você aceita no seu restaurante</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Dinheiro', 'PIX', 'Cartão de Débito', 'Cartão de Crédito', 'Vale Refeição'].map(method => (
                  <label key={method} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="font-bold text-gray-700">{method}</span>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                      defaultChecked={restaurant?.paymentMethods.includes(method)} 
                    />
                  </label>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Chave PIX (E-mail, CPF, CNPJ ou Aleatória)</label>
                <input defaultValue={restaurant?.pixKey} className="max-w-md w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" />
                <p className="mt-2 text-xs text-gray-400 italic">* Sua chave PIX será mostrada ao cliente na finalização do pedido.</p>
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Assistente WhatsApp (Beta)</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Desconectado</span>
                </div>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">Conecte seu WhatsApp para que o robô do RTA responda seus clientes automaticamente com o link do seu cardápio digital.</p>
                <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-all">
                  Conectar agora
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-gray-900">Mensagem de Boas-Vindas</h4>
                <textarea 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-4 px-5"
                  rows={4}
                  defaultValue={`Olá! Seja bem-vindo(a) ao ${restaurant?.name}! 😊\n\nFaça seu pedido pelo nosso cardápio digital:\n${window.location.origin}/#/m/${restaurant?.slug}\n\nQualquer dúvida, estamos à disposição!`}
                />
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Segurança da Conta</h2>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email de Login</label>
                  <input readOnly value="contato@restaurante.com" className="w-full bg-gray-100 border-2 border-transparent rounded-lg py-3 px-4 text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                  <input type="password" placeholder="Deixe em branco para não alterar" className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" />
                </div>
                <div className="pt-8 flex flex-col gap-4">
                  <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">Atualizar Senha</button>
                  <button className="w-full border-2 border-red-100 text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors">Excluir minha conta</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
