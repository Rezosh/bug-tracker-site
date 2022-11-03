import {
  Avatar,
  Button,
  Flex,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { mutate } from "swr";
import { AuthContext } from "../../context/AuthContext";
import UserProfileDrawer from "../UserProfile";

const ProjectMembersModal = ({ members }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { projectId } = useParams();

  const user = useContext(AuthContext);
  const isAdmin = user.isAdmin();

  const removeMember = async (memberId) => {
    await fetch(`/api/projects/${projectId}/member`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId,
      }),
    });
    mutate(`api/projects/${projectId}`);
  };

  return (
    <>
      <Button
        variant='link'
        color='gray.500'
        mt={4}
        fontWeight='semibold'
        onClick={onOpen}>
        {`${members.length} Member${members.length > 1 ? "s" : ""}`}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List mt={3} spacing={3}>
              {members.length ? (
                members.map((member) => (
                  <ListItem key={member._id}>
                    <Flex align='center' justify='space-between'>
                      <Flex align='center'>
                        <Avatar
                          size='sm'
                          name={member.firstName + " " + member.lastName}
                        />
                        <UserProfileDrawer
                          userId={member._id}
                          textColor='gray.900'
                          fontWeight='medium'
                          fontSize='sm'
                          ml='2'
                        />
                      </Flex>
                      {isAdmin ? (
                        <Button
                          colorScheme='blue'
                          size='sm'
                          variant='link'
                          onClick={() => removeMember(member._id)}>
                          Remove
                        </Button>
                      ) : null}
                    </Flex>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Text fontSize='sm' fontWeight='medium' color='gray.500'>
                    This Project Has No Members
                  </Text>
                </ListItem>
              )}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectMembersModal;
