import { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Stack, Spinner, Box } from '@chakra-ui/react';
import { TripCard } from './components/TripCard';

export interface Trip {
  id: number;
  countries: string[];
  emissions: number;
  days: number;
  title: string;
  imageUrl: string;
  rating: number;
}
type TripsData = Trip[];

interface TripsResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalTrips: number;
  trips: TripsData;
}

// Since it's only 2 endpoints I've decided to keep api functions as well as tanstack/queries
// in the same module/files where they're being used. In the larger application this could reduce readability
async function getTrips({ page = 1, limit = 20 }: { page: number; limit: number }) {
  return await axios.get(`http://localhost:3000/trips/?page=${page}&limit=${limit}`);
}

function useGetTrips() {
  const limit = 20;
  return useInfiniteQuery<AxiosResponse<TripsResponse>>({
    initialPageParam: undefined,
    enabled: false,
    queryKey: ['trips', limit],
    queryFn: async ({ pageParam = 1 }) => getTrips({ page: pageParam as number, limit }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.page < lastPage.data.totalPages ? allPages.length + 1 : undefined;
    }
  });
}

export function App() {
  const { ref, inView } = useInView();

  const { isFetchingNextPage, error, data, hasNextPage, fetchNextPage, refetch } = useGetTrips();

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box>
      <Stack
        direction={['column', 'row']}
        spacing="72px"
        wrap="wrap"
        justifyContent="space-around"
        padding="40px"
        data-testid="stack"
      >
        {data?.pages.map((page) => {
          return page.data.trips.map((trip, i) => {
            return (
              <TripCard
                ref={ref}
                key={trip.id}
                id={trip.id}
                src={trip.imageUrl}
                emissions={trip.emissions}
                countries={trip.countries}
                days={trip.days}
                title={trip.title}
                rating={trip.rating}
                {...(page.data.trips.length === i + 1 && { ref })}
              />
            );
          });
        })}
      </Stack>
      {isFetchingNextPage && <Spinner />}
    </Box>
  );
}
