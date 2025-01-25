import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk);

const Membarship = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      {/* Membership Info */}
      <div className="bg-pink-100 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Become a Member!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Pay <span className="font-semibold text-gray-800">N taka/dollar</span>{' '}
          to become a Gold Member and unlock exclusive benefits!
        </p>

        {/* Benefits */}
        <ul className="mb-6 space-y-3">
          <li className="flex items-center text-gray-700">
            <i className="fa-solid fa-circle-check text-green-500 mr-3"></i>
            Post more than 5 posts
          </li>
          <li className="flex items-center text-gray-700">
            <i className="fa-solid fa-circle-check text-green-500 mr-3"></i>
            Earn a{' '}
            <span className="font-bold text-yellow-500 mx-1">Gold Badge</span>
          </li>
          <li className="flex items-center text-gray-700">
            <i className="fa-solid fa-circle-check text-green-500 mr-3"></i>
            Access exclusive content and features
          </li>
        </ul>

        {/* Payment Form */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Membarship;
