import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "../../../../redux/feature/service/serviceApi";
import { useEffect, useState } from "react";

import UpdateService from "./UpdateService";
import CreateService from "./CreateService";
import toast, { Toaster } from "react-hot-toast";

const ServiceM = () => {
  const { data, refetch } = useGetServicesQuery({
    selectedDuration: "",
    search: "",
    sortOrder: "",
  });
  const [deleteService, { error, data: a }] = useDeleteServiceMutation();
  const [updateServiceId, setUpdateServiceId] = useState("");
  const [deleteServiceId, setDeleteServiceId] = useState("");
  const [services, setServices] = useState<any[]>([]);
  console.log(error);
  console.log(a);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, steDeleteModal] = useState(false);
  useEffect(() => {
    setServices(data?.data?.services);
  }, [data]);

  const rows = services;
  const handelDelete = async () => {
    await deleteService(deleteServiceId);
    toast.success("service delete successful");
    refetch();
    steDeleteModal(false);
  };
  return (
    <div className="h-screen relative bg-stone-200 lg:px-20 ">
      <Toaster />
      <div className="mb-3 pt-3 ">
        <button
          onClick={() => {
            setUpdateModal(false);
            setModal(true);
          }}
          className="bg-blue-700 text-white p-1 rounded "
        >
          Add Service
        </button>
      </div>
      <TableContainer component={Paper} className="lg:h-[80%] scroll-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Duration&nbsp;(mins)</TableCell>
              {/* <TableCell align="right">offer</TableCell> */}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.duration} mins</TableCell>
                {/* <TableCell align="right">
                  {row?.offers?.map((offer: any, i: number) => (
                    <div className="flex flex-col " key={i}>
                      <p> {offer?.offers}</p>
                    </div>
                  ))}
                </TableCell> */}
                <TableCell align="right">
                  <div className="flex flex-col justify-end ">
                    <p
                      onClick={() => {
                        setDeleteServiceId(row._id);
                        steDeleteModal(true);
                        setUpdateModal(false);
                      }}
                      className="self-end bg-red-500 text-white p-1 rounded w-[55px] cursor-pointer"
                    >
                      Delete
                    </p>
                    <p
                      onClick={() => {
                        setUpdateServiceId(row._id);
                        setUpdateModal(true);
                        setModal(false);
                        steDeleteModal(false);
                      }}
                      className="self-end bg-green-500 mt-1 w-fit text-white p-1 rounded cursor-pointer"
                    >
                      Update
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ------------- create service ----------- */}
      {modal && <CreateService modal={modal} setModal={setModal} />}

      {updateModal && (
        <UpdateService
          id={updateServiceId}
          modal={modal}
          setModal={setModal}
          setUpdateModal={setUpdateModal}
          updateModal={updateModal}
        />
      )}
      {deleteModal && (
        <div className="absolute  z-10 top-[20%] right-[10%] md:right-[30%] lg:right-[45%] bg-[#FFEAC5] p-10 rounded-md w-fit">
          <div className="">
            <p>Are you sure ? </p>
            <span className="flex items-center gap-x-4">
              <button onClick={handelDelete}>Yes</button>
              <button onClick={() => steDeleteModal(false)}>No</button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceM;
