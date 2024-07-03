import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Typography, Box } from "@mui/material";
import Spinner from "../components/Spinner";

import { getUser } from "../services/apiUsers";
import ApplicationsList from "../components/ApplicationsList";

function Dashboard() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const email = user?.email;
  const username = email?.slice(0, email.indexOf("@"));

  useEffect(() => {
    if (error) {
      toast.error("Error fetching user's information");
    }
  }, [error]);

  return (
    <Box>
      <Box>
        <Toaster position="top-center" reverseOrder={false} />
        {isLoading ? (
          <Spinner />
        ) : (
          <Typography variant="h4" component="h2" sx={{ marginTop: "2rem" }}>
            Welcome back,{" "}
            <span style={{ fontWeight: 700 }}>
              {user?.username
                ? user.username
                : username
                ? username[0].toUpperCase() + username.slice(1)
                : ""}
            </span>
            !
          </Typography>
        )}
      </Box>
      <Box marginTop="3rem">
        <ApplicationsList />
      </Box>
    </Box>
  );
}

export default Dashboard;
