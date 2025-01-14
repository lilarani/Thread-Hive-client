import img1 from '../../assets/Images/baner1.png';
import img2 from '../../assets/Images/banner2.png';
import img3 from '../../assets/Images/banner3.png';
import img4 from '../../assets/Images/banner4.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full h-96 object-cover" src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-96 object-cover" src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-96 object-cover" src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full h-96 object-cover" src={img1} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
