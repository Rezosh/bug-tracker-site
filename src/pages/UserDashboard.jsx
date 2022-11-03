import {
  Box,
  Stack,
  Heading,
  Grid,
  GridItem,
  Text,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import ProjectsTable from "../components/Tables/ProjectsTable";

const UserDashboard = () => {
  const { data } = useSWR("/api/dashboard/user-data");
  return (
    <Box>
      <Stack spacing={10}>
        <Box pb={6} borderBottom={"1px"} borderColor={"gray.200"}>
          <Heading size='xl' color='gray.900'>
            Welcome Back!
          </Heading>
          <Text fontSize='lg' color={"gray.600"} mt={6}>
            Here's whats going on with your tickets
          </Text>
        </Box>
        <Grid
          gap='5'
          templateColumns={{
            base: "repeat(1, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          }}>
          <GridItem>
            <Box
              px='4'
              py='5'
              bg='white'
              rounded='lg'
              border='1px'
              borderColor='gray.200'>
              <Stat>
                <StatLabel>Open Tickets</StatLabel>
                <StatNumber>{data.usersOpenTickets}</StatNumber>
              </Stat>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              px='4'
              py='5'
              bg='white'
              rounded='lg'
              border='1px'
              borderColor='gray.200'>
              <Stat>
                <StatLabel>Closed Tickets</StatLabel>
                <StatNumber>{data.usersClosedTickets}</StatNumber>
              </Stat>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              px='4'
              py='5'
              bg='white'
              rounded='lg'
              border='1px'
              borderColor='gray.200'>
              <Stat>
                <StatLabel>Assigned Tickets</StatLabel>
                <StatNumber>{data.usersAssignedTickets}</StatNumber>
              </Stat>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Heading size='md' color='gray.700' my='4'>
              Your Projects
            </Heading>
            <ProjectsTable projects={data.usersProjects} />
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};

export default UserDashboard;
