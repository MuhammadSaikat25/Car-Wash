import { useEffect, useState } from "react";
import { useGetServicesQuery } from "../../../redux/feature/service/serviceApi";

const Service = () => {
  const [services, setServices] = useState<any>([]);
  const { data } = useGetServicesQuery(undefined);
  useEffect(() => {
    setServices(data?.data);
  }, [data]);

  return (
    <div className="py-4">
      {/* {services?.length && (
        <div className="">
          <h1 className="text-center text-2xl text-gray-600 font-semibold">
            Featured Services
          </h1>
          {
            services?.map((service:any)=>(
                <div className="" key={service._id}>
                    <h1>{service.name}</h1>
                    <h1>{service.description}</h1>
                </div>
            ))
          }
        </div>
      )} */}
    </div>
  );
};

export default Service;
