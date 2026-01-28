
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Part, Category } from '../types';
import { BRANDS_MODELS_MAP, ICONS } from '../constants';

interface DashboardProps {
  stats: {
    totalItems: number;
    totalStock: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
  parts: Part[];
  onQuickSearch: (brand: string, model: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, parts, onQuickSearch }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  const categoryData = Object.values(Category).map(cat => ({
    name: cat,
    value: parts.filter(p => p.category === cat).length
  })).filter(d => d.value > 0);

  const stockData = [
    { name: 'En Stock', value: parts.filter(p => p.stock > p.minStock).length, color: '#10B981' },
    { name: 'Bajo Stock', value: stats.lowStock, color: '#F59E0B' },
    { name: 'Agotado', value: stats.outOfStock, color: '#EF4444' }
  ].filter(d => d.value > 0);

  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

  const brands = Object.keys(BRANDS_MODELS_MAP);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Principal</h1>
          <p className="text-gray-500">Bienvenido al sistema de gestión AutoPart Pro</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-indigo-600">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      {/* NEW: Vehicle Explorer Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <ICONS.Car />
            </div>
            <h3 className="text-xl font-bold">Explorador por Vehículo</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-3 font-medium">1. Selecciona una marca</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setSelectedModel('');
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedBrand === brand 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-white hover:border-indigo-200'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-tighter">{brand}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-sm text-gray-500 mb-3 font-medium">2. Elige el modelo y busca piezas</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  disabled={!selectedBrand}
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 font-medium shadow-sm transition-all"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">-- Seleccionar Modelo --</option>
                  {selectedBrand && BRANDS_MODELS_MAP[selectedBrand].map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
                <button
                  disabled={!selectedBrand}
                  onClick={() => onQuickSearch(selectedBrand, selectedModel)}
                  className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md disabled:bg-gray-300 flex items-center justify-center space-x-2"
                >
                  <ICONS.Search />
                  <span>Explorar Repuestos</span>
                </button>
              </div>
              {!selectedBrand && <p className="mt-2 text-[10px] text-amber-600 font-bold uppercase">* Selecciona una marca para habilitar modelos</p>}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Piezas Unicas" value={stats.totalItems.toString()} color="bg-blue-500" />
        <StatCard label="Stock Total" value={stats.totalStock.toLocaleString()} color="bg-indigo-600" />
        <StatCard label="Alertas Stock Bajo" value={stats.lowStock.toString()} color="bg-amber-500" />
        <StatCard label="Agotados" value={stats.outOfStock.toString()} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Distribución por Categoría</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Estado de Inventario</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Movimientos Recientes</h3>
          <button className="text-xs text-indigo-600 font-bold hover:underline">Ver todo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3">Pieza</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3">Cantidad</th>
                <th className="pb-3">Fecha</th>
                <th className="pb-3">Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {parts.flatMap(p => p.movements.map(m => ({ ...m, partName: p.name })))
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((m) => (
                  <tr key={m.id} className="text-sm">
                    <td className="py-3 font-medium">{m.partName}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${m.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {m.type === 'IN' ? 'ENTRADA' : 'SALIDA'}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">{m.quantity}</td>
                    <td className="py-3 text-gray-500">{new Date(m.date).toLocaleDateString()}</td>
                    <td className="py-3 text-gray-500 italic truncate max-w-[150px]">{m.note}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white shadow-inner`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
