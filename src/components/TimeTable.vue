<template>
    <swiper class="mySwiper"
    :loop="true"
    :autoplay='{ "delay": 2500, "disableOnInteraction": false }' >
        <swiper-slide>
          <div class="workingDay w-100 bg-cover"></div>
          <!-- <img class="img-fluid mb_0" src="~@/assets/輕軌時刻表_平日_5G.png" alt="輕軌時刻表_平日"> -->
        </swiper-slide>
        <swiper-slide>
          <div class="holiday w-100 bg-cover"></div>
          <!-- <img class="img-fluid mb_0" src="~@/assets/輕軌時刻表_假日_5G.png" alt="輕軌時刻表_假日"> -->
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
.mySwiper {
  display: flex;
}
.bg-cover{
    background-size: cover;
    background-position: center center;
}
.workingDay{
    background-image: url('~@/assets/輕軌時刻表_平日_5G.png');
    padding-top: 127.5%;
    margin-bottom: 0px;
}

.holiday{
    background-image: url('~@/assets/輕軌時刻表_假日_5G.png');
    padding-top: 127.5%;
    margin-bottom: 0px;
}
</style>
