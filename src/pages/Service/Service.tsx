import { useEffect, useState } from "react";
import img from "../../assets/image_03.jpg";
import { useGetServicesQuery } from "../../redux/feature/service/serviceApi";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaCheckDouble } from "react-icons/fa6";

const Service = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const { data } = useGetServicesQuery({
    selectedDuration: selectedDuration!,
    search: search!,
    sortOrder,
  });
  useEffect(() => {
    setServices(data?.data?.services);
  }, [data]);
  const handleSortChange = (e: any) => {
    setSortOrder(e.target.value);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedDuration((prevSelected) =>
      checked
        ? [...prevSelected, name]
        : prevSelected.filter((item) => item !== name)
    );
  };
  const handleSearchClick = () => {
    setSearch(inputValue);
  };

  return (
    <div className="bg-[#F7F7FA]">
      <div className="py-4 max-w-[1450px] mx-auto pt-20 ">
        <div className="mb-4 flex flex-col gap-1 lg:flex-row items-center justify-between lg:pr-11 ">
          <div className="relative w-fit">
            <input
              className="border border-gray-800 bg-[#002260] text-white px-4 py-1 rounded-2xl"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <p
              className="bg-red-500 absolute top-[1px] cursor-pointer right-0 p-2 rounded-full w-fit h-fit"
              onClick={handleSearchClick}
            >
              <FaArrowRight color="white" />
            </p>
          </div>
          <div className="h-[100px] overflow-hidden overflow-y-scroll bg-green-300  relative w-fit  p-2 rounded scroll-container">
            {data?.data?.uniqDuration?.map((service: any, i: number) => (
              <div key={i} className="">
                <input
                  type="checkbox"
                  name={service}
                  id={service}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={service.duration}>{service}</label>
              </div>
            ))}
            <div className="flex items-center ">
              <label htmlFor="">Sort by:</label>
              <select
                name="cars"
                id="cars"
                className="bg-green-300"
                onChange={handleSortChange}
              >
                <option value="default">Default</option>
                <option value="asc">Low to High</option>
                <option value="dec">High to low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="">
          {/* -------------------------------- */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 ">
              {services?.map((service: any) => (
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
                  <button
                    onClick={() => navigate(`/service-details/${service._id}`)}
                    className="w-full bg-[#414347] text-gray-200"
                  >
                    Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
