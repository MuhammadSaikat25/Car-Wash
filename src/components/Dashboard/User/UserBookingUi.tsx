import { useEffect, useState } from "react";
import { useGetUserBookingQuery } from "../../../redux/feature/booking/bookingApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpComingBooking from "./UpComingBooking";


const UserBookingUi = () => {

  const { data,refetch } = useGetUserBookingQuery(undefined);
  const [toggleBooking, setToggleBooking] = useState("upcoming");
  const [myBooking, setMyBooking] = useState<any>([]);

  useEffect(() => {
    const filteredBookings = data?.data?.filter((row: any) => {
      const bookingDate = new Date(row?.slotId[0]?.date);
      const currentDate = new Date();
      return bookingDate < currentDate;
    });

    setMyBooking(filteredBookings);
    refetch()
  }, [data]);

  const rows = myBooking;
 
  return (  
    <div className="p-2">
      <div className="flex items-center gap-x-2 justify-center mb-3">
        <button
          onClick={() => setToggleBooking("pass")}
          className={`${
            toggleBooking === "pass" ? "bg-green-500" : "bg-orange-500"
          } p-1 text-white rounded-sm`}
        >
          Pass Booking
        </button>
        <button
          onClick={() => setToggleBooking("upcoming")}
          className={`${
            toggleBooking === "upcoming" ? "bg-green-500" : "bg-orange-500"
          } p-1 text-white rounded-sm`}
        >
          Upcoming Booking
        </button>
      </div>
          
      <div className="">
        {toggleBooking === "upcoming" ? (
          <UpComingBooking />
        ) : (
          <div className="">
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
                    <TableCell>Phone</TableCell>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Booking Date</TableCell>
                    <TableCell>Booking Start Time</TableCell>
                    <TableCell>Booking End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row: any, i: number) =>
                    row.slotId.map((slot: any, j: number) => (
                      <TableRow
                        key={`${i}-${j}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row?.customer?.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {/* {row?.customer?.address} */}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row?.customer?.email}
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {row?.customer?.phone}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row?.serviceId?.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {slot?.date}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {slot?.startTime}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {slot?.endTime}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingUi;
