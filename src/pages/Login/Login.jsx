import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="hero  min-h-screen container mx-auto">
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
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="enter your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>

            <div className="form-control">
              <button className="text-base font-semibold px-4 py-1 bg-bgButton text-white text-center">
                Sign-in
              </button>
            </div>
            <p className="text-base font-semibold px-4 py-1 border-border border-[1px] text-center">
              Login with Google
            </p>

            <Link className="text-sm " to={'/signUp'}>
              Dont't Have an Account?
              <span className="text-blue-500 ml-2 underline">Sign-up</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
