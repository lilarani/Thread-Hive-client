import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AuthProvider from '../../Providers/AuthProvider';
import moment from 'moment';
import { Link } from 'react-router-dom';

const TagsSection = () => {
  const axiosSecure = useAxiosSecure();
  const [allPosts, setAllPosts] = useState([]);
  const { theme } = useAuth();
  const [activeTag, setActiveTag] = useState(null);

  // fetch the tags
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axiosSecure.get('/tags');
      return response.data || [];
    },
  });

  // search
  const searchByTag = tagName => {
    setActiveTag(tagName);
    console.log(tagName);
    axiosSecure.get('/posts').then(res => {
      let posts = res.data;
      const filtered = posts.filter(post => post.tag === tagName);
      console.log('Filtered Posts:', filtered);
      setAllPosts(filtered);
    });
  };

  return (
    <div className="space-y-3 mt-4">
      <h1 className="text-center font-bold text-base md:text-3xl">
        Browse Popular Tags to Explore Posts
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {tags?.map(tag => (
          <div key={tag._id}>
            <button
              onClick={() => searchByTag(tag.tagName)}
              className={`px-4 py-2 ${
                activeTag === tag.tagName
                  ? 'bg-bgButton text-white'
                  : 'border-[1px] border-pink-500 text-pink-500'
              } text-black rounded-full hover:bg-pink-600 transition-all shadow-md text-lg`}
            >
              {tag.tagName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
