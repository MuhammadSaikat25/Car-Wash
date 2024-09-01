import {
  useGetAllSlotQuery,
  useUpdateSlotMutation,
} from "../../../../redux/feature/slot/slotApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import CreateSlot from "./CreateSlot";

const ManageSlotUi = () => {
  const [slots, setSlots] = useState<any>([]);
  const [updateSlotId, setUpdateSlotId] = useState("");
  const [statusModal, setStatusModal] = useState(false);
  const [createModal, setCrateModal] = useState(false);
  const { data, refetch } = useGetAllSlotQuery(undefined);

  useEffect(() => {
    if (data?.data) {
      setSlots(data.data);
    }
  }, [data]);

  const handelEditBtn = (id: string) => {
    setUpdateSlotId(id);
    setStatusModal(true);
  };
  const [updateSlot, { error }] = useUpdateSlotMutation();
  const slot = slots.find((slot: any) => slot._id === updateSlotId);

  const updateSlotStatus = async () => {
    const status = slot?.isBooked === "available" ? "canceled" : "available";
    await updateSlot({ id: slot._id, status: status });
    refetch();
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        toast.error(errorData.message);
        setStatusModal(false);
        return;
      }
    } else {
      toast.success("slot status change");
      setStatusModal(false);
    }
  };

  return (
    <div className="h-screen">
      <Toaster />
      <div className="">
        <button onClick={() => setCrateModal(true)}>Create Slot</button>
      </div>
      <TableContainer
        component={Paper}
        className="h-screen lg:max-h-[70%] lg:scroll-container"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slots.map((row: any) => (
              <TableRow key={row._id}>
                <TableCell>{row.service.name}</TableCell>
                <TableCell>{row.isBooked}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.endTime}</TableCell>
                <TableCell>
                  {row?.isBooked === "booked" ? (
                    ""
                  ) : (
                    <button onClick={() => handelEditBtn(row._id)}>Edit</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {statusModal && slot && (
        <div className="absolute top-[20%] left-[20%] bg-slate-500 p-2 text-white rounded-sm">
          <p>
            Are you sure you want to change the status of {slot.service.name}{" "}
            {slot?.isBooked === "available" ? "canceled" : "available"}?
          </p>
          <div className="flex items-center gap-x-4">
            <button onClick={updateSlotStatus}>Yes</button>
            <button onClick={() => setStatusModal(false)}>No</button>
          </div>
        </div>
      )}

      {createModal && <CreateSlot setCrateModal={setCrateModal} createModal={createModal} />}
    </div>
  );
};

export default ManageSlotUi;
