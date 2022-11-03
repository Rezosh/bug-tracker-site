import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Avatar,
  Tooltip,
  Box,
  Link,
  VisuallyHidden,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import EmptyState from "../EmptyState";

const ProjectsTable = ({ projects }) => {
  return (
    <>
      {projects.length ? (
        <Box
          overflow='hidden'
          rounded='lg'
          ring='1px'
          ringColor='blackAlpha.50'
          shadow='sm'>
          <Table borderWidth='1px' minW='full' borderRadius='full'>
            <Thead bg='gray.100'>
              <Tr>
                <Th
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor='gray.900'>
                  Project Name
                </Th>
                <Th
                  display={{
                    base: "none",
                    lg: "table-cell",
                  }}
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor='gray.900'>
                  Project Description
                </Th>
                <Th
                  display={{
                    base: "none",
                    lg: "table-cell",
                  }}
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor='gray.900'>
                  Project Members
                </Th>
                <Th>
                  <VisuallyHidden>View</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((project) => (
                <Tr key={project._id}>
                  <Td>{project.name}</Td>
                  <Td
                    display={{
                      base: "none",
                      lg: "table-cell",
                    }}>
                    {project.description}
                  </Td>
                  <Td
                    display={{
                      base: "none",
                      lg: "table-cell",
                    }}>
                    <Flex>
                      <Stack direction='row' spacing={-1.5}>
                        {project.members.length > 0 ? (
                          project.members.map((member) => {
                            const fullName = `${member.firstName} ${member.lastName}`;
                            if (project.members.indexOf(member) < 5) {
                              return (
                                <>
                                  <Tooltip
                                    label={fullName}
                                    bg='gray.300'
                                    color='black'
                                    hasArrow>
                                    <Avatar
                                      size='xs'
                                      name={fullName}
                                      ring='2'
                                      ringColor='white'
                                      maxW='none'
                                    />
                                  </Tooltip>
                                </>
                              );
                            }
                            return null;
                          })
                        ) : (
                          <span>No Members</span>
                        )}
                      </Stack>
                      {project.members.length > 5 && (
                        <Tooltip
                          label={`${project.members.length - 5} more`}
                          bg='gray.300'
                          color='black'
                          hasArrow>
                          <Box as='span' lineHeight={5} ml='1'>
                            +{project.members.length - 5}
                          </Box>
                        </Tooltip>
                      )}
                    </Flex>
                  </Td>
                  <Td textAlign='right'>
                    <Link
                      as={RouterLink}
                      to={`/projects/${project._id}`}
                      color={"blue.500"}
                      fontWeight={"semibold"}
                      _hover={{
                        color: "blue.900",
                        textDecoration: "underline",
                      }}>
                      View
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <EmptyState
          heading='No Projects'
          text='You currently have no projects.'
        />
      )}
    </>
  );
};

export default ProjectsTable;
