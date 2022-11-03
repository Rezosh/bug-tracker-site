import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Layout } from "./layouts/Layout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import MyTickets from "./pages/MyTickets";
import TicketInfo from "./components/TicketInfo";
import { mutate, SWRConfig } from "swr";
import ProjectInfo from "./pages/ProjectInfo";
import ProjectList from "./pages/ProjectList";
import { Box, Spinner } from "@chakra-ui/react";
import ProjectTags from "./components/ProjectTags";
import MyAssignedTickets from "./pages/MyAssignedTickets";
import AdminRoute from "./AdminRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const TicketLayout = lazy(() => import("./layouts/TicketLayout"));
const ProjectLayout = lazy(() => import("./layouts/ProjectLayout"));
const Users = lazy(() => import("./pages/Users"));

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) =>
          fetch(...args, {}).then(async (res) => {
            if (!res.ok) {
              const error = new Error(
                "An error occurred while fetching the data."
              );
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          }),
        suspense: true,
        use: [trackLiveQueries],
      }}>
      <Suspense
        fallback={
          <Box
            w='100vw'
            h='100vh'
            display='flex'
            justifyContent='center'
            alignItems='center'>
            <Spinner size='xl' />
          </Box>
        }>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='*' element={<Navigate to='/login' />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='tickets' element={<TicketLayout />}>
                    <Route path='me' element={<MyTickets />} />
                    <Route path='assigned' element={<MyAssignedTickets />} />
                    <Route path=':ticketId' element={<TicketInfo />} />
                  </Route>
                  <Route path='projects' element={<ProjectLayout />}>
                    <Route path='all' element={<ProjectList />} />
                    <Route path=':projectId' element={<ProjectInfo />} />
                    <Route path=':projectId/tags' element={<ProjectTags />} />
                    <Route
                      path=':projectId/tickets/:ticketId'
                      element={<TicketInfo />}
                    />
                  </Route>
                  <Route element={<AdminRoute />}>
                    <Route path='users' element={<Users />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </SWRConfig>
  );
}

let liveQueries = new Set();

function trackLiveQueries(useSWRNext) {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      liveQueries.add(key);

      return () => {
        liveQueries.delete(key);
      };
    }, [key]);

    return swr;
  };
}

export async function revalidateLiveQueries() {
  let promises = [...liveQueries.values()].map((key) => mutate(key));

  return Promise.all(promises);
}
