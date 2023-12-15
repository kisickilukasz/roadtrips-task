import { Box, Image } from '@chakra-ui/react';

interface TripDetailsImageProps {
  imageUrl: string;
}

export function TripDetailsImage({ imageUrl }: TripDetailsImageProps) {
  return (
    <Box w={['100%', null, '65%']}>
      <Image src={imageUrl} alt="landscape" borderRadius="lg" objectFit="cover" w="100%" />
    </Box>
  );
}
