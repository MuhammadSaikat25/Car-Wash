import { useEffect, useState } from "react";
import {
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/feature/auth/authApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast, Toaster } from "react-hot-toast";

const ManageUserUi = () => {
  const [users, setUsers] = useState<any>([]);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserId, setUpdateUserId] = useState("");
  const { data, refetch } = useGetAllUserQuery(undefined);
  useEffect(() => {
    setUsers(data?.data);
  }, [data]);
  const rows = users;
  const [roleModal, setRoleModal] = useState(false);
  const handelEditBtn = (id: string) => {
    setUpdateUserId(id);
    setRoleModal(true);
  };
  const user = users?.find((user: any) => user._id === updateUserId);

  const updateUser = async () => {
    const role = user?.role === "user" ? "admin" : "user";
    await updateUserRole({ id: user._id, role });
    refetch();
    toast.success("user role update successful");
    setRoleModal(false);
  };

  return (
    <div className="h-screen relative bg-stone-200 lg:px-20 pt-20 p-3">
      <Toaster />
      <TableContainer
        component={Paper}
        className="max-h-[70%] scroll-container"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.role}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.phone}
                </TableCell>
                <TableCell component="th" scope="row">
                  <button
                    onClick={() => handelEditBtn(row._id)}
                    className="text-white bg-blue-700 p-1 rounded-sm"
                  >
                    Edit Role
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {roleModal && (
        <div className="absolute top-[20%]  left-[20%] bg-slate-500 p-2 text-white rounded-sm">
          <p>
            Are you sure you want change {user.email} role into
            {user?.role === "user" ? "admin" : "user"}
          </p>
          <div className="flex items-center gap-x-4">
            <button onClick={updateUser}>Yes</button>
            <button onClick={() => setRoleModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUserUi;
