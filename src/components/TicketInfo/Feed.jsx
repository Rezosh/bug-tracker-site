import * as React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ActivityFeed from "../ActivityFeed";
import EmptyState from "../EmptyState";
export const Feed = () => {
  const params = useParams();
  const { data } = useSWR(`/api/tickets/${params.ticketId}/events`);
  const events = data?.events || [];

  return (
    <>
      {events.lenght === 0 ? (
        <ActivityFeed events={events} />
      ) : (
        <EmptyState text='No activity.' />
      )}
    </>
  );
};
