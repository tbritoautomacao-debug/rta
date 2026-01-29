
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Utensils, Settings, LogOut } from 'lucide-react';
import { useStore } from '../store';

const Sidebar: React.FC = () => {
  const { setUser, setRestaurant, restaurant } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setRestaurant(null);
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/cardapio', icon: Utensils, label: 'Meu Cardápio' },
    { to: '/dashboard/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className="w-20 md:w-64 bg-[#0A1F44] text-white flex flex-col h-full border-r border-gray-800">
      <div className="p-4 md:p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
          R
        </div>
        <span className="hidden md:block font-bold text-2xl tracking-tight">RTA</span>
      </div>

      <nav className="flex-1 mt-6 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="hidden md:block font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-6 h-6" />
          <span className="hidden md:block font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
