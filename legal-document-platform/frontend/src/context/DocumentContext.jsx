import React, { createContext, useContext, useState } from 'react';

const DocumentContext = createContext();

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider = ({ children }) => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: ''
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      category: '',
      search: ''
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        currentDocument,
        setCurrentDocument,
        documents,
        setDocuments,
        filters,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
