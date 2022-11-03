import React, { useContext } from "react";
import {
  Flex,
  Avatar,
  Box,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { capitalizeString } from "../../utils/StringUtils";
export function UserMenu() {
  const { authState, logout } = useContext(AuthContext);
  const { userInfo } = authState;

  const onClick = async () => {
    logout();
  };

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton
          py={2}
          transition='all 0.3s'
          _focus={{
            boxShadow: "none",
          }}>
          <HStack>
            <Avatar
              size={"sm"}
              name={`${userInfo.firstName} ${userInfo.lastName}`}
            />
            <VStack
              display={{
                base: "none",
                md: "flex",
              }}
              alignItems='flex-start'
              spacing='1px'
              ml='2'>
              <Text fontSize='sm'>{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
              <Text fontSize='xs' color='gray.600'>
                {capitalizeString(userInfo.role)}
              </Text>
            </VStack>
            <Box
              display={{
                base: "none",
                md: "flex",
              }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue("white", "gray.900")}
          borderColor={useColorModeValue("gray.200", "gray.700")}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem onClick={onClick}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
