import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendRequest } from "../../utils";

const LoginForm = () => {
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);

  // reset error state when user types in the form
  const handleChange = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await sendRequest("/api/auth/login", "POST", {
      email,
      password,
    })
      .then((response) => {
        authContext.setAuthState(response);
        setRedirectOnLogin(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const loginDemoUser = async () => {
    const email = "demo@demo.com";
    const password = "demo";

    await sendRequest("/api/auth/login", "POST", {
      email,
      password,
    })
      .then((response) => {
        authContext.setAuthState(response);
        setRedirectOnLogin(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          {error && (
            <Alert status='error' rounded='md'>
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormControl
            id='email'
            isInvalid={error}
            onChange={handleChange}
            isRequired>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input type='email' id='email' name='email' />
          </FormControl>
          <FormControl
            id='password'
            isInvalid={error}
            onChange={handleChange}
            isRequired>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input type='password' id='password' name='password' />
          </FormControl>
          <Button type='submit' colorScheme='blue' size='lg' fontSize='md'>
            Sign In
          </Button>

          <Divider />
        </Stack>
      </form>
      <Stack mt={6}>
        <Text fontSize='md' textAlign='center'>
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to='/register'
            color='blue.600'
            fontWeight='semibold'>
            Register
          </Link>
        </Text>
        <Text fontSize='md' textAlign='center'>
          Log in as{" "}
          <Link onClick={loginDemoUser} color='blue.600' fontWeight='semibold'>
            Demo User
          </Link>
        </Text>
      </Stack>
      {redirectOnLogin && <Navigate to='/dashboard' />}
    </>
  );
};

export default LoginForm;
