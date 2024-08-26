import Banner from "../../components/Home/Banner";
import Faq from "../../components/Home/Faq";
import Service from "../../components/Home/services/Service";

const Home = () => {
  return (
    <div className="relative">
      <section>
        <Banner />
      </section>
      <Faq />
      <Service/>
    </div>
  );
};

export default Home;
