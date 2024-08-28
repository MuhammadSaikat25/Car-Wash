import { useNavigate, useParams } from "react-router-dom";
import {
  useGetServiceSlotQuery,
  useGetServicesQuery,
  useGetSingleServiceQuery,
} from "../../redux/feature/service/serviceApi";
import { useEffect, useState } from "react";
import img from "../../assets/image_03.jpg";
import banner from "../../assets/breadcrumb-thumb.png";
import { MdArrowForwardIos } from "react-icons/md";
import { MdDoubleArrow } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const [service, setService] = useState<any>();
  const [allServices, setAllServices] = useState<any>([]);
  const { data } = useGetServicesQuery({ selectedDuration: "", search: "" });
  const [slot, setSlot] = useState<any>([]);
  const { id } = useParams();
  const { data: serviceData } = useGetSingleServiceQuery(id, { skip: !id });
  const { data: slotData } = useGetServiceSlotQuery(id, { skip: !id });
  const [selectedSlot, setSelectedSlot] = useState<string[]>([]);
  const [calenderDate, setCalenderDate] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setService(serviceData?.data);
    setSlot(slotData?.data);
    setAllServices(data?.data?.services);
  }, [serviceData, slotData, data]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedSlot((prevSelected) =>
      checked
        ? [...prevSelected, name]
        : prevSelected.filter((item) => item !== name)
    );
  };

  const handleDateChange = (e: any) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0];
    setCalenderDate(formattedDate);
  };

  const nweDate = new Date();
  const currentDate = nweDate.toISOString().split("T")[0];
  console.log(selectedSlot);
  return (
    <div className="pt-[62px] gap-x-7 bg-[#FFFFFF] text-gray-950 mb-20">
      {/* --------------- Banner image------------- */}
      <div className="bg-[#171717] flex items-center justify-around py-10">
        <div className="text-white">
          <p className="lg:text-4xl font-semibold">Service Details</p>
          <h1 className="text-white flex items-center lg:text-2xl mt-3">
            Home <MdArrowForwardIos /> Service Details
          </h1>
        </div>
        <img
          src={banner}
          className="hidden md:block md:w-[150px] lg:h-[300px] lg:w-[600px]"
          alt=""
        />
      </div>

      <div className="mt-6 flex flex-col-reverse md:flex-row items-start gap-x-10 w-fit mx-auto">
        {/* ------------- all service name------------ */}
        <div className="w-full md:w-fit p-2">
          <div className="w-full bg-slate-200 md:w-[300px] max-h-[400px] lg:mt-3 rounded-md overflow-hidden scroll-container overflow-y-auto p-3">
            <p className="font-semibold">All Services</p>
            {allServices?.map((service: any) => (
              <div className="" key={service?._id}>
                <h1
                  onClick={() => navigate(`/service-details/${service._id}`)}
                  className={`flex items-center bg-white p-2 rounded mt-2 gap-x-2 cursor-pointer ${
                    service._id === id && "bg-red-400"
                  }`}
                >
                  <MdDoubleArrow color="red" />
                  {service?.name}
                </h1>
              </div>
            ))}
          </div>
          {/* ----------------- contact --------------- */}
          <div className="md:w-[300px] bg-slate-200 p-3 rounded mt-3">
            <div className="bg-white p-2">
              <h1 className="text-center text-black font-semibold">
                Contact Us
              </h1>
              <section className="text-center">
                <p>It is a long established fact that a</p>
                <p>reader will be distracted by the </p>
                <p>and readable content repair</p>
              </section>
              <p className="bg-red-800 w-[40px] h-[40px] rounded-full relative mx-auto">
                <FaPhone className="absolute top-[28%] text-white left-[26%]" />
              </p>
              <p className="text-center">Need help?</p>
              <p className="text-center font-semibold">(801) 575-0122</p>
            </div>
          </div>
        </div>

        {/* ------------------- service details--------- */}
        <div className="w-fit mx-auto rounded p-3">
          <div className="">
            <img
              src={service?.image || img}
              className="h-[300px] w-[700px] object-cover rounded"
              alt=""
            />
            <h1 className="font-semibold my-2">{service?.name}</h1>
            <h1 className="font-semibold">{service?.description}</h1>
            <h1>Duration: {service?.duration} mins</h1>
            <h1>Price: ${service?.price}</h1>
          </div>

          <div className="overflow-y-auto max-h-[200px] mt-4">
            {slot?.map((slot: any, i: number) => (
              <div key={i} className="">
                {slot?.date === currentDate && (
                  <div className="">
                    <div key={i}>
                      <input
                        type="checkbox"
                        name={`${slot.date}|${slot?.startTime}|${slot?.endTime}`}
                        id={slot?._id}
                        onChange={handleCheckboxChange}
                        defaultChecked={slot.isBooked === "booked"}
                        disabled={slot.isBooked === "booked"}
                      />
                      <label htmlFor="">
                        {slot?.date} | start: {slot?.startTime}-end:{" "}
                        {slot?.endTime}
                      </label>
                    </div>
                  </div>
                )}
                {calenderDate && (
                  <div className="">
                    {slot?.date === calenderDate && (
                      <div className="">
                        <div key={i}>
                          <input
                            type="checkbox"
                            name={slot?.date}
                            id={slot?.date}
                            onChange={handleCheckboxChange}
                            defaultChecked={slot.isBooked === "booked"}
                            disabled={slot.isBooked === "booked"}
                          />
                          <label htmlFor="">
                            {slot?.date} | start: {slot?.startTime}-end:
                            {slot?.endTime}
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedSlot?.length ? (
            // /booking-page/:date/:slot
            <div
              className="mt-4"
              onClick={() =>
                navigate(
                  `/booking-page/${encodeURIComponent(
                    JSON.stringify(selectedSlot)
                  )}`
                )
              }
            >
              Booking Service
            </div>
          ) : (
            ""
          )}

          <div className="w-full mt-4">
            <input
              type="date"
              name=""
              id=""
              onChange={handleDateChange}
              className="w-full bg-blue-400 p-1 rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
