import {
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import useSWR from "swr";

import React from "react";

const AdminDashboard = () => {
  const { data } = useSWR("/api/dashboard/admin-data");

  const pieChartOptions = {
    maintainAspectRatio: false,
  };

  const doughnutChartOptions = {
    maintainAspectRatio: false,
  };
  return (
    <Box pb='6'>
      <Stack spacing={10}>
        <Box pb={6} borderBottom={"1px"} borderColor={"gray.200"}>
          <Heading size='xl' color='gray.900'>
            Dashboard
          </Heading>
          <Text color={"gray.600"} mt={6}>
            View important metrics
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          }}
          gap='5'>
          <GridItem>
            <Box
              px='4'
              py='5'
              bg='white'
              rounded='lg'
              border='1px'
              borderColor='gray.200'>
              <Stat>
                <StatLabel>Users</StatLabel>
                <StatNumber>{data.userCount}</StatNumber>
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
                <StatLabel>Open Tickets</StatLabel>
                <StatNumber>{data.openTicketCount}</StatNumber>
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
                <StatLabel>Projects</StatLabel>
                <StatNumber>{data.projectCount}</StatNumber>
              </Stat>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Heading size='md' color='gray.900' my='2'>
              Tickets Per Priority
            </Heading>
            <Box
              bg='white'
              rounded='lg'
              p={{ base: 10, md: 6 }}
              height={600}
              border='1px'
              borderColor='gray.200'>
              <Chart
                type='pie'
                data={data.pieChartData}
                options={pieChartOptions}
              />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Heading size='md' color='gray.900' my='2'>
              Tickets Per Project
            </Heading>
            <Box
              bg='white'
              rounded='lg'
              p={{ base: 10, md: 6 }}
              height={600}
              border='1px'
              borderColor='gray.200'>
              <Chart
                type='doughnut'
                data={data.doughnutChartData}
                options={doughnutChartOptions}
              />
            </Box>
          </GridItem>
        </Grid>
      </Stack>
    </Box>
  );
};

export default AdminDashboard;
