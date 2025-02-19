import { useState } from 'react';
import AllPost from '../../components/AllPost/AllPost';
import { Helmet } from 'react-helmet-async';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);

  return (
    <div>
      <Helmet>
        <title>Thread Hive | Posts</title>
      </Helmet>
      <AllPost allPosts={allPosts} setAllPosts={setAllPosts}></AllPost>
    </div>
  );
};

export default Posts;
