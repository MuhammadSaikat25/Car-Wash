import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetServicesQuery } from "../../../redux/feature/service/serviceApi";
import { useEffect, useState } from "react";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
console.log();
const ServiceM = () => {
  const { data } = useGetServicesQuery({
    selectedDuration: "",
    search: "",
    sortOrder: "",
  });

  const [services, setServices] = useState<any>([]);
  useEffect(() => {
    setServices(data?.data?.services);
  }, [data]);
  const rows = services;
  return (
    <div className=" h-screen  bg-stone-200 lg:px-20">
      <div className="mb-3 pt-3">Add</div>
      <TableContainer component={Paper} className="lg:h-[80%] ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">Duration&nbsp;(g)</TableCell>
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
                <TableCell align="right">{row.duration}mins</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ServiceM;
