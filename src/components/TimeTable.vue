<template>
    <swiper class="mySwiper"
    :loop="true"
    :autoplay='{ "delay": 2500, "disableOnInteraction": false }' >
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
  background-size: contain;
  background-repeat:no-repeat ;
  background-position: center center;
}
.wrap{
  border-right: 2px solid;
  border-left: 2px solid;
  width: 100%;
  .workingDay{
    background-image: url('~@/assets/輕軌時刻表_平日.png');
    width: 100%;
    height: 50vh;
  }
  .holiday{
      background-image: url('~@/assets/輕軌時刻表_平日.png');
      height: 50vh;

  }
}

</style>
