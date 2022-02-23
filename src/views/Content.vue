<template>
  <div class="allPage">
    <NewSticker/>
      <div class="d-flex">
          <div class="media_L">
            <div v-show="media_L_showImage" class="video-image bg-cover" :style="{backgroundImage:'url(' +media_L_image+ ')'}"></div>
            <div v-show="!media_L_showImage" class="video">
              <iframe class="liveVideo" ref="liveVideo"
                  style='width:100%; display:block'
                  :src="media_L_video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
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
import NewSticker from '@/components/NewSticker.vue'
import MediaS from '@/components/MediaS.vue'
import TimeTable from '@/components/TimeTable.vue'
export default {
  components: {
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
      media_L_showImage: true
    }
  },
  watch: {
    media_L_image () {
      console.log('content', this.$store.getters['ws/media_L_image'])
      this.media_L_showImage = true
    },
    media_L_video () {
      console.log('content', this.$store.getters['ws/media_L_video'])
      this.media_L_showImage = false
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
      this.$http.get(`http://20.106.156.149:8080/template/${this.$route.query.uuid}`)
        .then(res => {
          this.$store.dispatch('ws/handData', res.data)
          connectSocket(res.data.uuid)
        })
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
.video iframe{
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
