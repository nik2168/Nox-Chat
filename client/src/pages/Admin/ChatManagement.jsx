import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { Container, Avatar, Stack } from "@mui/material";
import Table from "../../components/AdminLayout/Table";
import { useParams } from "react-router-dom";
import { dashboardData } from "../../assets/dashboarddata.js";
import { transformImage } from "../../lib/features.js";



const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },

  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },

  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
              <Stack direction='row' alignItems='center' spacing={2}>
      {  params.row.members.map((i) => {
          return (
          <Avatar key={i._id} alt={i._id} src={i.avatar} />
          )
        })
      }
        </Stack>
    ),
  },

  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },

  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];



const ChatsManagement = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => {
         return {
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        };
      })
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatsManagement;
