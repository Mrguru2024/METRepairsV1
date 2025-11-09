import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BookingScheduler from './index';

const StoryWrapper = () => {
  useEffect(() => {
    const originalFetch = window.fetch ? window.fetch.bind(window) : undefined;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      if (typeof input === 'string' && input.includes('/api/bookings')) {
        if (init?.method === 'POST') {
          return new Response(
            JSON.stringify({
              booking: {
                id: 'storybook',
                date: new Date().toISOString(),
                service: 'Locksmithing',
              },
            }),
            {
              status: 201,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }

        return new Response(
          JSON.stringify({
            bookings: [
              {
                id: 'storybook-existing',
                date: new Date().toISOString(),
                service: 'Electrical',
              },
            ],
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      return originalFetch ? originalFetch(input, init) : Response.error();
    };

    return () => {
      if (originalFetch) {
        window.fetch = originalFetch;
      }
    };
  }, []);

  return <BookingScheduler />;
};

const meta: Meta<typeof BookingScheduler> = {
  title: 'Components/BookingScheduler',
  component: BookingScheduler,
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <StoryWrapper />,
};

export default meta;
type Story = StoryObj<typeof BookingScheduler>;

export const Default: Story = {};

