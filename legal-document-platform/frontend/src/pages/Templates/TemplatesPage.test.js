import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import TemplatesPage from './TemplatesPage';
import templateService from '../../api/services/templateService';

// Mock the templateService
jest.mock('../../api/services/templateService');

const mockTemplates = [
  { id: 1, name: 'Template A', description: 'Description A' },
  { id: 2, name: 'Template B', description: 'Description B' },
];

describe('TemplatesPage Component', () => {
  beforeEach(() => {
    templateService.getTemplates.mockResolvedValue({ data: mockTemplates });
  });

  test('renders loading state initially and then displays templates', async () => {
    render(
      <MemoryRouter>
        <TemplatesPage />
      </MemoryRouter>
    );

    // Check for loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for templates to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Template A')).toBeInTheDocument();
      expect(screen.getByText('Template B')).toBeInTheDocument();
    });

    // Check that loading text is gone
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  test('displays "Create New Template" button for admin users', async () => {
    // Mocking admin user via component prop or context is tricky here
    // since the component hardcodes the user. We rely on the default mock.
    render(
      <MemoryRouter>
        <TemplatesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Create New Template/i)).toBeInTheDocument();
    });
  });
});