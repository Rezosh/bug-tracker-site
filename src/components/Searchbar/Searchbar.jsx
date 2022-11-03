import { Input } from "@chakra-ui/react";
import React from "react";

const Searchbar = () => {
  return (
    <form>
      <Input
        type='text'
        name='query'
        id='query'
        placeholder='Search'
        autoComplete='off'
        mb={{ base: "4", md: "0" }}
      />
    </form>
  );
};

export default Searchbar;
