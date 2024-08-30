import { useEffect, useState } from "react";
import { useGetAllBookingQuery } from "../../../redux/feature/booking/bookingApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AllBooking = () => {
  const [allBooking, setAllBooking] = useState<any>([]);
  const { data } = useGetAllBookingQuery(undefined);

  useEffect(() => {
    setAllBooking(data?.data);
  }, [data]);
  const rows = allBooking;

  return (
    <div className="h-screen relative bg-stone-200 lg:px-20 pt-20 p-3">
      <TableContainer
        component={Paper}
        className="max-h-[50%] h-fit scroll-container"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Duration&nbsp;(mins)</TableCell>
              <TableCell align="right">Service Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.customer.name}
                </TableCell>
                <TableCell align="right">{row.serviceId.price}</TableCell>
                <TableCell align="right">
                  {row.serviceId.duration} mins
                </TableCell>
                <TableCell align="right">{row.serviceId.name} </TableCell>
                <TableCell align="right">{row.slotId.date} </TableCell>
                <TableCell align="right">{row.slotId.startTime} </TableCell>
                <TableCell align="right">{row.slotId.endTime} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllBooking;
