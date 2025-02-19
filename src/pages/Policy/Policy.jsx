import useAuth from '../../hooks/useAuth';
import darkImg from '../../assets/Images/policyDark.png';
import { Helmet } from 'react-helmet-async';

const Policy = () => {
  const { theme } = useAuth();
  return (
    <>
      <Helmet>
        <title>Thread Hive | Policy</title>
      </Helmet>
      <div className="mt-14 container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-base md:text-3xl font-bold">
            OUR <span className="text-pink-500">Policy</span>
          </h2>
          <p
            className={`font-semibold text-base ${
              theme === 'dark' ? 'text-gray-400' : ''
            }`}
          >
            Welcome to our policy page. Here you can find all the necessary
            information regarding our terms and conditions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-20">
          <div>
            <p className="mb-4">
              We are committed to protecting your personal information and your
              right to privacy.
            </p>
            <h2 className="text-xl font-bold mb-3">Forum Rules</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">
                  Maintain Respect and Decency: <br />
                </span>
                Be respectful and polite to all users. No offensive or hateful
                speech.
              </li>
              <li>
                <span className="font-semibold">
                  No Illegal or Inappropriate Content: <br />
                </span>
                Do not share harmful, misleading, or offensive content.
              </li>
              <li>
                <span className="font-semibold">
                  Constructive Discussions Only: <br />
                </span>
                Keep discussions meaningful and relevant.
              </li>
              <li>
                <span className="font-semibold">
                  No Advertising or Self-Promotion: <br />
                </span>
                Unauthorized ads or business promotions are prohibited.
              </li>
              <li>
                <span className="font-semibold">Respect Privacy:</span> <br />
                Do not share personal or confidential information.
              </li>
              <li>
                <span className="font-semibold">
                  Admin Decisions are Final:
                </span>{' '}
                <br />
                Violations may result in post removal or account suspension.
              </li>
            </ul>
          </div>
          <div>
            <img className="w-96 h-96" src={darkImg} alt="Policy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
