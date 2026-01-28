
import React from 'react';
import { Part, StockStatus } from '../types';
import { ICONS } from '../constants';

interface InventoryTableProps {
  parts: Part[];
  onRowClick: (part: Part) => void;
  onEditClick: (part: Part) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ parts, onRowClick, onEditClick }) => {
  const getStockStatus = (part: Part): { label: string, color: string } => {
    if (part.stock === 0) return { label: StockStatus.OUT_OF_STOCK, color: 'text-red-700 bg-red-100' };
    if (part.stock <= part.minStock) return { label: StockStatus.LOW_STOCK, color: 'text-amber-700 bg-amber-100' };
    return { label: StockStatus.IN_STOCK, color: 'text-green-700 bg-green-100' };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Imagen</th>
              <th className="px-6 py-4">Pieza / Ref.</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Precio Venta</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {parts.map((part) => {
              const status = getStockStatus(part);
              return (
                <tr 
                  key={part.id} 
                  className="hover:bg-gray-50 transition cursor-pointer group"
                  onClick={() => onRowClick(part)}
                >
                  <td className="px-6 py-4">
                    <img src={part.imageUrl} alt={part.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{part.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{part.reference}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm px-2 py-1 bg-gray-100 rounded-md text-gray-600">{part.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{part.stock}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full w-fit uppercase ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-indigo-600">${part.salePrice.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEditClick(part); }}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      >
                        <ICONS.Edit />
                      </button>
                      <button className="p-2 text-gray-300 group-hover:text-gray-600">
                        <ICONS.ChevronRight />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {parts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                  No se encontraron resultados para tu búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
