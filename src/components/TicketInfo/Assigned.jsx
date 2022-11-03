import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { AuthContext } from "../../context/AuthContext";
import useMutation from "../../hooks/useMutation";
import UserProfileDrawer from "../UserProfile";

const Assigned = ({ ticket, isAuthorized }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: users } = useSWR("/api/users");
  const [assignees, setAssignees] = React.useState([]);

  const filteredUsers = users.filter((user) => {
    return !ticket.assignedTo.some((assigned) => assigned._id === user._id);
  });

  const params = useParams();
  let createEvent = useMutation(`/api/tickets/${params.ticketId}/assign`);
  const { authState } = React.useContext(AuthContext);
  const { userInfo } = authState;

  const assignUser = async (e) => {
    e.preventDefault();

    const assignedUsers = assignees.map((assignee) => assignee.value);
    await createEvent({ assignedUsers });

    setAssignees([]);
    onClose();
  };

  const unassignUser = async (userId) => {
    await fetch(`/api/tickets/${params.ticketId}/assign`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    mutate(`/api/tickets/${params.ticketId}`);
    mutate(`/api/tickets/${params.ticketId}/events`);
  };

  const handleChange = (values) => {
    setAssignees(values);
  };

  return (
    <Box>
      <Flex align={"center"} justify='space-between'>
        <Heading
          as={"h2"}
          fontSize={"sm"}
          fontWeight={"medium"}
          color={"gray.500"}>
          Assignees
        </Heading>
        {isAuthorized ? (
          <Icon
            as={FaPlus}
            h='3'
            w='3'
            color={"gray.500"}
            onClick={onOpen}
            _hover={{
              color: "blue.500",
              cursor: "pointer",
            }}
          />
        ) : null}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign a User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={assignUser}>
            <ModalBody>
              <Stack spacing={4}>
                <Stack direction={"row"}>
                  <FormControl isRequired>
                    <FormLabel htmlFor='assignee'>User To Assign</FormLabel>
                    <MultiSelect
                      onChange={handleChange}
                      isMulti
                      colorScheme='blue'
                      options={
                        filteredUsers &&
                        filteredUsers.map((user) =>
                          user._id !== userInfo._id
                            ? {
                                value: user._id,
                                label: user.firstName + " " + user.lastName,
                              }
                            : {
                                value: user._id,
                                label: "Me",
                              }
                        )
                      }
                      name='members'
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
                Assign
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <List mt={3} spacing={3}>
        {ticket.assignedTo.length ? (
          ticket.assignedTo.map((user) => (
            <ListItem key={user._id}>
              <Flex align='center' justify='space-between'>
                <Flex align='center'>
                  <Avatar
                    size='sm'
                    name={user.firstName + " " + user.lastName}
                  />
                  <UserProfileDrawer
                    userId={user._id}
                    textColor='gray.900'
                    fontWeight='medium'
                    fontSize='sm'
                    ml='2'
                  />
                </Flex>
                {isAuthorized ? (
                  <Button
                    colorScheme='blue'
                    size='sm'
                    variant='link'
                    onClick={() => unassignUser(user._id)}>
                    Remove
                  </Button>
                ) : null}
              </Flex>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Text fontSize='sm' fontWeight='medium' color='gray.500'>
              No users have been assigned this issue
            </Text>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default Assigned;
