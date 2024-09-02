import { useParams } from "react-router-dom";
import {
  useGetServiceSlotQuery,
  useGetSingleServiceQuery,
} from "../../redux/feature/service/serviceApi";
import { useEffect, useState } from "react";
import img from "../../assets/banner.jpg";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { loadStripe } from "@stripe/stripe-js";
import BookingService from "./payment/BookingService";
import asset from "../../assets/Asset.png";

const BookingPage = () => {
  const { slots, serviceId } = useParams();
  const selectedSlot = slots ? JSON.parse(decodeURIComponent(slots)) : [];
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data: allSlot } = useGetServiceSlotQuery(serviceId, {
    skip: !serviceId,
  });
  const { data } = useGetSingleServiceQuery(serviceId, { skip: !serviceId });
  const [service, setService] = useState<any>();
  const [slot, setSlot] = useState<any>([]);
  const [bookingModal, setBookingModal] = useState(false);
  useEffect(() => {
    setService(data?.data);
    setSlot(allSlot?.data);
  }, [data, allSlot]);

  let timeSlot = selectedSlot.map((item: any) => {
    let [date, startTime, endTime] = item.split("|");
    return {
      date,
      startTime,
      endTime,
    };
  });
  const bookingTime = slot?.filter((item1: any) =>
    timeSlot?.some(
      (item2: any) =>
        item1.date === item2.date &&
        item1.startTime === item2.startTime &&
        item1.endTime === item2.endTime
    )
  );
  const handelPayment = async (e: any) => {
    e.preventDefault();
    setBookingModal(true);
  };
  const bookingData = {
    serviceId,
    bookingTime,
  };

  return (
    <div className="pt-[62px]">
      <img
        src={service?.image || img}
        className="w-full h-[250px] object-cover"
        alt=""
      />
      <div
        className="bg-[#015496] pt-10"
        style={{ backgroundImage: `url(${asset})` }}
      >
        <div className="flex flex-wrap gap-3 items-center justify-center gap-x-4 mb-10">
          <div className="bg-white hover:bg-rose-500 hover:text-white shadow-blue-300 text-center shadow-md w-[300px] p-10 rounded-md h-fit">
            <p className="bg-red-800 w-[40px] h-[40px] rounded-full relative mx-auto">
              <IoLocation className="absolute top-[28%] text-white left-[26%]" />
            </p>
            <h1 className="text-2xl font-semibold text-gray-900 ">
              Our Office Address
            </h1>
            <p>
              835 Middle Country Rd, Selden, NY 11784,
              <br /> United States
            </p>
          </div>
          <div className="bg-white shadow-blue-300 text-center shadow-md w-[300px] hover:text-white p-10 rounded-md h-[227px] hover:bg-rose-500 ">
            <p className="bg-red-800 w-[40px] h-[40px] rounded-full relative mx-auto">
              <FaPhone className="absolute top-[28%] text-white left-[26%]" />
            </p>
            <h1 className="text-2xl font-semibold text-gray-900 ">
              Call Us Anytime
            </h1>
            <p>
              help007/@gmail.com <br />
              (+163)-1202-0088
            </p>
          </div>
          <div className="bg-white shadow-blue-300 text-center shadow-md w-[300px] p-10 rounded-md h-fit hover:bg-rose-500 hover:text-white">
            <p className="w-[40px] h-[40px] rounded-full relative mx-auto">
              <IoTime className="absolute top-[28%] text-white left-[26%]" />
            </p>
            <h1 className="text-2xl font-semibold text-gray-900 ">
              Official Work Time
            </h1>
            <p>
              9:00am - 6:00pm ( Monday - Friday ) <br />
              Saturday & Sunday Closed
            </p>
          </div>
        </div>
        {/* ----------------------- */}
        <div className="flex gap-x-5 items-start justify-center p-5  ">
          <div className="w-fit  text-white">
            <img className="w-full h-[150px] rounded" src={img} alt="" />
            <h1 className="font-semibold my-2">{service?.name}</h1>
            <h1 className="font-semibold">{service?.description}</h1>
            <h1>Duration: {service?.duration} mins</h1>

            {bookingTime?.map((slot: any, i: number) => (
              <div key={i} className="">
                <h1>
                  {slot?.date} | start: {slot?.startTime}-end: {slot?.endTime}
                </h1>
              </div>
            ))}
            <section className="flex items-center gap-x-2">
              <p>Price:</p>
              <p>${service?.price * bookingTime?.length}</p>
            </section>
          </div>
          {/* ------------------- */}
          <div className=" w-[30%] h-fit p-3">
            <form
              onSubmit={handelPayment}
              className="w-full p-3 flex flex-col gap-y-3 "
            >
              <input
                type="text"
                value={user?.name}
                readOnly
                className="p-1 rounded-sm border-gray-950 border"
              />
              <input
                type="email"
                value={user?.email}
                readOnly
                className="p-1 rounded-sm border-gray-950 border"
              />
              {bookingTime?.map((slot: any, i: number) => (
                <div key={i} className="">
                  <input
                    className="w-full p-1 rounded-sm border-gray-950 border "
                    type="text"
                    value={`${slot?.date} | start: ${slot?.startTime}-end: ${slot?.endTime}`}
                    readOnly
                  />
                </div>
              ))}
              <button className="bg-blue-600 text-white p-1 rounded-sm">
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
      {bookingModal && <BookingService bookingData={bookingData}  bookingModal={bookingModal} setBookingModal={setBookingModal}/>}
    </div>
  );
};

export default BookingPage;
