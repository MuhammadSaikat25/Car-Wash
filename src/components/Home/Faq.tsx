import { useEffect, useState } from "react";
import car from "../../assets/car-after-before.png";
import "./car.css";

const FaqUi = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [visibleQuestionIndex, setVisibleQuestionIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("faq.json");
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleAnswerVisibility = (index: number) => {
    setVisibleQuestionIndex(visibleQuestionIndex === index ? null : index);
  };

  return (
    <div className="bg-[#e6e6eb] ">
      <h1 className="text-center font-semibold text-3xl text-gray-950 py-10">
        Have Any Questions?
      </h1>
      <div className="p-4 md:flex items-center justify-center mx-auto gap-x-20">
        <div className="car-animation lg:w-[400px]">
          <img className="" src={car} alt="Car" />
        </div>
        <div className="w-full md:w-[80%] lg:w-[40%]">
          {faqs?.map((faq, index) => (
            <div className="w-full" key={index}>
              <div
                onClick={() => toggleAnswerVisibility(index)}
                className="flex mb-1 items-center bg-[#FFFFFF] rounded justify-between cursor-pointer gap-1 shadow-b shadow-blue-200 p-4 "
              >
                <h1>{faq.question}</h1>
                <span>{visibleQuestionIndex === index ? "-" : "+"}</span>
              </div>
              {visibleQuestionIndex === index && (
                <div className="mt-1 mb-1">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqUi;
