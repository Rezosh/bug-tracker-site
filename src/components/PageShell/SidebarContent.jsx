import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlineFolder,
  HiOutlineInbox,
  HiOutlineUsers,
  HiOutlineClipboardCheck,
} from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { NavItem } from "./NavItem";

const LinkItems = [
  { name: "Home", icon: HiOutlineHome, to: "/dashboard", admin: false },
  { name: "My Tickets", icon: HiOutlineInbox, to: "/tickets/me", admin: false },
  {
    name: "Assigned To Me",
    icon: HiOutlineClipboardCheck,
    to: "/tickets/assigned",
    admin: false,
  },
  {
    name: "Projects",
    icon: HiOutlineFolder,
    to: "/projects/all",
    admin: false,
  },
  { name: "Users", icon: HiOutlineUsers, to: "/users", admin: true },
];

export const SidebarContent = ({ onClose, ...rest }) => {
  const user = useContext(AuthContext);
  const isAdmin = user.isAdmin();

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue("white", "gray.900")}
      borderRight='1px'
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos='fixed'
      h='full'
      {...rest}>
      <Flex
        alignItems='center'
        bg='white'
        px='4'
        h='16'
        flexShrink='0'
        display={{ base: "none", md: "flex" }}>
        <Text
          fontSize='2xl'
          fontWeight='bold'
          color={"gray.900"}
          display={{ base: "none", md: "block" }}>
          TrackIt!
        </Text>
      </Flex>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        display={{ base: "flex", md: "hidden" }}
        bg='white'
        h={{ base: "20", md: "0" }}
        px='8'
        mb='4'>
        <Text
          fontSize='2xl'
          fontWeight='bold'
          display={{ base: "inline-block", md: "none" }}
          color={"gray.900"}
          bg='white'>
          TrackIt!
        </Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          color='gray.900'
        />
      </Flex>
      {LinkItems.map((link) => {
        if (link.admin) {
          return isAdmin ? (
            <NavItem key={link.name} icon={link.icon} to={link.to}>
              {link.name}
            </NavItem>
          ) : null;
        }

        return (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        );
      })}
    </Box>
  );
};
