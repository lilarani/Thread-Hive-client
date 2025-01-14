import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const SignUp = () => {
  const { createNewUser, updateUserProfile, setUser } = useAuth();
  const handleSignUp = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    console.log(name, email, password, photo);

    createNewUser(email, password)
      .then(result => {
        setUser(result.user);
        updateUserProfile({
          displayName: name,
          photoURL: photo,
        }).then(() => {
          toast.success(`Registration Successfully`);
        });
      })
      .catch(error => {
        toast.error(`Failed to create user ${error.message}`);
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
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
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
                name="email"
                placeholder="enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo-URL</span>
              </label>
              <input
                type="url"
                name="photo"
                placeholder="photo-url"
                className="input input-bordered"
                required
              />
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
