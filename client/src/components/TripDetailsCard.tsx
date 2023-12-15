import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  HStack,
  ListItem,
  UnorderedList,
  VStack
} from '@chakra-ui/react';

interface TripDetailsCardProps {
  days: number;
  emissions: number;
  countries: string[];
}

export function TripDetailsCard({ days, countries, emissions }: TripDetailsCardProps) {
  return (
    <Card h="max-content" p={4} w={['100%', null, '30%']}>
      <VStack alignItems="flex-start">
        <CardHeader pl={0}>
          <VStack spacing={2} alignItems="flex-start">
            <Heading size="md">{days} days</Heading>
            <Box color="grey" fontSize="xs" fontWeight="bold">
              Emissions: {emissions} kg CO2e
            </Box>
          </VStack>
        </CardHeader>
        <Divider />
        <CardBody pl={0} w="100%" pb={0}>
          <Box color="grey" fontSize="xs" fontWeight="bold">
            Countries included
          </Box>
          <HStack color="grey" fontSize="xs" p={2}>
            <UnorderedList w="50%">
              {countries.slice(0, Math.ceil(countries.length / 2)).map((country, i) => (
                <ListItem key={i}>{country}</ListItem>
              ))}
            </UnorderedList>
            <UnorderedList>
              {countries.slice(Math.ceil(countries.length / 2)).map((country, i) => (
                <ListItem key={i}>{country}</ListItem>
              ))}
            </UnorderedList>
          </HStack>
        </CardBody>
      </VStack>
    </Card>
  );
}
