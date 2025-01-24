import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useComments = postId => {
  const axiosSecure = useAxiosSecure();

  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });

  return { comments, isLoading, isError, refetch };
};

export default useComments;
