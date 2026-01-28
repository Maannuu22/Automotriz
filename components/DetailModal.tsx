
import React, { useState } from 'react';
import { Part } from '../types';
import { ICONS } from '../constants';

interface DetailModalProps {
  part: Part;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStockAdjust: (partId: string, delta: number, note: string) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ part, onClose, onEdit, onDelete, onStockAdjust }) => {
  const [adjustAmount, setAdjustAmount] = useState<number>(0);
  const [adjustNote, setAdjustNote] = useState('');
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleAdjust = (type: 'IN' | 'OUT') => {
    if (adjustAmount <= 0) return;
    const delta = type === 'IN' ? adjustAmount : -adjustAmount;
    onStockAdjust(part.id, delta, adjustNote || (type === 'IN' ? 'Entrada manual' : 'Salida manual'));
    setAdjustAmount(0);
    setAdjustNote('');
    setIsAdjusting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left: Image & Quick Stats */}
        <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
          <button onClick={onClose} className="self-end md:hidden mb-4 p-2 hover:bg-gray-200 rounded-full">
            <ICONS.Close />
          </button>
          
          <img src={part.imageUrl} alt={part.name} className="w-48 h-48 rounded-2xl object-cover shadow-lg mb-6" />
          
          <h2 className="text-xl font-bold text-center mb-1">{part.name}</h2>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-6 uppercase">
            {part.category}
          </span>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Stock</p>
              <p className={`text-2xl font-black ${part.stock <= part.minStock ? 'text-amber-500' : 'text-green-600'}`}>{part.stock}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Mínimo</p>
              <p className="text-2xl font-black text-gray-400">{part.minStock}</p>
            </div>
          </div>

          <div className="w-full mt-6 space-y-4">
            <button 
              onClick={onEdit}
              className="w-full flex items-center justify-center space-x-2 py-2 border border-gray-300 rounded-lg hover:bg-white hover:shadow transition text-gray-700 font-medium"
            >
              <ICONS.Edit />
              <span>Editar Datos</span>
            </button>
            <button 
              onClick={onDelete}
              className="w-full flex items-center justify-center space-x-2 py-2 text-red-500 hover:bg-red-50 rounded-lg transition font-medium"
            >
              <ICONS.Delete />
              <span>Eliminar Pieza</span>
            </button>
          </div>
        </div>

        {/* Right: Detailed Info & Tabs */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="hidden md:flex justify-end mb-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <ICONS.Close />
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Detalles Generales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Referencia</p>
                  <p className="font-mono font-medium">{part.reference}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Marca</p>
                  <p className="font-medium">{part.brand}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Precio Venta</p>
                  <p className="text-xl font-bold text-indigo-600">${part.salePrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Precio Compra</p>
                  <p className="text-lg font-medium text-gray-500">${part.purchasePrice.toFixed(2)}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-xs text-gray-400 font-bold uppercase">Modelos Compatibles</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {part.compatibleModels.map(model => (
                      <span key={model} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">{model}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-indigo-900 font-bold">Gestión de Stock</h3>
                {!isAdjusting && (
                  <button 
                    onClick={() => setIsAdjusting(true)}
                    className="text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-600 hover:text-white transition"
                  >
                    AJUSTAR STOCK
                  </button>
                )}
              </div>
              
              {isAdjusting ? (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number" 
                      placeholder="Cant."
                      className="w-24 px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                      value={adjustAmount || ''}
                      onChange={(e) => setAdjustAmount(parseInt(e.target.value) || 0)}
                    />
                    <input 
                      type="text" 
                      placeholder="Nota (ej. Venta cliente X)"
                      className="flex-1 px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={adjustNote}
                      onChange={(e) => setAdjustNote(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAdjust('IN')}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <ICONS.ArrowUp />
                      <span>Entrada</span>
                    </button>
                    <button 
                      onClick={() => handleAdjust('OUT')}
                      className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <ICONS.ArrowDown />
                      <span>Salida</span>
                    </button>
                    <button 
                      onClick={() => setIsAdjusting(false)}
                      className="px-4 py-2 text-indigo-400 font-medium"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-indigo-700 italic">Haz clic en ajustar para registrar entradas o salidas de mercancía.</p>
              )}
            </section>

            <section>
              <div className="flex items-center space-x-2 mb-4">
                <ICONS.History />
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Historial de Movimientos</h3>
              </div>
              <div className="space-y-3">
                {part.movements.length > 0 ? part.movements.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-lg ${m.type === 'IN' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {m.type === 'IN' ? <ICONS.ArrowUp /> : <ICONS.ArrowDown />}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{m.note}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{new Date(m.date).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`font-black ${m.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                      {m.type === 'IN' ? '+' : '-'}{m.quantity}
                    </span>
                  </div>
                )) : (
                  <p className="text-gray-400 text-center py-4 italic">No hay movimientos registrados.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
