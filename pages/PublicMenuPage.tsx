
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingBag, ChevronRight, X, Minus, Plus, MessageCircle } from 'lucide-react';
import { OrderItem } from '../types';

const PublicMenuPage: React.FC = () => {
  const { slug } = useParams();
  const { restaurant, categories, products, addOrder } = useStore();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id || null);
  const [customerData, setCustomerData] = useState({ name: '', whatsapp: '', payment: 'PIX', notes: '' });

  // Safety check for restaurant slug
  if (restaurant?.slug !== slug) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0A1F44] mb-4">404</h1>
          <p className="text-gray-600">Restaurante não encontrado.</p>
        </div>
      </div>
    );
  }

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as OrderItem[]);
  };

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const handleCheckout = () => {
    if (!customerData.name || !customerData.whatsapp) return alert('Por favor, preencha nome e WhatsApp.');
    
    addOrder({
      customerName: customerData.name,
      customerWhatsapp: customerData.whatsapp,
      items: cart,
      total: cartTotal,
      paymentMethod: customerData.payment,
      notes: customerData.notes
    });

    // Mock redirection message
    const message = `Olá! Acabei de fazer um pedido pelo RTA:\n\n*Cliente:* ${customerData.name}\n*Total:* R$ ${cartTotal.toFixed(2)}\n*Itens:* ${cart.map(i => `\n- ${i.quantity}x ${i.name}`).join('')}\n\nObrigado!`;
    const whatsappUrl = `https://wa.me/55${customerData.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
    
    alert('Pedido enviado com sucesso!');
    window.open(whatsappUrl, '_blank');
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-[#0A1F44] text-white pt-10 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-xl border-4 border-blue-600 flex items-center justify-center text-[#0A1F44] font-bold text-3xl">
              {restaurant.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-blue-100/60 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Aberto agora • {restaurant.openingHours}
              </p>
            </div>
          </div>
          <p className="text-sm text-blue-100/80">{restaurant.address}</p>
        </div>
      </div>

      {/* Main Menu */}
      <div className="max-w-3xl mx-auto px-6 -mt-10 space-y-8">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {categories.sort((a,b) => a.order - b.order).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all shadow-sm border ${
                activeCategory === cat.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {products.filter(p => p.categoryId === activeCategory && p.status === 'AVAILABLE').map(product => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow group">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={product.image || 'https://picsum.photos/200/200'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 inset-x-0 px-6 max-w-3xl mx-auto z-40">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-between px-6 transform hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">{cart.reduce((a, b) => a + b.quantity, 0)}</div>
              <span>Ver pedido</span>
            </div>
            <div className="flex items-center gap-2">
              <span>R$ {cartTotal.toFixed(2)}</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col justify-end lg:items-center">
          <div className="bg-white w-full max-w-3xl rounded-t-3xl h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag className="text-blue-600" /> Meu Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-gray-500">R$ {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl">
                      <button onClick={() => updateQuantity(item.productId, -1)} className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, 1)} className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h3 className="font-bold">Dados para entrega / retirada</h3>
                <div className="grid gap-4">
                  <input placeholder="Seu Nome" value={customerData.name} onChange={e => setCustomerData({...customerData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 focus:border-blue-500 outline-none" />
                  <input placeholder="WhatsApp (00) 00000-0000" value={customerData.whatsapp} onChange={e => setCustomerData({...customerData, whatsapp: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 focus:border-blue-500 outline-none" />
                  <textarea placeholder="Observações (ex: tirar cebola)" value={customerData.notes} onChange={e => setCustomerData({...customerData, notes: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 focus:border-blue-500 outline-none" rows={2} />
                  <select value={customerData.payment} onChange={e => setCustomerData({...customerData, payment: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 focus:border-blue-500 outline-none">
                    {restaurant.paymentMethods.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500">Total do pedido:</span>
                <span className="text-2xl font-bold text-blue-600">R$ {cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transform active:scale-95 transition-all"
              >
                <MessageCircle /> Enviar pedido pelo WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">Ao clicar em enviar, seu pedido será processado via WhatsApp.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicMenuPage;
