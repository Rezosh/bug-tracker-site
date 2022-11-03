import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
function Login() {
  return (
    <>
      <Flex h='100vh' align='center' justify='center' bg='#E6EEFF'>
        <Box bg='gray.50' p='12' borderRadius='lg' w='100%' maxW='md'>
          <Box>
            <Heading textAlign='center' mb={2} color='blue.800'>
              Welcome Back
            </Heading>
            <Text textAlign='center' mb={4} color='blue.700'>
              Sign in to continue
            </Text>
          </Box>
          <LoginForm />
        </Box>
      </Flex>
    </>
  );
}

export default Login;
