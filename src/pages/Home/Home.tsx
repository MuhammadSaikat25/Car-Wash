import Banner from "../../components/Home/Banner";
import Faq from "../../components/Home/Faq";
import FeaturedService from "../../components/Home/FeaturedService";

const Home = () => {
  return (
    <div className="relative">
      <section>
        <Banner />
      </section>
      <Faq />
      <FeaturedService />
     
    </div>
  );
};

export default Home;
