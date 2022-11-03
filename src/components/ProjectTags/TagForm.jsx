import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";

const TagForm = () => {
  const { projectId } = useParams();

  const createTag = useMutation(`/api/projects/${projectId}/tags`);

  const randomColor = () => {
    const colors = [
      "gray",
      "orange",
      "green",
      "teal",
      "blue",
      "cyan",
      "purple",
      "pink",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const color = randomColor();
    await createTag({ name, description, color });
    e.target.reset();
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} direction={{ base: "column", md: "row" }}>
          <FormControl isRequired>
            <FormLabel htmlFor='name'>Name:</FormLabel>
            <Input id='name' type='text' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='description'>Description:</FormLabel>
            <Input id='description' type='text' />
          </FormControl>
        </Stack>
        <Flex direction={{ base: "column", md: "row" }} mt='4'>
          <Button
            type='submit'
            colorScheme='blue'
            mb={{ base: 2, md: 0 }}
            mr={{ base: 0, md: 2 }}>
            Create Tag
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default TagForm;
