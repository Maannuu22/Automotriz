
import React, { useState, useMemo } from 'react';
import { ViewType, Part, Category } from './types';
import { MOCK_PARTS, ICONS } from './constants';
import Dashboard from './components/Dashboard';
import InventoryTable from './components/InventoryTable';
import Analytics from './components/Analytics';
import PartModal from './components/PartModal';
import DetailModal from './components/DetailModal';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');
  const [parts, setParts] = useState<Part[]>(MOCK_PARTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // Modal states
  const [isPartModalOpen, setIsPartModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<Part | null>(null);
  const [selectedPartDetails, setSelectedPartDetails] = useState<Part | null>(null);

  const filteredParts = useMemo(() => {
    return parts.filter(p => {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(lowerQuery) ||
                          p.reference.toLowerCase().includes(lowerQuery) ||
                          p.description.toLowerCase().includes(lowerQuery) ||
                          p.compatibleModels.some(m => m.toLowerCase().includes(lowerQuery));
      const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [parts, searchQuery, filterCategory]);

  const stats = useMemo(() => ({
    totalItems: parts.length,
    totalStock: parts.reduce((acc, p) => acc + p.stock, 0),
    lowStock: parts.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
    outOfStock: parts.filter(p => p.stock === 0).length,
    totalValue: parts.reduce((acc, p) => acc + (p.stock * p.purchasePrice), 0)
  }), [parts]);

  const handleQuickSearch = (brand: string, model: string) => {
    const query = `${brand} ${model}`.trim();
    setSearchQuery(query);
    setFilterCategory('All');
    setActiveView('INVENTORY');
  };

  const handleAddPart = (newPart: Omit<Part, 'id' | 'movements'>) => {
    const partWithId: Part = {
      ...newPart,
      id: Math.random().toString(36).substr(2, 9),
      movements: [{ id: 'm-init', date: new Date().toISOString(), type: 'IN', quantity: newPart.stock, note: 'Stock inicial' }]
    };
    setParts([...parts, partWithId]);
    setIsPartModalOpen(false);
  };

  const handleUpdatePart = (updatedPart: Part) => {
    setParts(parts.map(p => p.id === updatedPart.id ? updatedPart : p));
    setEditingPart(null);
    setIsPartModalOpen(false);
    if (selectedPartDetails?.id === updatedPart.id) {
      setSelectedPartDetails(updatedPart);
    }
  };

  const handleDeletePart = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta pieza?')) {
      setParts(parts.filter(p => p.id !== id));
      setSelectedPartDetails(null);
    }
  };

  const handleStockAdjustment = (partId: string, delta: number, note: string) => {
    setParts(prev => prev.map(p => {
      if (p.id === partId) {
        const newStock = Math.max(0, p.stock + delta);
        const movement = {
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString(),
          type: delta > 0 ? 'IN' as const : 'OUT' as const,
          quantity: Math.abs(delta),
          note
        };
        return { ...p, stock: newStock, movements: [movement, ...p.movements] };
      }
      return p;
    }));
  };

  const Navigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 md:relative md:border-t-0 md:flex-col md:w-64 md:h-screen md:p-4 md:bg-white md:border-r z-20">
      <div className="hidden md:flex items-center space-x-2 mb-8 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">AP</div>
        <span className="text-xl font-bold tracking-tight">AutoPart Pro</span>
      </div>
      <NavItem icon={<ICONS.Dashboard />} label="Dashboard" active={activeView === 'DASHBOARD'} onClick={() => setActiveView('DASHBOARD')} />
      <NavItem icon={<ICONS.Inventory />} label="Inventario" active={activeView === 'INVENTORY'} onClick={() => setActiveView('INVENTORY')} />
      <NavItem icon={<ICONS.Analytics />} label="Reportes" active={activeView === 'ANALYTICS'} onClick={() => setActiveView('ANALYTICS')} />
      <NavItem icon={<ICONS.Settings />} label="Configuración" active={activeView === 'SETTINGS'} onClick={() => setActiveView('SETTINGS')} />
    </nav>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeView === 'DASHBOARD' && <Dashboard stats={stats} parts={parts} onQuickSearch={handleQuickSearch} />}
        {activeView === 'INVENTORY' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
                {searchQuery && <p className="text-sm text-indigo-600">Filtrando por: <b>{searchQuery}</b></p>}
              </div>
              <div className="flex space-x-2">
                {searchQuery && (
                   <button 
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 text-gray-500 hover:text-red-500 transition text-sm font-medium"
                  >
                    Limpiar Filtros
                  </button>
                )}
                <button 
                  onClick={() => { setEditingPart(null); setIsPartModalOpen(true); }}
                  className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-md"
                >
                  <ICONS.Plus />
                  <span>Nueva Pieza</span>
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <ICONS.Search />
                </span>
                <input 
                  type="text" 
                  placeholder="Buscar por nombre, referencia o vehículo (ej: Toyota Corolla)..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">Todas las Categorías</option>
                {Object.values(Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <InventoryTable 
              parts={filteredParts} 
              onRowClick={setSelectedPartDetails} 
              onEditClick={(part) => { setEditingPart(part); setIsPartModalOpen(true); }}
            />
          </div>
        )}
        {activeView === 'ANALYTICS' && <Analytics parts={parts} />}
        {activeView === 'SETTINGS' && (
          <div className="text-center py-20 text-gray-500 italic">
            Configuración del sistema (Gestión de Usuarios, Marcas y Modelos próximamente...)
          </div>
        )}
      </main>

      {/* Modals */}
      {isPartModalOpen && (
        <PartModal 
          isOpen={isPartModalOpen} 
          onClose={() => setIsPartModalOpen(false)} 
          onSubmit={editingPart ? handleUpdatePart : handleAddPart}
          initialData={editingPart}
        />
      )}

      {selectedPartDetails && (
        <DetailModal 
          part={selectedPartDetails} 
          onClose={() => setSelectedPartDetails(null)}
          onEdit={() => { setEditingPart(selectedPartDetails); setIsPartModalOpen(true); }}
          onDelete={() => handleDeletePart(selectedPartDetails.id)}
          onStockAdjust={handleStockAdjustment}
        />
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-3 p-2 md:p-3 rounded-xl transition w-full text-xs md:text-base font-medium ${active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-50'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default App;
