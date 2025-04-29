import { FaComment } from 'react-icons/fa';
import useAnnouncement from '../../hooks/useAnnouncement';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

const Notification = () => {
  const [announcements] = useAnnouncement();
  const { theme } = useAuth();

  return (
    <>
      <Helmet>
        <title>Thread Hive | Notification</title>
      </Helmet>
      <div className="p-4  rounded-lg shadow-lg container mx-auto">
        <div className="flex items-center mb-6">
          <FaComment className="text-pink-500 text-3xl mr-2" />
          <h1 className="text-3xl font-extrabold ">Notifications</h1>
        </div>
        {announcements.length === 0 ? (
          <p className="text-gray-500 italic">
            No announcements available at the moment.
          </p>
        ) : (
          <ul className="space-y-6">
            {announcements.map((announcement, index) => (
              <li
                key={index}
                className={`p-5 rounded-lg shadow-md border ${
                  theme === 'dark' ? 'border-gray-700' : ''
                }  flex items-start space-x-4 transition transform hover:scale-100 hover:shadow-lg`}
              >
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={announcement.authorImage}
                    alt="Author"
                    className="w-full h-full rounded-full object-cover border "
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold  mb-2">
                    {announcement.title}
                  </h2>
                  <p className="text-gray-400">{announcement.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notification;
