import { Avatar, Button, Flex, HStack, Textarea } from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useMutation from "../../hooks/useMutation";
import CloseTicketButton from "./CloseTicketButton";

const CommentInput = ({ canComment }) => {
  const { ticketId } = useParams();
  let createComment = useMutation(`/api/tickets/${ticketId}/comments`);

  const { authState } = useContext(AuthContext);
  const { userInfo } = authState;

  const submitComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    await createComment({ comment });
    e.target.comment.value = "";
  };

  return (
    <form onSubmit={submitComment}>
      <Flex mt={6} maxW='xl'>
        <Avatar
          size='sm'
          mr={3}
          name={userInfo.firstName + " " + userInfo.lastName}
        />
        <Textarea
          id='comment'
          placeholder='Leave a comment...'
          isDisabled={!canComment}
        />
      </Flex>
      <HStack
        spacing={4}
        display='flex'
        mt={6}
        justify='end'
        align='center'
        maxW='xl'>
        <CloseTicketButton isDisabled={!canComment} />
        <Button type='submit' colorScheme='blue' isDisabled={!canComment}>
          Comment
        </Button>
      </HStack>
    </form>
  );
};

export default CommentInput;
