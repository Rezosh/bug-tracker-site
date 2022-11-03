import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import RegistrationForm from "../components/RegistrationForm";

function Register() {
  return (
    <Flex h='100vh' align='center' justify='center' bg='#E6EEFF'>
      <Box bg='gray.50' p='12' borderRadius='lg' w='100%' maxW='md'>
        <Box>
          <Text
            textAlign='center'
            casing='uppercase'
            fontWeight='semibold'
            color='gray.500'
            letterSpacing='wider'>
            Start for free
          </Text>
          <Heading textAlign='center' color='gray.700' mb='8'>
            Create Your Account
          </Heading>
        </Box>
        <RegistrationForm />
      </Box>
    </Flex>
  );
}

export default Register;
