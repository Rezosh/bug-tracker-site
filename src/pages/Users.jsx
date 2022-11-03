import {
  Box,
  Heading,
  IconButton,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useSWR from "swr";

const Users = () => {
  const { data } = useSWR("/api/users");

  const handleRoleChange = (user) => async (e) => {
    const newRole = e.target.value;

    await fetch(`/api/users/${user}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRole }),
    });
  };

  return (
    <Box>
      <Stack spacing={10}>
        <Box pb={6} borderBottom={"1px"} borderColor={"gray.200"}>
          <Heading size='xl' color='gray.700'>
            Users
          </Heading>
          <Text color={"gray.600"} mt={6}>
            View and manage users roles.
          </Text>
        </Box>
        <Box
          overflow={"hidden"}
          rounded='lg'
          ring={"1px"}
          ringColor='blackAlpha.50'
          shadow={"sm"}>
          <Table borderWidth='1px' minW='full' borderRadius={"full"}>
            <Thead bg='gray.100'>
              <Tr>
                <Th
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor={"gray.900"}>
                  Name
                </Th>
                <Th
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor={"gray.900"}>
                  Email
                </Th>
                <Th
                  py={3.5}
                  pl={{ base: 4, md: 6 }}
                  pr={3}
                  textColor={"gray.900"}>
                  Role
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.firstName + " " + user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Select onChange={handleRoleChange(user._id)}>
                      <option value='admin' selected={user.role === "admin"}>
                        Admin
                      </option>
                      <option value='user' selected={user.role === "user"}>
                        User
                      </option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
};

export default Users;
