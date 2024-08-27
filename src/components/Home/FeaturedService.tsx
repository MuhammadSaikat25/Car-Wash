import { useEffect, useState } from "react";
import img from "../../assets/image_03.jpg";
import { useGetServicesQuery } from "../../redux/feature/service/serviceApi";

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
          <div className="grid grid-cols-5 gap-3">
            {services?.slice(0, 6).map((service: any) => (
              <div
                className="border border-blue-500 w-[250px]"
                key={service._id}
              >
                <img
                  className="w-[250px] h-[150px] "
                  src={service.image || img}
                  alt=""
                />
                <div className="p-2">
                  <h1>{service.name}</h1>
                  <h1>{service.description}</h1>
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
