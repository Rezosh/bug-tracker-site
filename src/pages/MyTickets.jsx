import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import TicketCreationModal from "../components/Modals/TicketCreationModal";
import UserTicketsTable from "../components/Tables/UserTicketsTable";

const MyTickets = () => {
  return (
    <Box>
      <Stack spacing={10}>
        <Box pb={6} borderBottom={"1px"} borderColor={"gray.200"}>
          <Heading size='xl' color='gray.700'>
            My Tickets
          </Heading>
          <Text color={"gray.600"} mt={6}>
            View and manage all your open tickets.
          </Text>
        </Box>
        <Stack spacing={10}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify='space-between'>
            <TicketCreationModal />
          </Flex>
          <Stack>
            <UserTicketsTable />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MyTickets;
