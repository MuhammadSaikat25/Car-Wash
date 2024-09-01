import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../redux/feature/auth/authApi";
import { toast, Toaster } from "react-hot-toast";
const UserProfile = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [updateProfile, { error }] = useUpdateProfileMutation();
  const { data: loginUser } = useGetMeQuery(user?.email);

  const [formData, setFormData] = useState({
    name: loginUser?.data?.name || "",
    email: loginUser?.data?.email || "",
    phone: loginUser?.data?.phone || "",
    address: loginUser?.data?.address || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData({
      name: loginUser?.data?.name,
      email: loginUser?.data?.email,
      phone: loginUser?.data?.phone,
      address: loginUser?.data?.address,
    });
  }, [loginUser]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile({ email: user?.email, data: formData });
    if (error === undefined) {
      toast.success("profile update successful");
    }
  };

  return (
    <div className="flex justify-center items-center w-full  h-screen">
      <Toaster />
      <form
        className="flex flex-col gap-2 w-[40%] mx-auto bg-stone-400 p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-1 rounded border-gray-950 w-full "
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          className="border p-1 rounded border-gray-950 w-full "
          placeholder="Email"
          readOnly
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border p-1 rounded border-gray-950 w-full "
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="border p-1 rounded border-gray-950 w-full "
          placeholder="Address"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full "
        >
          update profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
