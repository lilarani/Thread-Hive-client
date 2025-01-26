import { useState } from 'react';
import AllPost from '../../components/AllPost/AllPost';
import Banner from '../../components/Banner/Banner';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  return (
    <>
      <Helmet>
        <title>Thread Hive | Home</title>
      </Helmet>
      <div>
        <Banner setAllPosts={setAllPosts}></Banner>

        <AllPost allPosts={allPosts} setAllPosts={setAllPosts}></AllPost>
      </div>
    </>
  );
};

export default Home;
