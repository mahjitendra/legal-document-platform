import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import EditTemplatePage from './EditTemplatePage';
import templateService from '../../api/services/templateService';

jest.mock('../../api/services/templateService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockTemplate = {
  id: 1,
  name: 'Initial Name',
  category: 'Initial Category',
  description: 'Initial Description',
  content: 'Initial Content',
};

describe('EditTemplatePage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    templateService.getTemplate.mockResolvedValue({ data: mockTemplate });
    templateService.updateTemplate.mockResolvedValue({ data: {} });
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/templates/edit/1']}>
        <Routes>
          <Route path="/templates/edit/:id" element={<EditTemplatePage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('fetches template data and populates the form', async () => {
    renderComponent();

    // The form fields should be populated after the data is fetched.
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Template Name/i).value).toBe(mockTemplate.name);
      expect(screen.getByPlaceholderText(/Category/i).value).toBe(mockTemplate.category);
      expect(screen.getByPlaceholderText(/Description/i).value).toBe(mockTemplate.description);
      expect(screen.getByPlaceholderText(/Template Content/i).value).toBe(mockTemplate.content);
    });
  });

  test('submits the updated form data', async () => {
    renderComponent();

    // Wait for the form to be populated
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Template Name/i).value).toBe(mockTemplate.name);
    });

    // Change a value in the form
    fireEvent.change(screen.getByPlaceholderText(/Template Name/i), { target: { value: 'Updated Name' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Update Template/i }));

    await waitFor(() => {
      expect(templateService.updateTemplate).toHaveBeenCalledWith(
        '1', // The id from the URL
        expect.objectContaining({ name: 'Updated Name' }),
        'mock_token'
      );
    });

    // Check for navigation on success
    expect(mockNavigate).toHaveBeenCalledWith('/templates/1');
  });

  test('shows an error message if the update fails', async () => {
    templateService.updateTemplate.mockRejectedValue(new Error('Update failed'));
    renderComponent();

    // Wait for form population
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Template Name/i).value).toBe(mockTemplate.name);
    });

    fireEvent.click(screen.getByRole('button', { name: /Update Template/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to update template./i)).toBeInTheDocument();
    });
  });
});