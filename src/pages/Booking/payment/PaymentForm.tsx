import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";

import { RootState } from "../../../redux/store";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useCrateOrderMutation } from "../../../redux/feature/booking/bookingApi";
import { useGetAllUserQuery } from "../../../redux/feature/auth/authApi";

type Props = {
  course: any;
};

const PaymentForm = ({ course }: Props) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { refetch } = useGetAllUserQuery(undefined);
  const [message, setMessage] = useState<any>();
  const [crateOrder, { data: orderData, error }] = useCrateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);

  const paymentInfo = {
    serviceId: course?.serviceId,
    slotId: course?.bookingTime.map((slot: any) => slot._id),
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded" && user) {
      setIsLoading(false);
      toast.success("Slot booking  successful");
      // navigate("/my-class");
      crateOrder({
        courseId: course?.serviceId!,
        paymentInfo,
      });
      refetch();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      if ("data" in error) {
        const err = error as any;
        setMessage(err.data.message);
      }
    }
  }, [orderData, error]);
console.log(orderData)
  return (
    <div className="text-black">
      <Toaster />
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              <p className="bg-red-500 px-3 rounded-3xl text-white mt-2">
                Pay now
              </p>
            )}
          </span>
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
