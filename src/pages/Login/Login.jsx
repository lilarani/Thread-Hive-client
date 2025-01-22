import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { userLogin, googleSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Sign-in function
  const onSubmit = data => {
    const { email, password } = data;

    userLogin(email, password)
      .then(result => {
        toast.success(`Login Successfully`);
        navigate('/');
      })
      .catch(error => {
        toast.error(`Failed Login`);
      });
  };

  // Google Sign-in function
  const handleGoogleSignIn = () => {
    googleSignIn().then(res => {
      navigate('/');
    });
  };

  return (
    <div className="hero min-h-screen container mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="input input-bordered"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>

            {/* Submit Button */}
            <div className="form-control">
              <button className="text-base font-semibold px-4 py-1 bg-bgButton text-white text-center">
                Sign-in
              </button>
            </div>

            {/* Google Login */}
            <p
              onClick={handleGoogleSignIn}
              className="text-base font-semibold px-4 py-1 border-border border-[1px] text-center cursor-pointer"
            >
              Login with Google
            </p>

            {/* Sign-up Link */}
            <Link className="text-sm " to={'/signUp'}>
              Don't Have an Account?
              <span className="text-blue-500 ml-2 underline">Sign-up</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
