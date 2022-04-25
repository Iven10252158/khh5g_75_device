<template>
  <div class="allPage">
    <NewSticker/>
    <div class="muteBtn pointer" @click="mute"></div>
      <div class="d-flex">
          <div class="media_L">
            <img v-show="isLoading" class="loading" src="~@/assets/load.gif" alt="">
            <div v-show="media_L_showImage" class="video-image outer bg-cover" :style="{backgroundImage:'url(' +media_L_image+ ')'}"></div>
            <div v-show="!media_L_showImage" class="video">
              <YoutubeVue3 ref="youtube" style="display:block" :videoid="media_L_video" :width="width" :height="height" @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
            </div>
            <div class="cover-div"></div>
          </div>
          <div class="media_S">
            <div>
              <MediaS/>
            </div>
            <div>
              <TimeTable/>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { connectSocket } from '../configs/websocket'
import YoutubeVue3 from '@/components/YoutubeVue3.vue'
import NewSticker from '@/components/NewSticker.vue'
import MediaS from '@/components/MediaS.vue'
import TimeTable from '@/components/TimeTable.vue'
export default {
  components: {
    YoutubeVue3,
    NewSticker,
    MediaS,
    TimeTable
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      media_L_showImage: true,
      isMute: true,
      isLoading: true
    }
  },
  watch: {
    media_L_image () {
      if (this.media_L_image) {
        this.media_L_showImage = true
        this.isLoading = false
      }
    },
    media_L_video () {
      if (this.media_L_video) {
        this.media_L_showImage = false
        this.isLoading = false
      }
    }
  },
  computed: {
    media_L_image () {
      return this.$store.getters['ws/media_L_image']
    },
    media_L_video () {
      return this.$store.getters['ws/media_L_video']
    }
  },
  methods: {
    getPageID () {
      this.$http.get(`${process.env.VUE_APP_URL}/template/${this.$route.query.uuid}`)
        .then(res => {
          // console.log('res', res.data.contents)
          res.data.contents.forEach(item => {
            if (item.name === 'mediaS') {
              this.mediaS_ID = item.uuid
            } else if (item.name === 'mediaL') {
              this.mediaL_ID = item.uuid
            } else {
              this.newStickerID = item.uuid
            }
          })
          this.$store.dispatch('ws/handData', res.data)
          connectSocket(res.data.uuid)
          this.$refs.youtube.player.mute()
        })
    },
    mute () {
      if (this.isMute) {
        this.isMute = false
        this.$refs.youtube.player.unMute()
        this.$swal({ icon: 'success', title: '音訊開啟' })
      } else {
        this.isMute = true
        this.$refs.youtube.player.mute()
        this.$swal({ icon: 'warning', title: '音訊關閉' })
      }
    },
    onPlayed () {
      console.log('## OnPlayed')
    },
    onEnded () {
      this.$refs.youtube.player.seekTo(0)
      console.log('## OnEnded')
    },
    onPaused () {
      console.log('## OnPaused')
    }
  },
  mounted () {
    this.getPageID()
  }
}
</script>
<style lang="scss" scoped>
.bg-cover{
  background-size: cover;
  background-repeat:no-repeat ;
  background-position: center center;
}

.media_L{
  width: 77.917%;
  height: 88.9vh;
  position: relative;
  .video{
  width: 100%;
  height: 88.9vh;
  position: absolute;
  z-index: 1;
}
  .cover-div {
    width: 100%;
    height: 88.9vh;
    position: absolute;
    z-index: 2;
    background-color: #fa0;
    opacity: 0;
  }
}

.outer{
  width: 100%;
  height: 88.9vh;
  .video-image{
    height: 88.9vh;
  }
}

.media_S{
  width: 22.083%;
}
.loading{
  width: 120px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media(max-width:1920px) {
    width: 80px;
    height: 80px;
  }
}
.muteBtn{
  width: 165px;
  height: 240px;
  background-color: #000;
  position: absolute;
  top: 0;
  opacity: 0;
  @media (max-width:1920px) {
    width: 85px;
    height: 120px;
  }
}
.pointer{
  cursor: pointer;
}

</style>
