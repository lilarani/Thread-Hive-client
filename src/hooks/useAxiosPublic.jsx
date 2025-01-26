import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://thread-hive.web.app',
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
