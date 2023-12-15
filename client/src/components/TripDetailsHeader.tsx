import { Box, Heading, VStack } from '@chakra-ui/react';

interface TripDetailsHeaderProps {
  title: string;
}
export function TripDetailsHeader({ title }: TripDetailsHeaderProps) {
  return (
    <VStack mt={6} alignItems="flex-start" spacing={2}>
      <Heading size="md">{title}</Heading>
      <Box color="grey" fontSize="xs" fontWeight="bold">
        Lorem ipsum dolor sit amet
      </Box>
    </VStack>
  );
}
