import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import useSWR from "swr";
import useMutation from "../../hooks/useMutation";

const TicketCreationModal = () => {
  const { data: projects } = useSWR(`/api/projects`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mutation = useMutation(`/api/tickets`);

  const createTicket = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const priority = form.priority.value;
    const project = form.project.value;
    const payload = { title, description, priority, project };
    await mutation(payload);
    onClose();
  };

  return (
    <>
      <Button
        colorScheme={"blue"}
        size='md'
        w={{ base: "full", md: "auto" }}
        onClick={onOpen}
        id='createTicket'
        name='createTicket'>
        New Ticket
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Ticket</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createTicket}>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <Input type='text' name='title' id='title' />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Textarea name='description' id='description' />
                </FormControl>
                <Stack direction={"row"}>
                  <FormControl isRequired>
                    <FormLabel htmlFor='priority'>Priority</FormLabel>
                    <Select name='priority' id='priority'>
                      <option value='low'>Low</option>
                      <option value='medium'>Medium</option>
                      <option value='high'>High</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor='project'>Project</FormLabel>
                    <Select name='project' id='project'>
                      {projects.map((project) => (
                        <option value={project._id} key={project._id}>
                          {project.name}
                        </option>
                      ))}
                    </Select>
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

export default TicketCreationModal;
