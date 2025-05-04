'use client';
import React from 'react';
import { Refresh } from '@/icons';

const RefreshButton: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button 
      onClick={handleRefresh} 
      className="px-4 py-2 flex gap-2 bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition"
    >
      <Refresh /> Atualizar
    </button>
  );
};

export default RefreshButton;
