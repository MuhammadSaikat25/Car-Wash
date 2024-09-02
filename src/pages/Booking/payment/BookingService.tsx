import Stripe from "./Stripe";

type Props = {
  bookingData: any;
  setBookingModal: (bookingModal: boolean) => void;
  bookingModal: boolean;
};

const CourseEnroll = ({ bookingData, setBookingModal }: Props) => {
  return (
    <div className=" w-full absolute top-0 h-[100%]  bg-gray-950 bg-opacity-65">
      <div className="h-fit w-fit bg-white p-2 rounded-sm md:left-[30%] top-[20%] absolute left-[6%] lg:left-[40%]">
        <h1
          onClick={() => setBookingModal(false)}
          className="my-2 cursor-pointer"
        >
          X
        </h1>
        <Stripe bookingData={bookingData} />
      </div>
    </div>
  );
};

export default CourseEnroll;
