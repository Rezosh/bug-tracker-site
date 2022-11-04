import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { capitalizeString } from "../../utils";

const UserProfileDrawer = ({ userId, ...rest }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data: user } = useSWR(`/api/users/${userId}`);

  return (
    <>
      <Button variant='link' onClick={onOpen} {...rest}>
        {user.firstName + " " + user.lastName}
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Profile</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack direction={"row"} align='center'>
              <Avatar name={`${user.firstName} ${user.lastName}`} size='md' />
              <Box>
                <Heading
                  size='md'
                  color='gray.900'>{`${user.firstName} ${user.lastName}`}</Heading>
                <Text as='span' fontSize='sm' color='gray.500'>
                  {capitalizeString(user.role)}
                </Text>
              </Box>
            </Stack>

            <Stack spacing={8} mt='8'>
              <Box>
                <Text color='gray.500' fontWeight='medium' fontSize='sm'>
                  Bio
                </Text>
                <Text fontSize='sm' color='gray.900'>
                  {user.bio ? user.bio : "No bio provided."}
                </Text>
              </Box>
              <Box>
                <Text color='gray.500' fontSize='sm' fontWeight='medium'>
                  Email
                </Text>
                <Text fontSize='sm' color='gray.900'>
                  {user.email}
                </Text>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserProfileDrawer;
