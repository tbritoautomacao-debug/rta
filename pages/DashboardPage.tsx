
import React from 'react';
import { useStore } from '../store';
import { OrderStatus } from '../types';
import { Clock, DollarSign, User, Package, ChevronRight } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const columns: { status: OrderStatus; label: string; color: string }[] = [
    { status: 'PENDING', label: 'Novos Pedidos', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { status: 'PREPARING', label: 'Em Preparo', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { status: 'READY', label: 'Prontos', color: 'bg-green-50 border-green-200 text-green-700' },
    { status: 'FINISHED', label: 'Finalizados', color: 'bg-gray-50 border-gray-200 text-gray-700' },
  ];

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case 'PENDING': return 'PREPARING';
      case 'PREPARING': return 'READY';
      case 'READY': return 'FINISHED';
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44]">Painel de Pedidos</h1>
          <p className="text-gray-500">Gerencie seus pedidos em tempo real</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Total de Hoje</div>
            <div className="text-xl font-bold">{orders.length} pedidos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
        {columns.map(col => (
          <div key={col.status} className={`flex flex-col rounded-2xl border-t-4 p-4 ${col.color}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{col.label}</h2>
              <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold border border-current">
                {orders.filter(o => o.status === col.status).length}
              </span>
            </div>
            
            <div className="flex-1 space-y-4">
              {orders.filter(o => o.status === col.status).map(order => (
                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-400">#{order.orderNumber}</span>
                    <span className="text-xs font-medium bg-gray-50 text-gray-500 px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">{order.customerName}</h3>
                  <p className="text-sm text-gray-500 mb-3 truncate">{order.items.length} itens • R$ {order.total.toFixed(2)}</p>
                  
                  {getNextStatus(order.status) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, getNextStatus(order.status)!);
                      }}
                      className="w-full mt-2 py-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-600 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      Avançar status
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {orders.filter(o => o.status === col.status).length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                  <Package className="w-8 h-8 mb-2 opacity-20" />
                  <span className="text-xs">Vazio</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
