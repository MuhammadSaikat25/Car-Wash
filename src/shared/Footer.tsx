import { Link } from "react-router-dom";
import bg from "../assets/footer-bg1-1.png";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { LuCopyright } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="w-full  p-10" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-wrap items-center justify-evenly">
        <div className="text-white">
          <p>Impotent Link</p>
          <section className="flex flex-col gap-y-1 mt-1">
            <Link to={"/"}>Home</Link>
            <Link to={"/service"}>Service</Link>
            <Link to={"/sing-in"}>Login</Link>
          </section>
        </div>
        <div className="text-white">
          <p>Contact Us</p>
          <section className="flex flex-col gap-y-1">
            <p>+(163)-1202-0088</p>
            <p>+(163)-1202-0099</p>
            <p>info@dealaro.com</p>
            <p>835 Middle Country Rd, NY 11784, USA</p>
          </section>
        </div>
        <div className="text-white">
          <p>Find Us On</p>
          <section className="flex flex-col gap-y-1">
            <p>
              <FaFacebookF />
            </p>
            <p>
              <FaInstagramSquare />
            </p>
            <p>
              <IoLogoYoutube />
            </p>
            <p>
              <FaSquareXTwitter />
            </p>
          </section>
        </div>
      </div>
      <div className="text-white my-2 flex flex-col gap-2 md:flex-row justify-around mt-4 items-center">
        <div className="flex items-center gap-1">
          <span>
            <LuCopyright />
          </span>
          <p>Copyright 2023 Dealaro. All Rights Reserved.</p>
        </div>
        <div className="flex items-center gap-x-3">
          <p> Terms of use |</p>
          <p>Privacy Environmental |</p>
          <p> Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
