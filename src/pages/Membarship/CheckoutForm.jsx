import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.post('/create-payment-intent').then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });
    if (confirmError) {
      console.log('confirm error');
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
      }
    }
    //  now save the payment in the database
    const payment = {
      email: user.email,
      price: 200,
      transactionId: paymentIntent.id,
      date: new Date(),
    };
    const res = await axiosSecure.post('/successedPayment', payment);
    if (res.data?.insertedId) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Payment Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      axiosSecure.patch(`/successedPayment/${user.email}`).then(res => {
        // console.log(res.data);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </CardElement>
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="px-4 py-1 bg-bgButton font-semibold text-base mt-3 hover:bg-pink-600 hover:text-white transition-all duration-300"
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-500 mt-2 font-semibold">
          Your Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
