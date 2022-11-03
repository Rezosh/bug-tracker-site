import {
  Box,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ProjectMembersModal from "../components/Modals/ProjectMembersModal";
import TicketCreationModal from "../components/Modals/TicketCreationModal";
import ProjectTags from "../components/ProjectTags";
import ProjectClosedTicketsTable from "../components/Tables/ProjectClosedTicketsTable";
import ProjectOpenTicketsTable from "../components/Tables/ProjectOpenTicketsTable";

const ProjectInfo = () => {
  const { projectId } = useParams();
  const { data } = useSWR(`/api/projects/${projectId}`);

  return (
    <Box>
      <Box pb={6} borderBottom='1px' borderColor='gray.200'>
        <Heading as='h2' size='xl' color='gray.700'>
          {data.name}
        </Heading>
        <ProjectMembersModal members={data.members} />
      </Box>
      <Box py={6}>
        <Text whiteSpace='pre-wrap'>{data.description}</Text>
      </Box>
      <Tabs isLazy isFitted>
        <TabList>
          <Tab>Open Tickets</Tab>
          <Tab>Closed Tickets</Tab>
          <Tab>Project Tags</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <>
              <Stack spacing={4}>
                <Box>
                  <TicketCreationModal />
                </Box>
                <ProjectOpenTicketsTable />
              </Stack>
            </>
          </TabPanel>
          <TabPanel>
            <ProjectClosedTicketsTable />
          </TabPanel>
          <TabPanel>
            <ProjectTags />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProjectInfo;
