import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import TicketListItem from "./TicketListItem";

const TicketList = ({ data, handleNext, handlePrevious, page, pages }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const isNextDisabled = page >= pages - 1;
  const isPreviousDisabled = page === 0;
  const isPaginationHidden = pages === 1;

  return (
    <>
      <Stack>
        <Box
          overflow={"hidden"}
          rounded='lg'
          ring={"1px"}
          ringColor='blackAlpha.50'
          shadow={"sm"}>
          <Table borderWidth='1px' minW='full' borderRadius={"full"}>
            <Thead bg='gray.100'>
              <Tr>
                <Th
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor={"gray.900"}>
                  Title
                </Th>
                <Th
                  display={{
                    base: "none",
                    lg: "table-cell",
                  }}
                  py={3.5}
                  pl={{ base: 6, md: 4 }}
                  pr={3}
                  textAlign='left'
                  textColor={"gray.900"}>
                  Priority
                </Th>
                <Th
                  display={{
                    base: "none",
                    lg: "table-cell",
                  }}
                  py={3.5}
                  pl={{ base: 6, md: 4 }}
                  pr={3}
                  textAlign='left'
                  textColor={"gray.900"}>
                  Status
                </Th>
                <Th
                  py={3.5}
                  pl={{ base: 6, md: 4 }}
                  pr={3}
                  textAlign='left'
                  textColor={"gray.900"}>
                  Project
                </Th>
                <Th>
                  <VisuallyHidden>Details</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((ticket) => {
                return <TicketListItem key={ticket._id} ticket={ticket} />;
              })}
            </Tbody>
          </Table>
        </Box>
        {isPaginationHidden ? null : (
          <Box px={{ base: "4", md: "6" }} pb='5'>
            <HStack spacing='3' justify='space-between'>
              {!isMobile && (
                <Text color='muted' fontSize='sm'>
                  Page {page + 1} of {pages}
                </Text>
              )}
              <ButtonGroup
                spacing='3'
                justifyContent='space-between'
                width={{ base: "full", md: "auto" }}
                variant='outline'>
                <Button
                  isDisabled={isPreviousDisabled}
                  onClick={handlePrevious}>
                  Previous
                </Button>
                <Button isDisabled={isNextDisabled} onClick={handleNext}>
                  Next
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default TicketList;
