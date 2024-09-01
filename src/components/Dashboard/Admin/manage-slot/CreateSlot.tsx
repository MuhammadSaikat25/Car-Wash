import { useEffect, useState } from "react";
import { useGetServicesQuery } from "../../../../redux/feature/service/serviceApi";
import { useCreateSlotMutation } from "../../../../redux/feature/slot/slotApi";
import { toast, Toaster } from "react-hot-toast";
interface SlotData {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
}

type Props = {
  createModal: boolean;
  setCrateModal: (createModal: boolean) => void;
};

const hours = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const CreateSlot = ({ setCrateModal }: Props) => {
  const [createSlot, { error }] = useCreateSlotMutation();
  const { data } = useGetServicesQuery({
    selectedDuration: "",
    search: "",
    sortOrder: "",
  });

  const [slotData, setSlotData] = useState<SlotData>({
    service: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [allServices, setAllServices] = useState<any[]>([]);

  useEffect(() => {
    setAllServices(data?.data?.services || []);
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSlotData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const today = new Date().toISOString().split("T")[0];

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSlot(slotData).unwrap();
      if (!error) {
        toast.success("Slot create successful");
      }
      setCrateModal(false);
    } catch (err) {
      console.error("Failed to create slot:", err);
    }
  };

  return (
    <div className="absolute top-[10%] bg-slate-200 p-4 rounded shadow-lg lg:left-[40%]">
      <Toaster />
      <h1
        className="text-right mb-4 text-xl font-semibold cursor-pointer"
        onClick={() => setCrateModal(false)}
      >
        &times;
      </h1>
      <form onSubmit={submitForm} className="space-y-4">
        {/* Service Selection */}
        <div className="flex flex-col">
          <label htmlFor="service" className="mb-1 font-medium">
            Select Service
          </label>
          <select
            id="service"
            name="service"
            value={slotData.service}
            onChange={handleInputChange}
            required
            className="p-2 border rounded"
          >
            <option value="">Select a service</option>
            {allServices.map((service: any) => (
              <option value={service._id} key={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-1 font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={slotData.date}
            min={today}
            onChange={handleInputChange}
            required
            className="p-2 border rounded"
          />
        </div>

        {/* Start Time Selection */}
        <div className="flex flex-col">
          <label htmlFor="startTime" className="mb-1 font-medium">
            Start Time
          </label>
          <select
            id="startTime"
            name="startTime"
            value={slotData.startTime}
            onChange={handleInputChange}
            required
            className="p-2 border rounded"
          >
            <option value="">Select start time</option>
            {hours.map((time) => (
              <option value={time} key={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* End Time Selection */}
        <div className="flex flex-col">
          <label htmlFor="endTime" className="mb-1 font-medium">
            End Time
          </label>
          <select
            id="endTime"
            name="endTime"
            value={slotData.endTime}
            onChange={handleInputChange}
            required
            className="p-2 border rounded"
          >
            <option value="">Select end time</option>
            {hours.map((time) => (
              <option value={time} key={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition duration-200"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
};

export default CreateSlot;
