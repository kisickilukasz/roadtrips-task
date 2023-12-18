import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { TripDetailsHeader } from './TripDetailsHeader';
import { Spinner, Divider, Box, Stack } from '@chakra-ui/react';
import { TripDetailsImage } from './TripDetailsImage';
import { TripDetailsCard } from './TripDetailsCard';
import { TripDetailsOverview } from './TripDetailsOverview';
import { TripDetailsFooter } from './TripDetailsFooter';

import { Trip } from '../App';

async function getTripDetails(id?: string) {
  return await axios.get(`http://localhost:3000/trips/${id}`);
}

function useGetTripDetails(id?: string) {
  return useQuery<AxiosResponse<Trip>>({
    enabled: false,
    queryKey: ['trip details', id],
    queryFn: async () => getTripDetails(id)
  });
}

export function TripDetails() {
  const { id } = useParams();

  const { isFetching, error, data, refetch } = useGetTripDetails(id);

  useEffect(() => {
    if (id && data?.data.id !== parseInt(id)) {
      refetch();
    }
  }, [data?.data.id, id, refetch]);

  if (error) return 'An error has occurred: ' + error.message;

  if (isFetching) return <Spinner />;

  if (!data) return null;

  return (
    <Box>
      <Box p="20px 40px">
        <Stack spacing={6}>
          <Box
            as="span"
            fontSize="sm"
            fontWeight="bold"
            color="grey"
            borderBottom="2px solid grey"
            w="max-content"
          >
            <Link to="/">Go back</Link>
          </Box>
          <TripDetailsHeader title={data.data.title} />
          <Stack direction={['column', null, 'row']} justifyContent="space-between">
            <TripDetailsImage imageUrl={data.data.imageUrl} />
            <TripDetailsCard
              days={data.data.days}
              countries={data.data.countries}
              emissions={data.data.emissions}
            />
          </Stack>
          <TripDetailsOverview />
          <Divider w={['100%', null, '65%']} />
          <TripDetailsFooter />
        </Stack>
      </Box>
    </Box>
  );
}
