
import React, { useState } from 'react';
import { useStore } from '../store';
import { Plus, Edit, Trash2, Image as ImageIcon, Check, X } from 'lucide-react';

const MenuEditorPage: React.FC = () => {
  const { categories, products, addCategory, deleteCategory, addProduct, updateProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('products');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: categories[0]?.id || '',
    image: 'https://picsum.photos/seed/food/400/300'
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      categoryId: newProduct.categoryId,
      status: 'AVAILABLE',
      image: newProduct.image
    });
    setIsAddingProduct(false);
    setNewProduct({ name: '', description: '', price: '', categoryId: categories[0]?.id || '', image: 'https://picsum.photos/seed/food/400/300' });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44]">Meu Cardápio</h1>
          <p className="text-gray-500">Configure seus itens e categorias</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Produtos
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Categorias
          </button>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Todos os Produtos ({products.length})</h2>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md flex items-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Novo Produto
            </button>
          </div>

          {isAddingProduct && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-500 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Adicionar Novo Produto</h3>
                <button onClick={() => setIsAddingProduct(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input 
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                      <input 
                        type="number"
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                      <select 
                        value={newProduct.categoryId}
                        onChange={e => setNewProduct({...newProduct, categoryId: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4"
                      >
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea 
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      rows={2}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4" 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative group cursor-pointer aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    <img src={newProduct.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-bold flex items-center gap-2"><ImageIcon /> Trocar foto</span>
                    </div>
                  </div>
                  <button onClick={handleAddProduct} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    <Check /> Salvar Produto
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="h-40 overflow-hidden relative">
                  <img src={product.image || 'https://picsum.photos/400/300'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => deleteProduct(product.id)} className="w-8 h-8 bg-white/90 text-red-600 rounded-lg flex items-center justify-center shadow-md hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{product.name}</h3>
                    <span className="font-bold text-blue-600">R$ {product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                      {categories.find(c => c.id === product.categoryId)?.name}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={product.status === 'AVAILABLE'} onChange={() => updateProduct(product.id, { status: product.status === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE' })} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-2 text-xs font-bold text-gray-500">Ativo</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Adicionar Categoria</h2>
            <div className="flex gap-4">
              <input 
                id="newCat"
                placeholder="Ex: Pizzas, Bebidas, Sobremesas"
                className="flex-1 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4"
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('newCat') as HTMLInputElement;
                  if (input.value) {
                    addCategory({ name: input.value, order: categories.length + 1 });
                    input.value = '';
                  }
                }}
                className="bg-blue-600 text-white font-bold px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Plus /> Adicionar
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {categories.sort((a,b) => a.order - b.order).map(cat => (
              <div key={cat.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                    {cat.order}
                  </div>
                  <span className="font-bold text-gray-900 text-lg">{cat.name}</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"><Edit className="w-5 h-5 text-gray-400 hover:text-blue-600" /></button>
                  <button onClick={() => deleteCategory(cat.id)} className="w-10 h-10 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors"><Trash2 className="w-5 h-5 text-gray-400 hover:text-red-600" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuEditorPage;
