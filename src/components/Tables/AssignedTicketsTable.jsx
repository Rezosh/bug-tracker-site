import React from "react";
import useSWR from "swr";
import EmptyState from "../EmptyState";
import TicketList from "../TicketList/TicketList";

const AssignedTicketsTable = () => {
  const [pageIndex, setPageIndex] = React.useState(0);
  const { data } = useSWR(`/api/users/me/tickets/assigned?page=${pageIndex}`);
  const { tickets, pages } = data;

  const handleNext = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePrevious = () => {
    setPageIndex(pageIndex - 1);
  };

  return tickets.length ? (
    <TicketList
      data={tickets}
      pages={pages}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      page={pageIndex}
    />
  ) : (
    <EmptyState
      heading='No Assigned Tickets'
      text='You currently have no tickets assigned to you.'
    />
  );
};

export default AssignedTicketsTable;
