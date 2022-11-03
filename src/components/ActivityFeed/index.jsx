import { FeedItemTicketClosed } from "./FeedItemTicketClosed";
import { FeedItemUntagged } from "./FeedItemUntagged";
import { FeedItemTagged } from "./FeedItemTagged";
import { FeedItemUnassign } from "./FeedItemUnassign";
import { FeedItemAssign } from "./FeedItemAssign";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { FeedItemComment } from "./FeedItemComment";

const ActivityFeed = ({ events }) => {
  return (
    <Box display={"flow-root"}>
      <Box as='ul' mb={-8}>
        {events.map((activityItem, activityItemIdx) => (
          <Box as='li' listStyleType='none' key={activityItem._id}>
            <Box pb={8} position='relative'>
              {activityItemIdx !== events.length - 1 ? (
                <Box
                  as='span'
                  position='absolute'
                  top='5'
                  left='5'
                  w='0.125rem'
                  ml='-1px'
                  h={"full"}
                  bg='gray.200'
                />
              ) : null}
              <Stack
                spacing={3}
                display={"flex"}
                align={"flex-start"}
                position='relative'
                direction={"row"}>
                {activityItem.action === "commented" ? (
                  <FeedItemComment activityItem={activityItem} />
                ) : activityItem.action === "assigned" ? (
                  <FeedItemAssign activityItem={activityItem} />
                ) : activityItem.action === "unassigned" ? (
                  <FeedItemUnassign activityItem={activityItem} />
                ) : activityItem.action === "tagged" ? (
                  <FeedItemTagged activityItem={activityItem} />
                ) : activityItem.action === "untagged" ? (
                  <FeedItemUntagged activityItem={activityItem} />
                ) : activityItem.action === "closed" ? (
                  <FeedItemTicketClosed activityItem={activityItem} />
                ) : null}
              </Stack>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityFeed;
