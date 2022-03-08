<template>
  <div class="allPage">
    <NewSticker/>
      <div class="d-flex">
          <div class="media_L">
            <div v-show="media_L_showImage" class="video-image outer bg-cover" :style="{backgroundImage:'url(' +media_L_image+ ')'}"></div>
            <div v-show="!media_L_showImage" class="video">
              <YoutubeVue3 ref="youtube" :videoid="media_L_video" width="100%" height="100%"
              @ended="onEnded" @paused="onPaused" @played="onPlayed"/>
            </div>
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
import { YoutubeVue3 } from 'youtube-vue3'
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
    contentA: {
      type: Object,
      default () {
        return {
          uuid: ''
        }
      }
    }
  },
  data () {
    return {
      media_L_showImage: true,
      isMute: true
    }
  },
  watch: {
    media_L_image () {
      if (this.media_L_image) {
        this.media_L_showImage = true
        // this.isLoading = false
        console.log('watch, media_L_image', this.media_L_image, this.media_L_showImage)
      }
    },
    media_L_video () {
      if (this.media_L_video) {
        this.media_L_showImage = false
        // this.isLoading = false
        // this.playCurrentVideo()
        // if (this.isMute) {
        //   this.mute()
        // }
        console.log('watch, media_L_video', this.media_L_video, !this.media_L_showImage)
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
          console.log('res', res.data.contents)
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
          this.playCurrentVideo()
          // this.$refs.youtube.player.mute()
          this.isMute = true
        })
    },
    playCurrentVideo () {
      // console.log()
      this.$refs.youtube.player.playVideo()
      this.$refs.youtube.player.setVolume(50)
    },
    mute () {
      if (this.isMute) {
        this.isMute = false
        this.$refs.youtube.player.unMute()
      }
    },
    onPlayed () {
      // this.$refs.youtube.player.unMute()
      // this.$refs.youtube.player.getPlayerState().then(getPlayerState => {
      //   console.log(getPlayerState)
      // if (getPlayerState === 1) {
      // this.$refs.youtube.player.playVideo()
      // }
      // })
      console.log('## OnPlayed')
    },
    onEnded () {
      console.log('## OnEnded')
      this.$refs.youtube.player.seekTo(0)
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
.video{
  height: 88.9vh;
}

.media_L{
  width: 77.917%;
  height: 88.9vh;
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
</style>
