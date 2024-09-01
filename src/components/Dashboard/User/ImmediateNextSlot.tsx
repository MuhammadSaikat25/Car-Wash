import { useEffect, useState } from "react";
import { useGetUserBookingQuery } from "../../../redux/feature/booking/bookingApi";
import { differenceInSeconds } from "date-fns";

const ImmediateNextSlot = () => {
  const { data } = useGetUserBookingQuery(undefined);

  const [nextBooking, setNextBooking] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (data?.data?.length > 0) {
      const filteredBookings = data.data.filter((row: any) => {
        const bookingDate = new Date(row?.slotId?.date);
        const currentDate = new Date();
        return bookingDate > currentDate;
      });

      const sortedBookings = filteredBookings.sort(
        (a: any, b: any) =>
          new Date(a.slotId.date).getTime() - new Date(b.slotId.date).getTime()
      );

      setNextBooking(sortedBookings[0]);
    }
  }, [data]);

  useEffect(() => {
    if (nextBooking) {
      const intervalId = setInterval(() => {
        const time = calculateTimeLeft(nextBooking?.slotId?.date);
        setTimeLeft(time);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [nextBooking]);

  const calculateTimeLeft = (date: string) => {
    const bookingDate = new Date(date);
    const currentDate = new Date();
    const diffInSeconds = differenceInSeconds(bookingDate, currentDate);

    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = diffInSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  return (
    <div>
      {nextBooking ? (
        <div className="">
          {/* <p>Service: {nextBooking?.serviceId?.name}</p>
          <p>Booking Date: {nextBooking?.slotId?.date}</p> */}
          <p className="text-gray-950">
          Next slot: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ImmediateNextSlot;
