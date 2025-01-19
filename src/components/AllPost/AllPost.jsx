import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Post from './Post';

const AllPost = () => {
  const axiosPublic = useAxiosPublic();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axiosPublic.get('/posts').then(res => {
      setAllPosts(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto">
      {allPosts.map(post => (
        <Post key={post._id} post={post}></Post>
      ))}
    </div>
  );
};

export default AllPost;
