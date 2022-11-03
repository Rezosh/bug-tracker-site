import { IconButton } from "@chakra-ui/react";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleClick}
      icon={<FaChevronLeft />}
      variant='ghost'
      aria-label='Back'
      {...props}
    />
  );
};

export default BackButton;
