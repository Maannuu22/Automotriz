
import React, { useState, useEffect } from 'react';
import { Part, Category } from '../types';
import { ICONS } from '../constants';

interface PartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (part: any) => void;
  initialData?: Part | null;
}

const PartModal: React.FC<PartModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    description: '',
    category: Category.MOTOR,
    brand: '',
    stock: 0,
    minStock: 5,
    purchasePrice: 0,
    salePrice: 0,
    imageUrl: 'https://picsum.photos/seed/' + Math.random() + '/200/200',
    compatibleModels: ['Universal']
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        compatibleModels: initialData.compatibleModels || ['Universal']
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, ...formData } : formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-in fade-in zoom-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">{initialData ? 'Editar Pieza' : 'Añadir Nueva Pieza'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ICONS.Close />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Nombre de la Pieza</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Referencia / SKU</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Categoría</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Marca</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
              />
            </div>
            <div className="col-span-full space-y-1">
              <label className="text-sm font-semibold text-gray-600">Descripción</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Stock Inicial</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Stock Mínimo (Alerta)</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Precio Compra ($)</label>
              <input 
                type="number" step="0.01"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({...formData, purchasePrice: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Precio Venta ($)</label>
              <input 
                type="number" step="0.01"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-indigo-600 font-bold"
                value={formData.salePrice}
                onChange={(e) => setFormData({...formData, salePrice: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition"
            >
              {initialData ? 'Guardar Cambios' : 'Añadir Pieza'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartModal;
