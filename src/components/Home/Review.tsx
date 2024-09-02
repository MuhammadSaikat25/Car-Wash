import img from "../../assets/review-thumb.png";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { usePostReviewMutation } from "../../redux/feature/review/reviewApi";


const Review = () => {
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [postReview] = usePostReviewMutation();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    event;
    setRatingValue(newValue);
  };
  const [text, setText] = useState("");
  const handelReview = async () => {
    const reviewData = {
      review: text,
      star: ratingValue,
      user: user!,
    };
    await postReview({ reviewData });
    setText("");
    setRatingValue(0);
  };
  
  return (
    <div className="flex items-center relative">
      <img className="hidden lg:block" src={img} alt="" />
      <div className="bg-slate-100 lg:w-[600px] mx-auto mb-2 p-5 rounded-md">
        <p>Leave Your Review</p>
        <textarea
          onChange={(e) => setText(e.target.value)}
          name=""
          id=""
          className="border border-gray-600 p-1 rounded-sm w-full"
        ></textarea>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            value={ratingValue}
            onChange={handleRatingChange}
          />

          <div>Selected Rating: {ratingValue}</div>
        </Stack>
        <button
          onClick={handelReview}
          className="text-white bg-blue-900 p-1 rounded-sm"
        >
          Send your review
        </button>
      </div>
     
    </div>
  );
};

export default Review;
