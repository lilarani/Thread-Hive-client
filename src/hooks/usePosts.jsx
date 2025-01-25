import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const usePosts = () => {
  const axiosSecure = useAxiosSecure();
  const { data: posts = [], refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = axiosSecure.get('/my-post');
      console.log(res.data);
      return res.data;
    },
  });
  return [posts, refetch];
};

export default usePosts;
