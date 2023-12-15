import { Box, Heading, Stack, VStack } from '@chakra-ui/react';
import { TbFlag3 } from 'react-icons/tb';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';
import { PiShoppingBagOpen } from 'react-icons/pi';
import { MdOutlinePeopleAlt } from 'react-icons/md';

import { OverviewAdvantage } from './OverviewAdvantage';

export function TripDetailsOverview() {
  return (
    <VStack w={['100%', null, '65%']} spacing={6} alignItems="flex-start">
      <Box>
        <Heading size="sm">Overview</Heading>
      </Box>
      <Stack
        direction={['column', null, 'row']}
        wrap="wrap"
        justifyContent="space-around"
        spacing={6}
      >
        <OverviewAdvantage icon={TbFlag3} title={'1st Advantage'} />
        <OverviewAdvantage icon={HiOutlineGlobeAsiaAustralia} title={'2nd Advantage'} />
        <OverviewAdvantage icon={PiShoppingBagOpen} title={'3rd Advantage'} />
        <OverviewAdvantage icon={MdOutlinePeopleAlt} title={'4th Advantage'} />
      </Stack>
    </VStack>
  );
}
