import { UserMenu } from "./UserMenu";
import {
  IconButton,
  Flex,
  HStack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

export const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='16'
      alignItems='center'
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize='2xl'
        color={"gray.900"}
        fontWeight='bold'>
        TrackIt!
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <UserMenu />
      </HStack>
    </Flex>
  );
};
