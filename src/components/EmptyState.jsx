import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const EmptyState = ({ heading, text }) => {
  return (
    <Flex align='center' justifyq='center' direction='column'>
      <Heading size='lg' as='h2' color='gray.700'>
        {heading}
      </Heading>
      <Text fontSize={"lg"} color={"gray.500"}>
        {text}
      </Text>
    </Flex>
  );
};

export default EmptyState;
