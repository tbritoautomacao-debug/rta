
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Store, CreditCard, PartyPopper } from 'lucide-react';
import { useStore } from '../store';

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const { setRestaurant, onboardingStep, setOnboardingStep } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    openingHours: '',
    paymentMethods: [] as string[],
    pixKey: ''
  });

  const steps = [
    { title: 'Informações Básicas', icon: Store },
    { title: 'Pagamento', icon: CreditCard },
    { title: 'Conclusão', icon: PartyPopper }
  ];

  const handleNext = () => {
    if (onboardingStep < steps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      // Save data and finish
      setRestaurant({
        id: 'r1',
        name: formData.name || 'Meu Restaurante',
        slug: (formData.name || 'restaurante').toLowerCase().replace(/\s/g, '-'),
        address: formData.address,
        openingHours: formData.openingHours,
        paymentMethods: formData.paymentMethods,
        pixKey: formData.pixKey
      });
      setOnboardingStep(0);
      navigate('/dashboard');
    }
  };

  const togglePaymentMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header / Stepper */}
        <div className="bg-[#0A1F44] p-8 text-white">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2"></div>
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  onboardingStep === idx ? 'bg-blue-600 border-blue-600' : 
                  onboardingStep > idx ? 'bg-green-500 border-green-500' : 'bg-[#0A1F44] border-white/20'
                }`}>
                  {onboardingStep > idx ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </div>
                <span className={`text-xs font-medium ${onboardingStep === idx ? 'text-white' : 'text-white/40'}`}>{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {onboardingStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Conte sobre seu negócio</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Público</label>
                  <input 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                    placeholder="Ex: Pizzaria do Bairro" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                  <input 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                    placeholder="Rua, Número, Bairro, Cidade" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Funcionamento</label>
                  <input 
                    value={formData.openingHours}
                    onChange={e => setFormData({...formData, openingHours: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                    placeholder="Ex: Seg a Sab - 18h às 23h" 
                  />
                </div>
              </div>
            </div>
          )}

          {onboardingStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Como você recebe?</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Dinheiro', 'PIX', 'Cartão Débito', 'Cartão Crédito'].map(method => (
                  <button
                    key={method}
                    onClick={() => togglePaymentMethod(method)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.paymentMethods.includes(method) 
                        ? 'border-blue-600 bg-blue-50 text-blue-900' 
                        : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{method}</span>
                      {formData.paymentMethods.includes(method) && <Check className="w-5 h-5" />}
                    </div>
                  </button>
                ))}
              </div>
              {formData.paymentMethods.includes('PIX') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chave PIX</label>
                  <input 
                    value={formData.pixKey}
                    onChange={e => setFormData({...formData, pixKey: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                    placeholder="E-mail, CPF ou Aleatória" 
                  />
                </div>
              )}
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <PartyPopper className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Tudo pronto!</h2>
                <p className="text-gray-600 mt-2">Você configurou seu restaurante com sucesso. Agora é só cadastrar seus produtos e começar a vender.</p>
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            {onboardingStep > 0 && (
              <button 
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                className="text-gray-500 font-bold px-6 py-3"
              >
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 group"
            >
              {onboardingStep === steps.length - 1 ? 'Ir para o Dashboard' : 'Próximo passo'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
