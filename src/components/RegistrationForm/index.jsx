import {
  Stack,
  FormControl,
  Input,
  FormLabel,
  Button,
  Divider,
  Text,
  Link,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendRequest } from "../../utils";

const RegistrationForm = () => {
  const authContext = useContext(AuthContext);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();

  const passwordMatch = userPassword === confirmPassword;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const password = e.target.password.value;

    await sendRequest("/api/auth/register", "POST", {
      email,
      password,
      firstName,
      lastName,
    })
      .then((response) => {
        authContext.setAuthState(response);
        toast({
          title: "Success",
          description: "You have successfully registered",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-left",
          variant: "left-accent",
        });
        return navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={"6"}>
        <FormControl isRequired>
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <Input type='text' name='firstName' id='firstName' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <Input type='text' name='lastName' id='lastName' />
        </FormControl>
        <FormControl id='email' isRequired isInvalid={error}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input type='email' id='email' name='email' />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type='password'
            id='password'
            name='password'
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
          />
        </FormControl>
        <FormControl isRequired isInvalid={!passwordMatch}>
          <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
          <Input
            type='password'
            id='confirm-password'
            name='confirm-password'
            onChange={(e) => setconfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <FormErrorMessage>
            {!passwordMatch ? "Password does not match" : ""}
          </FormErrorMessage>
        </FormControl>
        <Button
          type='submit'
          id='submit'
          colorScheme='blue'
          size={"lg"}
          fontSize={"md"}
          isDisabled={!passwordMatch}>
          Register Account
        </Button>
        <Divider />
        <Text fontSize='md' textAlign='center'>
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to='/login'
            color='blue.500'
            fontWeight='semibold'>
            Sign In
          </Link>
        </Text>
      </Stack>
    </form>
  );
};

export default RegistrationForm;
