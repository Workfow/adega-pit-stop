import { createContext, useState } from 'react';

import PdfModal from '../components/PdfModal';

export const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  const [ isPdfModalOpen, setIsPdfModalOpen ] = useState(false);

  function handleTogglePdfModal() {
    if (isPdfModalOpen) {
      setIsPdfModalOpen(false);
    } else {
      setIsPdfModalOpen(true);
    }
  }

  return (
    <FinancialContext.Provider value={{
      handleTogglePdfModal
    }}>
      {children}
      {isPdfModalOpen && <PdfModal />}
    </FinancialContext.Provider>
  )
}