import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { App } from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { TripDetails } from '../components/TripDetails';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

jest.mock('react-intersection-observer', () => ({
  useInView: () => jest.fn()
}));

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <div>Oops!! Page not found!</div>
    },
    {
      path: '/trips/:id',
      element: <TripDetails />
    }
  ],
  {
    initialEntries: ['/']
  }
);

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ''
      }
    })
  }
});

const queryClient = new QueryClient();

const AllTheProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const mockedTrip = {
  id: '1',
  countries: ['Poland', 'Norway', 'Germany', 'Austria', 'Italy', 'Switzerland', 'France', 'Spain'],
  emissions: 500,
  days: 21,
  title: 'European Quest',
  imageUrl: '',
  rating: 3
};

describe('ui tests', () => {
  beforeEach(() => {
    jest.resetModules();
    mock
      .onGet('http://localhost:3000/trips/?page=1&limit=20')
      .reply(200, {
        trips: [mockedTrip]
      })
      .onGet('http://localhost:3000/trips/1')
      .reply(200, mockedTrip);
  });

  afterEach(() => {
    mock.resetHistory();
  });

  test('renders data returned by api on main page', async () => {
    render(<AllTheProviders />);

    const title = await screen.findByText('European Quest');
    const subTitle = screen.getByText('8 countries, 21 days');
    const emissionsInfo = screen.getByText('500 kg CO2e');

    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(emissionsInfo).toBeInTheDocument();
  });

  test('renders main page, details page and again main page after go back', async () => {
    render(<AllTheProviders />);

    const cardBtn = await screen.findByText('Learn more');
    fireEvent.click(cardBtn);
    const detailsHeader = await screen.findByText('European Quest');
    const emissionsInfo = screen.getByText('Emissions: 500 kg CO2e');
    expect(detailsHeader).toBeInTheDocument();
    expect(emissionsInfo).toBeInTheDocument();
    mockedTrip.countries.forEach((country) => {
      expect(screen.getByText(country)).toBeInTheDocument();
    });
    const backBtn = screen.getByText('Go back');
    fireEvent.click(backBtn);
    expect(screen.getByText('8 countries, 21 days')).toBeInTheDocument();
  });
});
