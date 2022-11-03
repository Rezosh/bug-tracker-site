import React from "react";
import moment from "moment";
import UserProfileDrawer from "../UserProfile";
import { Avatar, Box, Text } from "@chakra-ui/react";

export function FeedItemComment({ activityItem }) {
  return (
    <>
      <Box position={"relative"}>
        <Avatar
          h={10}
          w={10}
          name={
            activityItem.actor.firstName + " " + activityItem.actor.lastName
          }
          display={"flex"}
          alignItems='center'
          justifyContent={"center"}
          ring='8'
          ringColor={"white"}
        />
      </Box>

      <Box minW={"0%"} flex='1 1 0%'>
        <Box>
          <UserProfileDrawer
            userId={activityItem.actor._id}
            textColor='gray.900'
            fontWeight='semibold'
            fontSize='regular'
          />{" "}
        </Box>
        <Text mt='0.125rem' fontSize={"sm"} color='gray.500'>
          Commented {moment(activityItem.createdAt).fromNow()}
        </Text>
        <Box mt={2} fontSize={"sm"} color='gray.700'>
          <Text whiteSpace={"pre-wrap"}>{activityItem.object[0].text}</Text>
        </Box>
      </Box>
    </>
  );
}
