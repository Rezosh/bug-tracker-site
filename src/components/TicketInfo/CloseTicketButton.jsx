import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { mutate } from "swr";

const CloseTicketButton = (props) => {
  const { ticketId } = useParams();
  const closeTicket = async () => {
    await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "status",
        value: "closed",
      }),
    });
    mutate(`/api/tickets/${ticketId}/events`);
    return mutate(`/api/tickets/${ticketId}`);
  };

  const handleClick = () => {
    closeTicket();
  };

  return (
    <Button
      onClick={handleClick}
      colorScheme='gray'
      leftIcon={<Icon as={FaCheckCircle} color={"green.400"} />}
      {...props}>
      Close Ticket
    </Button>
  );
};

export default CloseTicketButton;
