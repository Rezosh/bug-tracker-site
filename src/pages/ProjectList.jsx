import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import ProjectCreationModal from "../components/Modals/ProjectCreationModal";
import ProjectsTable from "../components/Tables/ProjectsTable";

const ProjectList = () => {
  const { data: projects } = useSWR(`/api/projects`);
  return (
    <>
      <Box>
        <Stack spacing={10}>
          <Box pb={6} borderBottom={"1px"} borderColor={"gray.200"}>
            <Heading size='xl' color='gray.700'>
              Projects
            </Heading>
            <Text color={"gray.600"} mt={6}>
              Keep all your tickets organised by creating a project.
            </Text>
          </Box>
          <Stack>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify='space-between'>
              <ProjectCreationModal />
            </Flex>
            <Stack>
              <ProjectsTable projects={projects} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ProjectList;
