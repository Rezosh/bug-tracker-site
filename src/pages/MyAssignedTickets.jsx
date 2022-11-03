import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import TicketCreationModal from "../components/Modals/TicketCreationModal";
import AssignedTicketsTable from "../components/Tables/AssignedTicketsTable";

const MyAssignedTickets = () => {
  return (
    <Box>
      <Stack spacing={10}>
        <Box pb={6} borderBottom={"1px"} borderColor={"gray.200"}>
          <Heading size='xl' color='gray.700'>
            My Assigned Tickets
          </Heading>
          <Text color={"gray.600"} mt={6}>
            View and manage all your assigned tickets.
          </Text>
        </Box>
        <Stack spacing={10}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify='space-between'>
            <TicketCreationModal />
          </Flex>
          <Stack>
            <AssignedTicketsTable />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MyAssignedTickets;
