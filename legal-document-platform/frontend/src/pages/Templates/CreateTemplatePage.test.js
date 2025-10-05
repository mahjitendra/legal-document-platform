import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import CreateTemplatePage from './CreateTemplatePage';
import templateService from '../../api/services/templateService';

// Mock the templateService and react-router-dom's useNavigate
jest.mock('../../api/services/templateService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CreateTemplatePage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    templateService.createTemplate.mockResolvedValue({ data: {} });
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <CreateTemplatePage />
      </MemoryRouter>
    );
  };

  test('renders the create template form', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Template Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Template Content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Template/i })).toBeInTheDocument();
  });

  test('allows typing in form fields', () => {
    renderComponent();
    const nameInput = screen.getByPlaceholderText(/Template Name/i);
    fireEvent.change(nameInput, { target: { value: 'New Test Template' } });
    expect(nameInput.value).toBe('New Test Template');
  });

  test('submits the form and calls the createTemplate service', async () => {
    renderComponent();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Template Name/i), { target: { value: 'My New Template' } });
    fireEvent.change(screen.getByPlaceholderText(/Category/i), { target: { value: 'General' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'A simple template.' } });
    fireEvent.change(screen.getByPlaceholderText(/Template Content/i), { target: { value: '<p>Hello World</p>' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create Template/i }));

    // Wait for the submission to complete
    await waitFor(() => {
      expect(templateService.createTemplate).toHaveBeenCalledWith(
        {
          name: 'My New Template',
          category: 'General',
          description: 'A simple template.',
          content: '<p>Hello World</p>',
        },
        'mock_token' // The token is mocked in the component
      );
    });

    // Check for navigation on success
    expect(mockNavigate).toHaveBeenCalledWith('/templates');
  });

  test('shows an error message if submission fails', async () => {
    templateService.createTemplate.mockRejectedValue(new Error('Creation failed'));
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /Create Template/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to create template./i)).toBeInTheDocument();
    });
  });
});