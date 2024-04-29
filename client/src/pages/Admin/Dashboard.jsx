import React from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import { CurveButton, SearchField } from "../../utils/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/AdminLayout/Charts";

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem ",
        height: 'fit-content',
        gap: '2rem',
        marginBottom: "2rem",
        borderRadius: "2rem",
        width: "20rem",
        backgroundColor: "#212b36",
        color: "#dfe3e8",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "#dfe3e8",
            borderRadius: "50%",
            border: "5px solid #dfe3e8",
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>

        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

const Widgets = (
  <Stack
    direction={{ xs: "coloumn", sm: "row" }}
    spacing="2rem"
    justifyContent="space-between"
    alignItems={"center"}
    margin={"2rem 0"}
    sx={{
      gap: '2rem',
    }}
  >
    <Widget title={"Uers"} value={34} Icon={<Person />} />
    <Widget title={"Chats"} value={4} Icon={<Group />} />
    <Widget title={"Messages"} value={455} Icon={<Message />} />
  </Stack>
);

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
        bgcolor: "#212b36",
        color: "#dfe3e8",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings
          sx={{
            fontSize: "3rem",
          }}
        />

        <SearchField />

        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />

        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"#dfe3e8"}
          textAlign={"center"}
        >
          {moment().format("MMM Do YYYY, h:mm:ss a")}
        </Typography>

        <Notifications />
      </Stack>
    </Paper>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          spacing={"2rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
          sx={{
            gap: '1rem',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "35rem",
              backgroundColor: "#212b36",
              color: "#dfe3e8",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>

            {<LineChart value={[12, 34, 9, 45, 8]} />}
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "22rem",
              height: "25rem",
              backgroundColor: "#212b36",
              color: "#dfe3e8",
            }}
          >
            {
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[23, 66]}
              />
            }

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group /> <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
