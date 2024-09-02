import { useEffect, useState } from "react";
import { useGetReviewsQuery } from "../redux/feature/review/reviewApi";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const AllReviews = () => {
  const { data } = useGetReviewsQuery(undefined);
  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setReviews(data.data);
    }
  }, [data]);

  return (
    <div className="pt-20">
      <p className="text-center my-2">What our client said</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews?.map((review: any, i: number) => (
          <div key={i} className="border border-gray-500 p-1 rounded">
            <h1>User: {review.user.name}</h1>
            <h1>Comment: {review.review}</h1>
            <Stack spacing={1}>
              <Rating name="read-only" value={review.star} readOnly />
            </Stack>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
