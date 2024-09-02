import { useEffect, useState } from "react";
import img from "../../assets/image_03.jpg";
import { useGetServicesQuery } from "../../redux/feature/service/serviceApi";
import { FaCheckDouble } from "react-icons/fa6";

const FeaturedService = () => {
  const [services, setServices] = useState<any>([]);
  const { data } = useGetServicesQuery({ selectedDuration: "", search: "" });
  useEffect(() => {
    setServices(data?.data.services);
  }, [data]);

  return (
    <div className="py-4 max-w-[1450px] mx-auto">
      {services?.length && (
        <div className="">
          <h1 className="text-center text-2xl text-gray-600 font-semibold">
            Featured Services
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 w-fit mx-auto">
            {services?.slice(0, 6).map((service: any) => (
              <div
                className="border hover:bg-[#020D26] duration-500 hover:text-gray-200 border-blue-500 w-[250px] shadow-black shadow mx-auto"
                key={service._id}
              >
                <img
                  className="w-[250px] h-[150px] "
                  src={service.image || img}
                  alt=""
                />
                <div className="p-2">
                  <p>{service.name}</p>
                  <p className="my-1">{service.description}</p>
                  <p>Duration {service.duration} mins</p>
                  <p className="">Price: ${service?.price}</p>

                  <div className="my-1">
                    {service?.offers.map((offer: any) => (
                      <div key={offer} className="flex items-center gap-x-1 ">
                        <span>
                          <FaCheckDouble size={10} />
                        </span>
                        {offer.offers}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedService;
