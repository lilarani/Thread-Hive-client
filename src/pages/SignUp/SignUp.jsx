import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import animation from '../../../public/logoutLottie.json';
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  const { createNewUser, updateUserProfile, setUser, googleSignIn, theme } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = () => {
    googleSignIn().then(result => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosSecure.post('/users', userInfo).then(res => {
        toast.success(`User Created Successfully`);
        navigate('/');
      });
    });
  };

  const onSubmit = data =>
    createNewUser(data.email, data.password).then(result => {
      setUser(result.user);
      updateUserProfile(data.name, data.photo)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            userPhoto: result.user?.photoURL,
            role: 'user',
            badge: 'https://i.ibb.co.com/0n6zJZ7/bronze.jpg',
            membership: false,
            status: 'Inactive',
          };
          axiosSecure.post('/users', userInfo).then(res => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User Created Successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/');
            }
          });
        })
        .catch(error => {
          toast.error(`Failed to create user ${error.message}`);
        });
    });

  return (
    <div className="hero min-h-screen container mx-auto">
      <Helmet>
        <title>Thread Hive | Sign-up</title>
      </Helmet>

      <div className="hero-content flex-col lg:flex-row-reverse gap-6">
        <div className="text-center lg:text-left">
          <h1 className="text-base md:text-2xl font-bold">Sign-up now!</h1>
          <Lottie animationData={animation}></Lottie>
        </div>
        <div
          className={`card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl `}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label ">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register('name', { required: true })}
                type="text"
                name="name"
                placeholder="enter your name"
                className="input input-bordered text-black"
                required
              />
              {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register('email', {
                  required: true,
                })}
                type="email"
                name="email"
                placeholder="enter your email"
                className="input input-bordered text-black"
                required
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="top-12 right-2 absolute"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*])/,
                })}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="password"
                className="input input-bordered text-black"
                required
              />
              {errors.password?.type === 'required' && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === 'maxLength' && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === 'pattern' && (
                <p className="text-red-600">
                  Password must have one uppercase , one lower case, one number
                  and one special characters.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo-URL</span>
              </label>
              <input
                type="url"
                {...register('photo', { required: true })}
                name="photo"
                placeholder="photo-url"
                className="input input-bordered text-black"
                required
              />
              {errors.photo && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div className="form-control ">
              <button className="text-base font-semibold px-4 py-1 bg-bgButton text-white text-center">
                Sign-up
              </button>

              <p
                onClick={handleGoogleSignIn}
                className="text-base font-semibold px-4 py-1 border-border border-[1px] text-center mt-5"
              >
                Login with Google
              </p>
              <Link className="text-sm p-2" to={'/login'}>
                Dont't Have an Account?
                <span className="text-blue-500 ml-2 underline">Sign-in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
