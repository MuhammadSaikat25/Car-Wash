import { useEffect, useState } from "react";
import { useGetUserBookingQuery } from "../../../redux/feature/booking/bookingApi";
import { differenceInSeconds } from "date-fns";

const ImmediateNextSlot = () => {
  const { data } = useGetUserBookingQuery(undefined);

  const [nextBooking, setNextBooking] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (data?.data?.length > 0) {
      const filteredBookings = data.data
        .flatMap((row: any) =>
          row.slotId.map((slot: any) => ({
            ...slot,
            serviceName: row.serviceId?.name,
          }))
        )
        .filter((slot: any) => {
          const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
          const currentDateTime = new Date();
          return slotDateTime > currentDateTime;
        });

      const sortedBookings = filteredBookings.sort(
        (a: any, b: any) =>
          new Date(`${a.date}T${a.startTime}`).getTime() -
          new Date(`${b.date}T${b.startTime}`).getTime()
      );

      setNextBooking(sortedBookings[0] || null);
    }
  }, [data]);

  useEffect(() => {
    if (nextBooking) {
      const intervalId = setInterval(() => {
        const time = calculateTimeLeft(nextBooking.date, nextBooking.startTime);
        setTimeLeft(time);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [nextBooking]);

  const calculateTimeLeft = (date: string, startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    const currentDateTime = new Date();
    const diffInSeconds = differenceInSeconds(bookingDateTime, currentDateTime);

    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hoursLeft = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutesLeft = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const secondsLeft = diffInSeconds % 60;

    return {
      days,
      hours: hoursLeft,
      minutes: minutesLeft,
      seconds: secondsLeft,
    };
  };

  return (
    <div>
      {nextBooking && (
        <div className= "text-white md:text-gray-950">
          <p className="text-gray-950">
            Next slot: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
            {timeLeft.seconds}s
          </p>
        </div>
      )}
    </div>
  );
};

export default ImmediateNextSlot;
