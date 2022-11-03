import React, { useState } from "react";
import useSWR from "swr";
import EmptyState from "../EmptyState";
import TicketList from "../TicketList/TicketList";

const UserTicketsTable = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data: usersTickets } = useSWR(
    `/api/users/me/tickets?page=${pageIndex}`
  );

  const handleNext = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePrevious = () => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <>
      {usersTickets.tickets.length ? (
        <TicketList
          data={usersTickets.tickets}
          pages={usersTickets.pages}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          page={pageIndex}
        />
      ) : (
        <EmptyState
          heading='No Tickets'
          text='Create a ticket to get started.'
        />
      )}
    </>
  );
};

export default UserTicketsTable;
