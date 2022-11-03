import { Td, Tr, List, ListItem, Badge, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const TicketListItem = ({ ticket }) => {
  const getBadgeColor = (priority) => {
    var badgeColors = {
      low: "gray",
      medium: "orange",
      high: "red",
      open: "green",
      closed: "gray",
      default: "gray",
    };

    return badgeColors[priority] || badgeColors["default"];
  };

  return (
    <Tr key={ticket._id}>
      <Td
        w={{ base: "full", lg: "auto" }}
        maxW={{ base: "0", lg: "none" }}
        py={4}
        pl={{ base: 4, md: 6 }}
        pr={3}
        textColor={"gray.900"}
        isTruncated>
        {ticket.title}

        <List display={{ lg: "none" }}>
          <ListItem mt={1}>
            <Badge colorScheme={getBadgeColor(ticket.priority)}>
              {ticket.priority}
            </Badge>
          </ListItem>
        </List>
      </Td>
      <Td
        whiteSpace='nowrap'
        py={4}
        pl={{ base: 4, md: 6 }}
        pr={3}
        textColor={"gray.900"}
        display={{
          base: "none",
          lg: "table-cell",
        }}>
        <Badge colorScheme={getBadgeColor(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </Td>
      <Td
        whiteSpace='nowrap'
        py={4}
        pl={{ base: 4, md: 6 }}
        pr={3}
        textColor={"gray.900"}
        display={{
          base: "none",
          lg: "table-cell",
        }}>
        <Badge colorScheme={getBadgeColor(ticket.status)}>
          {ticket.status}
        </Badge>
      </Td>
      <Td
        whiteSpace='nowrap'
        py={4}
        pl={{ base: 4, md: 6 }}
        pr={3}
        textColor={"gray.900"}>
        {ticket.project.name}
      </Td>
      <Td textAlign='right' py={4} pl={{ base: 4, md: 6 }} pr={3}>
        <Link
          as={RouterLink}
          to={`/projects/${ticket.project._id}/tickets/${ticket._id}`}
          color={"blue.600"}
          fontWeight='semibold'
          _hover={{
            color: "blue.900",
            textDecoration: "underline",
          }}>
          Details
        </Link>
      </Td>
    </Tr>
  );
};

export default TicketListItem;
