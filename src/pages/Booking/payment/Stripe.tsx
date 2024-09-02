import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useGetSingleServiceQuery } from "../../../redux/feature/service/serviceApi";
import {
  useCratePaymentMutation,
  useGetStripePkQuery,
} from "../../../redux/feature/booking/bookingApi";

type Props = {
  bookingData: any;
};

const Stripe = ({ bookingData }: Props) => {
  const { data: stripePk } = useGetStripePkQuery(undefined);
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClintSecret] = useState("");

  const { data: course } = useGetSingleServiceQuery(bookingData.serviceId!, {
    skip: !bookingData,
  });
  const [cratePayment, { data: paymentData }] =
    useCratePaymentMutation();

  useEffect(() => {
    if (stripePk) {
      const pk = stripePk.pk;
      setStripePromise(loadStripe(pk));
    }
    if (course) {
      const amount = Math.round(course.data.price * 100);
      cratePayment({ amount });
    }
  }, [stripePk, course]);

  useEffect(() => {
    if (paymentData) {
      setClintSecret(paymentData.client_secret);
    }
  }, [paymentData]);
  
  return (
    <div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm course={bookingData} />
        </Elements>
      )}
    </div>
  );
};

export default Stripe;
