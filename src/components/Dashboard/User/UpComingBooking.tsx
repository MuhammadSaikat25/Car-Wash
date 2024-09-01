import { useEffect, useState } from "react";
import { useGetUserBookingQuery } from "../../../redux/feature/booking/bookingApi";

import { differenceInSeconds } from "date-fns";

const UserBookingUi = () => {
  const { data } = useGetUserBookingQuery(undefined);

  const [upcomingBookings, setUpcomingBookings] = useState<any>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const filteredBookings = data?.data?.filter((row: any) => {
      const bookingDate = new Date(row?.slotId?.date);
      const currentDate = new Date();
      return bookingDate > currentDate;
    });

    setUpcomingBookings(filteredBookings);
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimeLeft: { [key: string]: any } = {};
      upcomingBookings?.forEach((booking: any) => {
        const time = calculateTimeLeft(booking?.slotId?.date);
        updatedTimeLeft[booking?.slotId?.date] = time;
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [upcomingBookings]);

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
      <div className="mt-4 flex items-center gap-3 ">
        {upcomingBookings?.map((booking: any, index: number) => {
          const time = timeLeft[booking?.slotId?.date] || {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };

          return (
            <div key={index} className="mt-4">
              <div className="border border-black p-1 rounded-sm">
                <p>Service: {booking?.serviceId?.name}</p>
                <p>Booking Date: {booking?.slotId?.date}</p>
                <p>
                  Time Left: {time.days}d {time.hours}h {time.minutes}m{" "}
                  {time.seconds}s
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserBookingUi;
