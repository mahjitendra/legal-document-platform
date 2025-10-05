import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TemplateDetailPage from './TemplateDetailPage';
import templateService from '../../api/services/templateService';

jest.mock('../../api/services/templateService');

const mockTemplate = {
  id: 1,
  name: 'Detailed Template',
  description: 'A very detailed description.',
  category: 'Legal',
  content: 'This is the full content of the template.',
};

describe('TemplateDetailPage Component', () => {
  beforeEach(() => {
    templateService.getTemplate.mockResolvedValue({ data: mockTemplate });
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/templates/1']}>
        <Routes>
          <Route path="/templates/:id" element={<TemplateDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders loading state and then template details', async () => {
    renderComponent();

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Detailed Template')).toBeInTheDocument();
      expect(screen.getByText(/A very detailed description./i)).toBeInTheDocument();
      expect(screen.getByText(/This is the full content of the template./i)).toBeInTheDocument();
    });
  });

  test('displays admin buttons for admin users', async () => {
    renderComponent();

    await waitFor(() => {
      // The buttons are wrapped in a Link or have an onClick, so we find by role.
      expect(screen.getByRole('button', { name: /Edit Template/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Delete Template/i })).toBeInTheDocument();
    });
  });

  test('shows an error message if fetching fails', async () => {
    templateService.getTemplate.mockRejectedValue(new Error('API Error'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch template./i)).toBeInTheDocument();
    });
  });
});