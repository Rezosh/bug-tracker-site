import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { FaTag } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import TagForm from "./TagForm";

const ProjectTags = () => {
  const { isOpen, onToggle } = useDisclosure();
  const params = useParams();
  const { data: tags, mutate } = useSWR(
    `/api/projects/${params.projectId}/tags`
  );

  const onDelete = async (tagId) => {
    await fetch(`/api/projects/${params.projectId}/tags`, {
      body: JSON.stringify({ tagId }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate((tags) => tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify='space-between'
        mb={4}>
        <Button
          onClick={onToggle}
          colorScheme='blue'
          w={{ base: "full", md: "auto" }}>
          Add Tag
        </Button>
      </Flex>
      <Collapse in={isOpen}>
        <TagForm />
      </Collapse>
      <Box mt={5}>
        {
          // if no tags, show message
          tags.length < 1 ? (
            <Stack mb='10' alignItems={"center"} direction='column'>
              <Icon as={FaTag} w='6' h='6' color={"gray.500"} />
              <Text
                fontSize='xl'
                fontWeight='bold'
                textAlign={"center"}
                textColor={"gray.700"}>
                {
                  "This project doesn't have any tags yet. Add one to get started!"
                }
              </Text>
            </Stack>
          ) : (
            <Table>
              <Thead bg='gray.100'>
                <Tr>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>
                    <VisuallyHidden>Actions</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {tags.length
                  ? tags.map((tag) => (
                      <Tr key={tag.id}>
                        <Td>
                          <Tag colorScheme={tag.color} rounded='full'>
                            {tag.name}
                          </Tag>
                        </Td>
                        <Td>{tag.description}</Td>

                        <Td>
                          <Flex direction={"column"} alignItems='flex-start'>
                            <Button
                              variant='link'
                              colorScheme='red'
                              onClick={() => onDelete(tag._id)}>
                              Delete
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          )
        }
      </Box>
    </>
  );
};

export default ProjectTags;
