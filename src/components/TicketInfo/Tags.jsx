import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagCloseButton,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";

import { Select as MultiSelect } from "chakra-react-select";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import useMutation from "../../hooks/useMutation";

const Tags = ({ tags, isAuthorized }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tagsToAdd, setTagsToAdd] = React.useState([]);
  const { projectId, ticketId } = useParams();
  const addTags = useMutation(`/api/tickets/${ticketId}/tags`);

  const { data } = useSWR(`/api/projects/${projectId}/tags`);

  const filteredTags = data.filter((tag) => {
    return !tags.some((ticketTag) => ticketTag._id === tag._id);
  });
  const menuOptions = filteredTags.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  const handleChange = (values) => {
    setTagsToAdd(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsAdded = tagsToAdd.map((tag) => tag.value);
    await addTags({ tagsAdded });

    setTagsToAdd([]);
    onClose();
  };

  const handleRemove = async (tagId) => {
    await fetch(`/api/tickets/${ticketId}/tags`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tagId,
      }),
    });
    mutate(`/api/tickets/${ticketId}`);
    mutate(`/api/tickets/${ticketId}/events`);
  };

  return (
    <>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Tags</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack spacing={4}>
                  <Stack direction={"row"}>
                    <FormControl isRequired>
                      <FormLabel htmlFor='tags-modal-header'>
                        Add Tags
                      </FormLabel>
                      <MultiSelect
                        onChange={handleChange}
                        isMulti
                        colorScheme='blue'
                        options={menuOptions}
                        name='tags'
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='blue' type='submit'>
                  Add
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Flex align={"center"} justify='space-between'>
          <Heading
            as={"h2"}
            fontSize={"sm"}
            fontWeight={"medium"}
            color={"gray.500"}>
            Tags
          </Heading>
          {isAuthorized ? (
            <Icon
              as={FaPlus}
              h='3'
              w='3'
              color={"gray.500"}
              _hover={{
                color: "blue.500",
                cursor: "pointer",
              }}
              onClick={onOpen}
            />
          ) : null}
        </Flex>
        <Wrap mt={3} align={"center"} maxW={"60"}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <WrapItem key={tag._id}>
                <Tag colorScheme={tag.color} rounded='full'>
                  {tag.name}
                  {isAuthorized ? (
                    <TagCloseButton onClick={() => handleRemove(tag._id)} />
                  ) : null}
                </Tag>
              </WrapItem>
            ))
          ) : (
            <WrapItem>
              <Text fontSize={"sm"} fontWeight={"medium"} color={"gray.500"}>
                No tags for this issue.
              </Text>
            </WrapItem>
          )}
        </Wrap>
      </Box>
    </>
  );
};

export default Tags;
