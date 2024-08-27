import { Link, useNavigate } from "react-router-dom";
import car from "../../assets/car-after-before.png";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import decodeJwt from "../../utils/decodeJwt";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";

const SingIn = () => {
  const [email, setEmail] = useState("");
  const [login, { error, isLoading }] = useLoginMutation(undefined);
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, steErrorMessage] = useState("");

  const handelSingIn = async (e: any) => {
    e.preventDefault();
    const res = await login({ email, password });
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
    const jwt = !error && (await decodeJwt(res?.data?.data.jwtToken as string));
    dispatch(setUser({ user: jwt, token: res?.data?.token }));
    navigate("/");
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
            <form onSubmit={handelSingIn}>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-600 px-4 py-1 rounded-full w-full"
                placeholder="Email"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border my-7 border-gray-600 px-4 py-1 rounded-full w-full"
                placeholder="Password"
              />
              {isLoading ? (
                <p className="text-blue-400 font-semibold text-center">
                  loading...
                </p>
              ) : (
                <button className="bg-blue-500 duration-300 hover:bg-blue-950 text-white px-4 py-1 rounded-full w-full">
                  Sing in
                </button>
              )}
              <div className="flex items-center gap-x-1 justify-between">
                <h1 className="text-red-400 font-semibold">{errorMessage}</h1>
                <div className="flex items-center gap-1">
                  <h1 className="text-gray-900 font-semibold">New at Carspa</h1>
                  <Link className="text-blue-500 font-semibold" to={"/sing-up"}>
                    Sing up
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

export default SingIn;
