import { Flex, Icon } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
export const NavItem = ({ to, icon, children, ...rest }) => {
  return (
    <Flex
      as={RouterLink}
      to={to}
      align='center'
      p='2'
      mx='4'
      my='1'
      borderRadius='lg'
      role='group'
      cursor='pointer'
      fontWeight={"medium"}
      color='gray.600'
      _hover={{
        bg: "gray.50",
        color: "gray.900",
      }}
      _activeLink={{
        bg: "gray.100",
        color: "gray.900",
      }}
      {...rest}>
      {icon && <Icon mr='4' fontSize='18' color='gray.900' as={icon} />}
      {children}
    </Flex>
  );
};
