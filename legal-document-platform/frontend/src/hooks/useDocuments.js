import { useState, useEffect } from 'react';
import { documentService } from '../api/services/documentService';

export const useDocuments = (autoFetch = true) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.getDocuments(params);
      setDocuments(response.data.documents || []);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getDocument = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.getDocumentById(id);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (documentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.createDocument(documentData);
      setDocuments(prev => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (id, documentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.updateDocument(id, documentData);
      setDocuments(prev => prev.map(doc => doc.id === id ? response.data : doc));
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await documentService.deleteDocument(id);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchDocuments();
    }
  }, [autoFetch]);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};
