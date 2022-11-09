import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import EmptyState from "../EmptyState";
import TicketList from "../TicketList/TicketList";

const ProjectOpenTicketsTable = () => {
  const { projectId } = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `/api/projects/${projectId}/tickets?page=${pageIndex}&status=open`
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
          <EmptyState text='There are currently no open tickets for this project.' />
        </Box>
      )}
    </>
  );
};

export default ProjectOpenTicketsTable;
