import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Announcement = () => {
  const axiosSecure = useAxiosSecure();

  const handleAnnouncement = event => {
    event.preventDefault();
    const form = event.target;
    const authorImage = form.authorImage.value;
    const authorName = form.authorName.value;
    const title = form.title.value;
    const description = form.description.value;

    const announcement = { authorImage, authorName, title, description };

    axiosSecure.post('/announcements', announcement).then(res => {
      console.log(res.data);
      form.reset();
    });
  };

  return (
    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
      <form onSubmit={handleAnnouncement} className="card-body">
        {/* form first row */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Author Image</span>
            </label>
            <input
              type="url"
              name="authorImage"
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
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* form third row */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              rows={'4'}
              type="text"
              name="description"
              placeholder="Write..."
              className="textarea textarea-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="bg-bgButton px-4 py-1 font-semibold text-base">
            Make Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcement;
