import { useState } from 'react';
import AllPost from '../../components/AllPost/AllPost';
import Banner from '../../components/Banner/Banner';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  return (
    <div>
      <Banner setAllPosts={setAllPosts}></Banner>
      <AllPost allPosts={allPosts} setAllPosts={setAllPosts}></AllPost>
    </div>
  );
};

export default Home;
