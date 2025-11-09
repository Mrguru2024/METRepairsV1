/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingScheduler from './index';

describe('BookingScheduler', () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  beforeEach(() => {
    mockFetch.mockImplementation((input, init) => {
      if (typeof input === 'string' && input.includes('/api/bookings') && init?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          status: 201,
          json: async () => ({
            booking: {
              id: 'booking_1',
              date: new Date().toISOString(),
              service: 'Locksmithing',
            },
          }),
        });
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ bookings: [] }),
      });
    });
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('renders calendar and form fields', async () => {
    render(<BookingScheduler />);
    expect(await screen.findByText(/Schedule a Booking/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Jamie Rivera/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /09:00/i })).toBeInTheDocument();
  });

  it('requires a date before selecting a time slot', async () => {
    render(<BookingScheduler />);
    const timeButton = await screen.findByRole('button', { name: '09:00' });
    await userEvent.click(timeButton);
    expect(await screen.findByText(/Please choose a date first/i)).toBeInTheDocument();
  });

  it('submits a booking and shows confirmation', async () => {
    render(<BookingScheduler />);

    const dayButtons = await screen.findAllByRole('button', { name: /\d+/ });
    const validDay = dayButtons.find((btn) => btn instanceof HTMLButtonElement && !btn.disabled);
    expect(validDay).toBeDefined();
    if (validDay) {
      await userEvent.click(validDay);
    }

    const timeButton = await screen.findByRole('button', { name: '09:00' });
    await userEvent.click(timeButton);

    await userEvent.type(screen.getByPlaceholderText(/Jamie Rivera/i), 'Alex Doe');
    await userEvent.type(screen.getByPlaceholderText(/you@example.com/i), 'alex@example.com');
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Locksmithing');

    await userEvent.click(screen.getByRole('button', { name: /Confirm Booking/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/bookings',
        expect.objectContaining({ method: 'POST' }),
      );
    });
    expect(await screen.findByText(/Booking confirmed/i)).toBeInTheDocument();
  });
});

