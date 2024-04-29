import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { Container, Avatar } from "@mui/material";
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
    width: 200,
  },

  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },

  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },

];


const UsersManagement = () => {

const [rows, setRows] = useState([]);

useEffect(() => {
 setRows(
  dashboardData.users.map((i) => {
  return {
    ...i, 
    id: i._id,
    avatar: transformImage(i.avatar, 50),
  }
 }))
}, [])

  return (
    <AdminLayout>
 <Table heading={"All Users"} columns={columns} rows={rows}/>
    </AdminLayout>
  );
};

export default UsersManagement;
