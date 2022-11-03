import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  HiLockOpen,
  HiLockClosed,
  HiCalendar,
  HiChatAlt,
} from "react-icons/hi";
import { formatReadableDate, capitalizeString } from "../../utils";
const Details = ({ ticket }) => {
  const isClosed = ticket.status === "closed";
  const formattedDate = formatReadableDate(ticket.createdAt);

  return (
    <Stack>
      <Flex align='center'>
        <Icon
          as={isClosed ? HiLockClosed : HiLockOpen}
          color={isClosed ? "red.500" : "green.500"}
          h={4}
          w={4}
        />
        <Text
          as='span'
          ml={2}
          fontSize='sm'
          color={isClosed ? "red.500" : "green.500"}>
          {capitalizeString(ticket.status)} Issue
        </Text>
      </Flex>

      <Flex align='center'>
        <Icon as={HiChatAlt} color='gray.500' h={4} w={4} />
        <Text as='span' ml={2} fontSize='sm'>
          {ticket.comments.length} comments
        </Text>
      </Flex>
      <Flex alignItems='center'>
        <Icon as={HiCalendar} color='gray.500' h={4} w={4} />
        <Text as='span' ml={2} fontSize='sm'>
          Created {formattedDate}
        </Text>
      </Flex>
    </Stack>
  );
};

export default Details;
