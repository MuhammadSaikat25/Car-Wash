import { Link, useNavigate } from "react-router-dom";
import car from "../../assets/car-after-before.png";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useSing_upMutation } from "../../redux/feature/auth/authApi";

const SingUp = () => {
  const [sing_up, { data }] = useSing_upMutation(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, steErrorMessage] = useState("");
  const navigate=useNavigate()
  const handelSineUp = async (e: any) => {
    e.preventDefault();
    const res = await sing_up({
      email,
      password,
      name,
      phone,
      address,
      role: "user",
    });
    if (res?.error) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message: string };
        steErrorMessage(errorData.message);
        return;
      } else {
        steErrorMessage("");
        console.log("An unexpected error occurred:", res.error);
      }
    } else {
      steErrorMessage("");
    }
    navigate('/sing-in')
  };
  return (
    <div className="relative">
      <div className=" hidden md:block md:w-[27%] lg:w-[35%] bg-[#B4E380] h-screen"></div>

      <div className="h-screen w-full md:absolute lg:left-[10%] md:top-[15%] z-50 md:h-[50%] lg:h-[70%] bg-white md:w-[90%] lg:w-[80%] shadow-2xl shadow-black">
        <div className="bg-[#B4E380] w-full  md:w-[30%] lg:w-[31.2%] h-full">
          <img className="w-full h-full object-contain" src={car} alt="" />
        </div>

        <div className="absolute lg:top-2 lg:left-[35%] lg:w-[50%] bg-gray-700 bg-opacity-30 top-[25%] md:left-[30%] md:top-[10%] left-[10%] md:bg-white p-10 rounded lg:p-0 ">
          <div className="flex items-center gap-2">
            <h1 className="lg:text-4xl font-semibold text-gray-600">
              Login to
            </h1>
            <img src={logo} alt="" />
          </div>
          {/* ------------------ Form ------------- */}
          <div className="w-full lg:my-20">
            <form onSubmit={handelSineUp}>
              <div className="flex flex-col gap-y-3 mb-2">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-600 px-4 py-1 rounded-full w-full"
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-600 px-4 py-1 rounded-full w-full"
                  placeholder="Password"
                />
                <input
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-gray-600 px-4 py-1 rounded-full w-full"
                  placeholder="Phone "
                />
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-600 px-4 py-1 rounded-full w-full"
                  placeholder="Name"
                />
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-600 px-4 py-1 rounded-full w-full"
                  placeholder="Address"
                />
              </div>

              <button className="bg-blue-500 duration-300 hover:bg-blue-950 text-white px-4 py-1 rounded-full w-full">
                Sing in
              </button>
              <div className="flex items-center gap-x-1 justify-between">
                <h1 className="text-red-400 font-semibold">{errorMessage}</h1>
                <div className="flex items-center gap-1">
                  <h1 className="text-gray-900 font-semibold">
                    Already have an account
                  </h1>
                  <Link className="text-blue-500 font-semibold" to={"/sing-in"}>
                    Sing in
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
