import { ElementType } from 'react';
import { Box, Heading, HStack, VStack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';

interface OverviewAdvantageProps {
  icon: ElementType;
  title: string;
}

export function OverviewAdvantage({ icon, title }: OverviewAdvantageProps) {
  return (
    <HStack w={['100%', null, null, '48%']}>
      <Box alignSelf="flex-start">
        <Icon as={icon} boxSize={8} />
      </Box>
      <VStack alignItems="flex-start">
        <Heading size="sm">{title}</Heading>
        <Box fontSize="xs" fontWeight="bold" color="grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat
        </Box>
      </VStack>
    </HStack>
  );
}
