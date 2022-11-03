import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
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
import { useParams } from "react-router-dom";
import { FaBell, FaPen } from "react-icons/fa";
import Details from "./Details";
import Tags from "./Tags";
import Assigned from "./Assigned";
import { Feed } from "./Feed";
import useSWR from "swr";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CommentInput from "./CommentInput";
import { isAuthorOrAdmin } from "../../utils";
import UserProfile from "../UserProfile";

function TicketInfo() {
  const params = useParams();
  const user = useContext(AuthContext);

  const {
    data: ticket,
    loading,
    mutate,
  } = useSWR(`/api/tickets/${params.ticketId}`);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateTicket = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    await fetch(`/api/tickets/${params.ticketId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: "title",
        value: title,
      }),
    });
    mutate({ ...ticket, title });
    onClose();
  };

  const isOwnerOrAdmin = isAuthorOrAdmin(user, ticket.createdBy._id);
  return (
    <>
      {
        !loading && (
          <>
            <Grid
              display={{ base: "none", xl: "grid" }}
              templateColumns={"repeat(3, minmax(0,1fr))"}
              minH={"full"}>
              <GridItem
                colSpan={"2"}
                borderRight={"1px"}
                borderColor={"gray.200"}
                pr={8}>
                <HStack
                  spacing={4}
                  pb={6}
                  borderBottom={"1px"}
                  borderColor={"gray.200"}
                  display={"flex"}
                  align={"center"}
                  justify={"space-between"}>
                  <Box>
                    <Heading as={"h2"} size={"lg"}>
                      {ticket.title}
                    </Heading>
                    <Text color={"gray.500"} mt={2}>
                      opened by <UserProfile userId={ticket.createdBy._id} /> in{" "}
                      <Link
                        as={RouterLink}
                        to={`/projects/${ticket.project._id}`}>
                        {ticket.project.name}
                      </Link>
                    </Text>
                  </Box>
                  <Box>
                    <HStack spacing={3}>
                      {isOwnerOrAdmin ? (
                        <Button leftIcon={<FaPen />} onClick={onOpen}>
                          Edit
                        </Button>
                      ) : null}
                      <Button leftIcon={<FaBell />}>Subscribe</Button>
                    </HStack>
                  </Box>
                </HStack>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit Issue</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={updateTicket}>
                      <ModalBody>
                        <Stack spacing={4}>
                          <FormControl isRequired>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input
                              type='text'
                              name='title'
                              id='title'
                              placeholder={ticket.title}
                            />
                          </FormControl>
                        </Stack>
                      </ModalBody>
                      <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='blue' type='submit'>
                          Save
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>

                <Box pt={6}>
                  <Text whiteSpace={"pre-wrap"}>{ticket.description}</Text>
                </Box>
                <Box as='section' mt={8}>
                  <Box pb={4}>
                    <Heading as={"h3"} size={"md"} fontWeight={"500"}>
                      Activity
                    </Heading>
                  </Box>
                  <Box py={6} borderTop={"1px"} borderColor={"gray.200"}>
                    <Feed />
                  </Box>
                  <CommentInput canComment={ticket.status === "open"} />
                </Box>
              </GridItem>
              <GridItem colSpan={1} pl={8}>
                <Details ticket={ticket} />
                <Stack
                  mt={6}
                  py={6}
                  borderTop={"1px"}
                  borderColor={"gray.200"}
                  spacing={8}>
                  <Assigned ticket={ticket} isAuthorized={isOwnerOrAdmin} />
                  <Tags tags={ticket.tags} isAuthorized={isOwnerOrAdmin} />
                </Stack>
              </GridItem>
            </Grid>
          </>
        )

        // Mobile
      }
      {!loading && (
        <Box>
          <Flex display={{ base: "flex", xl: "none" }} direction={"column"}>
            <Stack
              spacing={4}
              display={"flex"}
              align={"flex-start"}
              justify={"space-between"}>
              <Box>
                <Heading as={"h2"} size={"lg"} isTruncated maxW={"25ch"}>
                  {ticket.title}
                </Heading>
                <Text color={"gray.500"} mt={2}>
                  opened by{" "}
                  <UserProfile
                    fontWeight='regular'
                    userId={ticket.createdBy._id}
                  />{" "}
                  in {ticket.project.name}
                </Text>
              </Box>
              <Box>
                <HStack spacing={3}>
                  {isOwnerOrAdmin ? (
                    <Button leftIcon={<FaPen />} onClick={onOpen}>
                      Edit
                    </Button>
                  ) : null}
                  <Button leftIcon={<FaBell />}>Subscribe</Button>
                </HStack>
              </Box>
            </Stack>
            <Box mt={8}>
              <Details ticket={ticket} />
            </Box>
            <Stack
              spacing={8}
              mt={6}
              py={6}
              borderTop={"1px"}
              borderBottom={"1px"}
              borderColor={"gray.200"}>
              <Assigned ticket={ticket} isAuthorized={isOwnerOrAdmin} />
              <Tags tags={ticket.tags} isAuthorized={isOwnerOrAdmin} />
            </Stack>
            <Box py={3}>
              <Text whiteSpace={"pre-wrap"}>{ticket.description}</Text>
            </Box>
            <Box as='section' mt={8}>
              <Box pb={4}>
                <Heading as={"h3"} size={"md"} fontWeight={"500"}>
                  Activity
                </Heading>
              </Box>
              <Box py={6} borderTop={"1px"} borderColor={"gray.200"}>
                <Feed />
              </Box>
              <CommentInput canComment={ticket.status === "open"} />
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default TicketInfo;
