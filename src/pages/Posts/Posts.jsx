import { useState } from 'react';
import AllPost from '../../components/AllPost/AllPost';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);

  return (
    <div>
      <AllPost allPosts={allPosts} setAllPosts={setAllPosts}></AllPost>
    </div>
  );
};

export default Posts;
