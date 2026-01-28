
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Part, Category } from '../types';

interface AnalyticsProps {
  parts: Part[];
}

const Analytics: React.FC<AnalyticsProps> = ({ parts }) => {
  const categoryStats = Object.values(Category).map(cat => {
    const catParts = parts.filter(p => p.category === cat);
    return {
      category: cat,
      count: catParts.length,
      value: catParts.reduce((acc, p) => acc + (p.stock * p.purchasePrice), 0),
      potentialRevenue: catParts.reduce((acc, p) => acc + (p.stock * p.salePrice), 0)
    };
  }).filter(s => s.count > 0);

  const movementsData = [
    { day: 'Lun', entradas: 12, salidas: 8 },
    { day: 'Mar', entradas: 5, salidas: 15 },
    { day: 'Mie', entradas: 22, salidas: 10 },
    { day: 'Jue', entradas: 8, salidas: 18 },
    { day: 'Vie', entradas: 15, salidas: 12 },
    { day: 'Sab', entradas: 25, salidas: 30 },
    { day: 'Dom', entradas: 0, salidas: 5 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Informes y Analíticas</h1>
          <p className="text-gray-500">Perspectiva financiera y operativa</p>
        </div>
        <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span>Exportar a Excel</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Valor de Inventario por Categoría</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="value" name="Costo de Compra" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                <Bar dataKey="potentialRevenue" name="Potencial Venta" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Tráfico de Mercancía (7 días)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={movementsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entradas" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="salidas" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-100">
          <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Margen Teórico Promedio</p>
          <h4 className="text-3xl font-black">42.5%</h4>
          <p className="text-indigo-200 text-[10px] mt-2">+2.4% vs mes anterior</p>
        </div>
        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-xl shadow-emerald-100">
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Rotación Mensual</p>
          <h4 className="text-3xl font-black">1.8x</h4>
          <p className="text-emerald-200 text-[10px] mt-2">Objetivo: 2.0x</p>
        </div>
        <div className="bg-amber-600 p-6 rounded-2xl text-white shadow-xl shadow-amber-100">
          <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-1">Items Inactivos (+60d)</p>
          <h4 className="text-3xl font-black">{Math.floor(parts.length * 0.15)}</h4>
          <p className="text-amber-200 text-[10px] mt-2">Considerar liquidación</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
