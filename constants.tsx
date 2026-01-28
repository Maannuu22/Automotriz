
import React from 'react';
import { Part, Category } from './types';

export const BRANDS_MODELS_MAP: Record<string, string[]> = {
  'Toyota': ['Corolla', 'Hilux', 'Yaris', 'RAV4', 'Land Cruiser'],
  'Chevrolet': ['Onix', 'Silverado', 'Cruze', 'Tracker', 'Captiva'],
  'Ford': ['F-150', 'Ranger', 'EcoSport', 'Explorer', 'Focus'],
  'Honda': ['Civic', 'CR-V', 'Accord', 'Fit', 'HR-V'],
  'Nissan': ['Sentra', 'Frontier', 'Versa', 'Kicks', 'Qashqai'],
  'Hyundai': ['Tucson', 'Accent', 'Santa Fe', 'i30', 'Kona']
};

export const MOCK_PARTS: Part[] = [
  {
    id: '1',
    name: 'Pastillas de Freno Delanteras',
    reference: 'BRK-99201',
    description: 'Pastillas de cerámica de alto rendimiento para clima cálido.',
    category: Category.FRENOS,
    brand: 'Brembo',
    compatibleModels: ['Toyota Corolla', 'Honda Civic'],
    purchasePrice: 25.50,
    salePrice: 45.00,
    stock: 15,
    minStock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1486001029854-f745c85fd5a4?auto=format&fit=crop&q=80&w=200&h=200',
    barcode: '741258963',
    movements: [
      { id: 'm1', date: '2023-10-01', type: 'IN', quantity: 20, note: 'Compra inicial proveedor' },
      { id: 'm2', date: '2023-10-05', type: 'OUT', quantity: 5, note: 'Venta cliente #102' }
    ]
  },
  {
    id: '2',
    name: 'Filtro de Aceite Sintético',
    reference: 'OIL-FLT-22',
    description: 'Filtro premium de larga duración (15,000 km).',
    category: Category.MOTOR,
    brand: 'Mann Filter',
    compatibleModels: ['Chevrolet Cruze', 'Ford Focus'],
    purchasePrice: 8.00,
    salePrice: 15.00,
    stock: 2,
    minStock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1635773054018-02905001a1d6?auto=format&fit=crop&q=80&w=200&h=200',
    movements: []
  },
  {
    id: '3',
    name: 'Amortiguador Trasero',
    reference: 'SUS-SHK-05',
    description: 'Amortiguador a gas para máxima estabilidad.',
    category: Category.SUSPENSION,
    brand: 'KYB',
    compatibleModels: ['Toyota Hilux', 'Ford Ranger'],
    purchasePrice: 40.00,
    salePrice: 75.00,
    stock: 0,
    minStock: 2,
    imageUrl: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=200&h=200',
    movements: []
  },
  {
    id: '4',
    name: 'Bombilla LED H7',
    reference: 'LGT-H7-LED',
    description: 'Kit de luces LED blancas 6000K.',
    category: Category.ILUMINACION,
    brand: 'Philips',
    compatibleModels: ['Honda CR-V', 'Nissan Sentra'],
    purchasePrice: 30.00,
    salePrice: 55.00,
    stock: 12,
    minStock: 4,
    imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=200&h=200',
    movements: []
  }
];

export const ICONS = {
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Inventory: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  Analytics: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  Delete: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  ArrowDown: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
  ArrowUp: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>,
  History: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Car: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8a2 2 0 012 2v9H6V9a2 2 0 012-2zM11 13h2m-6 4h12M7 9h10" /></svg>,
};
