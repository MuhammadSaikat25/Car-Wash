import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { slot } = useParams();
  const selectedSlot = slot ? JSON.parse(decodeURIComponent(slot)) : [];
   
  return (
    <div>
      <h1>Booking Page</h1>
      <p>Selected Slot: {JSON.stringify(selectedSlot)}</p>
    </div>
  );
};

export default BookingPage;
