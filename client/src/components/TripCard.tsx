import { forwardRef, ForwardedRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Heading, Text, CardFooter, Box, Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface TripCardProp {
  id: number;
  src: string;
  title: string;
  countries: string[];
  days: number;
  emissions: number;
  rating: number;
}

export const TripCard = forwardRef(function TripCard(
  props: TripCardProp,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { src, title, countries, days, emissions, rating } = props;
  return (
    <div {...(Boolean(ref) && { ref })}>
      <Flex
        borderRadius="26px"
        boxShadow="0 17px 22px 0 rgba(0, 0, 0, 0.12),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        w="500px"
        h="400px"
        justifyContent="center"
        alignItems="center"
        bgColor="white"
      >
        <Card
          align="center"
          bgImage={`url(${src})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          w="470px"
          h="370px"
          borderRadius="13px"
          color="white"
        >
          <CardHeader pt="60px" textAlign="center">
            <Heading size="lg">{title}</Heading>
            <Text>
              {countries.length} countries, {days} days
            </Text>
          </CardHeader>
          <CardBody
            pb="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box bgColor="#15438c" p="10px" borderRadius="8px">
              <Link to={`trips/${props.id}`}>Learn more</Link>
            </Box>
            <Flex
              w="400px"
              justifyContent="space-between"
              bgColor="#000033"
              p="14px"
              mt="39px"
              mb="9px"
              borderRadius="13px"
            >
              <Box>Emissions offset: </Box>
              <Box>{emissions} kg CO2e</Box>
            </Flex>
          </CardBody>
          <CardFooter pt="5px" fontWeight="bold">
            <Flex
              w="400px"
              justifyContent="space-between"
              bgColor="white"
              p="14px"
              pb="25px"
              borderTopLeftRadius="13px"
              borderTopRightRadius="13px"
              color="black"
            >
              <Box display="flex" w="100%" justifyContent="space-between">
                <Box>Trip rating</Box>
                <Box display="flex" alignItems="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < rating ? 'yellow.300' : 'gray.300'}
                        ml="2px"
                        mr="2px"
                      />
                    ))}
                  <Box ml="10px">{rating}</Box>
                </Box>
              </Box>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </div>
  );
});
