<template>
    <swiper class="mySwiper"
    :speed="800"
    :loop="true"
    :autoplay='{ "delay": 8000, "disableOnInteraction": false }' >
        <swiper-slide>
          <div class="wrap">
            <div class="workingDay bg-cover"></div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wrap">
            <div class="holiday bg-cover"></div>
          </div>
        </swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

// import Swiper core and required modules
import SwiperCore, {
  Navigation, Pagination, Autoplay, Thumbs
} from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {

    }
  }
}

</script>

<style lang="scss" scoped>
.bg-cover{
  background-size: cover;
  background-repeat:no-repeat ;
  background-position: center center;
}
.wrap{
    width: 100%;
  .workingDay{
    padding-top:10px ;
    background-image: url('~@/assets/images/輕軌時刻表_平日_5G.png');
    height: 46.1vh;

  }
  .holiday{
    padding-top:10px ;
    background-image: url('~@/assets/images/輕軌時刻表_假日_5G.png');
    height: 46.1vh;
  }
}

</style>
