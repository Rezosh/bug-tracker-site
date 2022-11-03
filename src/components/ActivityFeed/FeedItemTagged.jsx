import { Box, Icon, Link } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { FaTag } from "react-icons/fa";
import UserProfileDrawer from "../UserProfile";
export function FeedItemTagged({ activityItem }) {
  return (
    <>
      <Box>
        <Box position='relative' px={1}>
          <Box
            h={8}
            w={8}
            bg='gray.100'
            rounded={"full"}
            ring='8'
            ringColor='white'
            display={"flex"}
            alignItems='center'
            justifyContent={"center"}>
            <Icon as={FaTag} h='4' w='4' color='gray.600' aria-hidden='true' />
          </Box>
        </Box>
      </Box>
      <Box minW={"0%"} flex='1 1 0%' py={1.5}>
        <Box fontSize={"sm"} textColor='gray.500'>
          <UserProfileDrawer
            userId={activityItem.actor._id}
            textColor='gray.900'
            fontWeight='semibold'
            fontSize='regular'
          />{" "}
          added tags{" "}
          <Link
            textColor={"gray.900"}
            fontWeight='semibold'
            _hover={{
              textDecoration: "none",
            }}>
            {activityItem.object.map((tag) => (
              <>
                {tag.name}
                {activityItem.object.length - 1 !==
                activityItem.object.indexOf(tag)
                  ? ", "
                  : null}
              </>
            ))}
          </Link>{" "}
          <Box as='span' whiteSpace={"nowrap"}>
            {moment(activityItem.createdAt).fromNow()}
          </Box>
        </Box>
      </Box>
    </>
  );
}
