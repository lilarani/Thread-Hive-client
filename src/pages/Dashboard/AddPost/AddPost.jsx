import { useState } from 'react';

const AddPost = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    title: '',
    description: '',
    tag: '',
    upVote: 0,
    downVote: 0,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <div className="text-center p-10">
        <h1 className="text-5xl font-bold">Add Post</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in.Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
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
                name="image"
                value={formData.image}
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
                name="name"
                value={formData.name}
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
                name="email"
                value={formData.email}
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
                value={formData.title}
                onChange={handleChange}
                placeholder="Post Title"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* form third row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Post Description</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Post Description"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value={''}>
                  Select a Relevant Technology Tag
                </option>
                <option>HTML</option>
                <option>CSS</option>
                <option>React</option>
                <option>javascript</option>
                <option>Tailwind</option>
                <option>MongoDB</option>
                <option>Express</option>
                <option>Others</option>
              </select>
            </div>
          </div>

          {/* form 4th row */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">UpVote</span>
              </label>
              <input
                type="text"
                name="upVote"
                value={formData.upVote}
                onChange={handleChange}
                placeholder="UpVote"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">DownVote</span>
              </label>
              <input
                type="text"
                name="downVote"
                value={formData.downVote}
                onChange={handleChange}
                placeholder="DownVote "
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="bg-bgButton px-4 py-1 font-semibold ">
              Add Coffee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
