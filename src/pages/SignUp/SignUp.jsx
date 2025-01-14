import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { user, createNewUser, updateUserProfile, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data =>
    createNewUser(data.email, data.password)
      .then(result => {
        setUser(result.user);
        updateUserProfile({
          displayName: data.name,
          photoURL: data.photo,
        }).then(() => {
          toast.success(`Registration Successfully`);
        });
      })
      .catch(error => {
        toast.error(`Failed to create user ${error.message}`);
      });

  return (
    <div className="hero min-h-screen container mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign-up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register('name', { required: true })}
                type="text"
                name="name"
                placeholder="enter your name"
                className="input input-bordered"
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
                className="input input-bordered"
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
                className="input input-bordered"
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
                className="input input-bordered"
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
