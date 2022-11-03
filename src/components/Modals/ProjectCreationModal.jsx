import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { Select as MultiSelect } from "chakra-react-select";
import React from "react";
import useSWR from "swr";
import useMutation from "../../hooks/useMutation";

const ProjectCreationModal = () => {
  const { data: users } = useSWR(`/api/users`);
  let createProject = useMutation(`/api/projects`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectMembers, setProjectMembers] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const makeProject = async (e) => {
    e.preventDefault();
    const members = projectMembers.map((member) => member.value);
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const payload = { name, description, members };

    const { error } = await createProject(payload);
    if (error) {
      return setErrorMessage(error.info.message);
    }

    onClose();
    setProjectMembers([]);
  };

  // get values from react-select multi-select
  const handleChange = (values) => {
    setProjectMembers(values);
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <Button
        mb={5}
        colorScheme='blue'
        onClick={onOpen}
        w={{ base: "full", md: "auto" }}
        name='create-project'>
        Create Project
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={makeProject}>
            <ModalBody>
              <Stack spacing={4}>
                {errorMessage ? (
                  <Text textColor='red.500'>{errorMessage}</Text>
                ) : null}
                <FormControl isRequired>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    type='text'
                    name='project-name'
                    id='name'
                    onChange={clearError}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Textarea name='project-description' id='description' />
                </FormControl>
                <Stack direction={"row"}>
                  <FormControl isRequired>
                    <FormLabel htmlFor='members'>Members</FormLabel>
                    <MultiSelect
                      onChange={handleChange}
                      isMulti
                      colorScheme='blue'
                      options={users.map((user) => ({
                        value: user._id,
                        label: user.firstName + " " + user.lastName,
                      }))}
                      id='project-members'
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
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectCreationModal;
