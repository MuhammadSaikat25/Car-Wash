import { useEffect, useState } from "react";
import { useGetUserBookingQuery } from "../../../redux/feature/booking/bookingApi";
import { differenceInSeconds } from "date-fns";

const UserBookingUi = () => {
  const { data } = useGetUserBookingQuery(undefined);

  const [upcomingSlots, setUpcomingSlots] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (data?.data) {
      // Flatten slots and filter by future dates
      const filteredSlots = data.data
        .flatMap((booking: any) =>
          booking.slotId.map((slot: any) => ({
            ...slot,
            serviceName: booking.serviceId.name,
          }))
        )
        .filter((slot: any) => {
          const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
          const currentDateTime = new Date();

          console.log('Slot Date Time:', slotDateTime);
          console.log('Current Date Time:', currentDateTime);
          console.log('Is Slot in the Future:', slotDateTime > currentDateTime);

          return slotDateTime > currentDateTime;
        });

      console.log('Filtered Slots:', filteredSlots); // Debug
      setUpcomingSlots(filteredSlots || []);
    }
  }, [data]);

  useEffect(() => {
    if (upcomingSlots.length > 0) {
      const intervalId = setInterval(() => {
        const updatedTimeLeft: { [key: string]: any } = {};
        upcomingSlots.forEach((slot: any) => {
          const time = calculateTimeLeft(slot?.date, slot?.startTime);
          updatedTimeLeft[slot?._id] = time;
        });
        setTimeLeft(updatedTimeLeft);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [upcomingSlots]);

  const calculateTimeLeft = (date: string, startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const bookingDate = new Date(date);
    bookingDate.setHours(hours, minutes, 0, 0);

    const currentDate = new Date();
    const diffInSeconds = differenceInSeconds(bookingDate, currentDate);

    if (diffInSeconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hoursLeft = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutesLeft = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const secondsLeft = diffInSeconds % 60;

    return { days, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft };
  };

  return (
    <div>
      <div className="mt-4 flex flex-col gap-3">
        {upcomingSlots.map((slot: any) => {
          const time = timeLeft[slot?._id] || {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };

          return (
            <div key={slot?._id} className="mt-4 flex ">
              <div className="border border-black p-1 rounded-sm w-fit ">
                <p>Service: {slot?.serviceName}</p>
                <p>Booking Date: {slot?.date}</p>
                <p>Start Time: {slot?.startTime}</p>
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
