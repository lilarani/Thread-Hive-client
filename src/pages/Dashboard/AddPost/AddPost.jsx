import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showMembershipButton, setShowMembershipButton] = useState(false);
  let [addMyPost, setAddMyPost] = useState(false);

  const [formData, setFormData] = useState({
    userName: user?.displayName,
    userEmail: user?.email,
    authorImage: '',
    authorName: '',
    authorEmail: '',
    title: '',
    description: '',
    tag: '',
    upVote: 0,
    downVote: 0,
    date: new Date(),
  });

  // handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post('/posts', formData);
      setAddMyPost(!addMyPost);
      if (response?.data?.result?.insertedId) {
        e.target.reset();
        Swal.fire({
          title: 'Success!',
          text: 'Post Added Successfully',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Post could not be added. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  // The handleChange function is called whenever there is a change in the input field.
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // It sends a secure GET request to the `/my-post` endpoint with the user's email as a query parameter.
  useEffect(() => {
    axiosSecure
      .get(`/my-post`, { params: { userEmail: user?.email } })
      .then(res => {
        if (res.data && (res.data?.membership || res.data?.postCount < 5)) {
          setShowForm(true);
          setShowMembershipButton(false);
        } else {
          setShowForm(false);
          setShowMembershipButton(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [addMyPost]);

  // fetch the tags
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axiosSecure.get('/tags');
      return response.data || [];
    },
  });

  return (
    <div className="lg:w-3/4 mx-auto">
      <div className="text-center p-10">
        <h1 className="text-5xl font-bold">Create Your Story</h1>
        <p className="py-6">
          Share your thoughts, stories, or updates with the world. Whether it's
          a personal experience, an exciting announcement, or a creative idea,
          let your voice be heard and inspire others.
        </p>
      </div>
      {showForm && (
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            {/* form first row */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Author Image</span>
                </label>
                <input
                  type="url"
                  name="authorImage"
                  onChange={handleChange}
                  placeholder="Author Image"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Author Name</span>
                </label>
                <input
                  type="text"
                  name="authorName"
                  onChange={handleChange}
                  placeholder="Author Name"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* form second row */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Author Email</span>
                </label>
                <input
                  type="email"
                  name="authorEmail"
                  onChange={handleChange}
                  placeholder="Author Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Post Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Post Title"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            {/* tags */}
            <div className="form-control flex-1 ">
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              {isLoading ? (
                <p>Loading tags...</p>
              ) : isError ? (
                <p>Error loading tags</p>
              ) : (
                <select
                  name="tag"
                  onChange={handleChange}
                  className="select select-bordered w-full "
                >
                  <option disabled value="">
                    Select a Relevant Technology Tag
                  </option>
                  {tags?.map(tag => (
                    <option className="bg-pink-50" key={tag._id}>
                      {tag.tagName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* form third row */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Post Description</span>
                </label>
                <textarea
                  rows={'4'}
                  type="text"
                  name="description"
                  onChange={handleChange}
                  placeholder="Write..."
                  className="textarea textarea-bordered"
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="bg-bgButton px-4 py-1 font-semibold ">
                Add Post
              </button>
            </div>
          </form>
        </div>
      )}
      {showMembershipButton && (
        <Link
          to={'/membership'}
          className="px-4 py-2 bg-bgButton font-semibold text-base"
        >
          Become a MemberShip
        </Link>
      )}
    </div>
  );
};

export default AddPost;
