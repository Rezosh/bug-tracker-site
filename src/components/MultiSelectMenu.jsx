import { Select } from "chakra-react-select";
import React from "react";

const MultiSelectMenu = ({ menuOptions }) => {
  const handleChange = (values) => {
    setAssignees(values);
  };

  return (
    <Select
      onChange={handleChange}
      isMulti
      colorScheme='blue'
      options={menuOptions}
      name='members'
    />
  );
};

export default MultiSelectMenu;
