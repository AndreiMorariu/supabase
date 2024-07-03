import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Typography, Box, Divider, TextField } from "@mui/material";
import { getUserApplications } from "../services/apiApplications";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Spinner from "./Spinner";

import Application from "./Application";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";

function ApplicationsList() {
  const [currentApplication, setCurrentApplication] = useState(null);
  const [createApplication, setCreateApplication] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {
    data: applications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: getUserApplications,
  });

  function handleModalOpen(index) {
    setCurrentApplication(applications[index]);
  }

  function handleModalClose() {
    setCurrentApplication(null);
    setCreateApplication(false);
  }

  const filteredApplications = applications?.filter(
    (ap) =>
      ap.position.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      ap.company.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      ap.location.toLowerCase().includes(inputValue.toLocaleLowerCase())
  );

  return (
    <Box
      sx={{ border: "2px solid #D3D3D3", padding: "1rem" }}
      borderRadius="1rem"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          marginBottom: "2rem",
          borderBottom: "1px solid #D3D3D3",
          paddingBottom: "1rem",
        }}
      >
        <Typography variant="h6" component="p" fontWeight="700">
          Your applications
        </Typography>
        <Box display="flex" alignItems="center" gap="10px">
          <TextField
            label="Search"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="small"
          />
          <AddBoxIcon
            sx={{ cursor: "pointer" }}
            color="primary"
            onClick={() => setCreateApplication((prev) => !prev)}
          />
        </Box>
      </Box>
      {isLoading && <Spinner />}
      {applications?.length === 0 && (
        <Typography
          variant="subtitle1"
          component="p"
          fontWeight="700"
          textAlign="center"
        >
          No applications
        </Typography>
      )}
      <Box sx={{ overflowY: "scroll", height: "25rem" }}>
        {applications?.length > 0 &&
          filteredApplications.map((application, index) => (
            <Box
              key={application.id}
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              <Application
                company={application.company}
                position={application.position}
                status={application.status}
                application_date={application.application_date}
                location={application.location}
                link={application.link}
                onOpen={handleModalOpen}
                index={index}
                id={application.id}
              />
              <Divider />
            </Box>
          ))}
      </Box>
      {currentApplication && (
        <EditModal
          company={currentApplication.company}
          position={currentApplication.position}
          status={currentApplication.status}
          application_date={currentApplication.application_date}
          location={currentApplication.location}
          link={currentApplication.link}
          id={currentApplication.id}
          onClose={handleModalClose}
        />
      )}
      {createApplication && <CreateModal onClose={handleModalClose} />}
    </Box>
  );
}

export default ApplicationsList;
