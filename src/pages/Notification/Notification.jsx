import { FaComment } from 'react-icons/fa';
import useAnnouncement from '../../hooks/useAnnouncement';

const Notification = () => {
  const [announcements] = useAnnouncement();

  return (
    <div className="p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <FaComment className="text-pink-500 text-3xl mr-2" />
        <h1 className="text-3xl font-extrabold text-gray-800">Notifications</h1>
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
              className="p-5 bg-pink-100 rounded-lg shadow-md border border-gray-300 flex items-start space-x-4 transition transform hover:scale-100 hover:shadow-lg"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={announcement.authorImage}
                  alt="Author"
                  className="w-full h-full rounded-full object-cover border border-pink-200"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {announcement.title}
                </h2>
                <p className="text-gray-600">{announcement.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
