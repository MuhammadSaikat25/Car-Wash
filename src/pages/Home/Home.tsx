import React from "react";
import Banner from "../../components/Home/Banner";
import Faq from "../../components/Home/Faq";
import FeaturedService from "../../components/Home/FeaturedService";

import Review from "../../components/Home/Review";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <section>
        <Banner />
      </section>
      <Faq />
      <FeaturedService />
      <Review />
      <div className="text-white text-center bg-blue-600 w-[30%] p-1 rounded-sm mx-auto mb-4">
        <Link to={"/all-reviews"}>See All Reviews</Link>
      </div>
    </div>
  );
};

export default Home;
