import { IoClose } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import {
  useGetServicesQuery,
  usePostServiceMutation,
} from "../../../../redux/feature/service/serviceApi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};
const CreateService = ({ setModal }: Props) => {
  const { refetch } = useGetServicesQuery({
    selectedDuration: "",
    search: "",
    sortOrder: "",
  });
  const [postService, { isSuccess, isError, }] = usePostServiceMutation();
  const [offer, setOffer] = useState([{ offers: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    duration: "",
    offers: [{ offers: "" }],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "duration" ? Number(value) : value,
    });
  };

  const handleOfferChange = (index: number, value: string) => {
    const newOffers = [...formData.offers];
    newOffers[index].offers = value;
    setFormData({ ...formData, offers: newOffers });
  };

  const addMoreOffer = () => {
    setOffer([...offer, { offers: "" }]);
    setFormData({
      ...formData,
      offers: [...formData.offers, { offers: "" }],
    });
  };

  const removeOffer = (index: number) => {
    const newOffers = formData.offers.filter((_, i) => i !== index);
    setOffer(newOffers);
    setFormData({ ...formData, offers: newOffers });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await postService(formData);
    if (isSuccess) {
      toast.success("service create successful");
      setModal(false);
      refetch();
    }
    if (isError) {
      toast.error("Something went wrong");
      setModal(false);
    }
    setModal(false);
    refetch();
  };

  return (
    <div>
      <Toaster />
      <div className="absolute scroll-container z-10 top-[10%] right-[10%] md:right-[30%] lg:right-[20%] bg-[#FFEAC5] p-10 rounded-md lg:w-[60%] max-h-[500px] overflow-y-scroll overscroll-y-contain">
        <div className="relative">
          <IoClose
            onClick={() => setModal(false)}
            className="cursor-pointer absolute -top-9 -right-8"
          />
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-950 p-1 rounded w-full"
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-950 p-1 rounded w-full"
            placeholder="Image Url"
            required
          />
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border border-gray-950 p-1 rounded w-full"
            placeholder="Duration (mins)"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-950 p-1 rounded w-full"
            placeholder="Price"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-950 p-1 rounded w-full"
            placeholder="Description"
            required
          ></textarea>
          <div className="flex flex-col gap-3">
            {formData.offers.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-x-2 relative">
                <input
                  name={`offer-${index}`}
                  className="border border-gray-950 p-1 rounded w-full"
                  type="text"
                  value={item.offers}
                  onChange={(e) => handleOfferChange(index, e.target.value)}
                  required
                  placeholder={`Offer ${index + 1}`}
                />
                {index > 0 && (
                  <IoClose
                    className="cursor-pointer absolute right-3"
                    onClick={() => removeOffer(index)}
                  />
                )}
              </div>
            ))}
            <button
              onClick={addMoreOffer}
              type="button"
              className="flex items-center"
            >
              <IoAddSharp />
              <span>Add more offer</span>
            </button>
          </div>
          <button className="bg-rose-800 text-white p-1 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
