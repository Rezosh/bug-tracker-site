import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import EmptyState from "../EmptyState";
import TicketList from "../TicketList/TicketList";

const ProjectClosedTicketsTable = () => {
  const { projectId } = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `/api/projects/${projectId}/tickets?page=${pageIndex}&status=closed`
  );

  const { tickets, pages } = data;

  const handleNext = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePrevious = () => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <>
      {tickets.length ? (
        <TicketList
          data={tickets}
          pages={pages}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          page={pageIndex}
        />
      ) : (
        <Box mt='10'>
          <EmptyState text='There are currently no closed tickets for this project.' />
        </Box>
      )}
    </>
  );
};

export default ProjectClosedTicketsTable;
