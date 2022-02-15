<template>
  <div class="allPage">
    <NewSticker/>
    <div class="row g-0">
      <div class="d-flex">
        <div class="col-sm-9">
          <div class="outer">
            <div v-show="showImage" class="video-image bg-cover" :style="{backgroundImage:'url(' +media_L_image+ ')'}"></div>
            <div v-show="!showImage" class="video">
              <iframe class="liveVideo" ref="liveVideo"
                  style='width:100%; display:block'
                  :src="media_L_video"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div>
            <MediaS/>
          </div>
          <div>
            <TimeTable/>
          </div>
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
      showImage: false
    }
  },
  watch: {
    media_L_image () {
      this.showImage = true
    },
    media_L_video () {
      this.showImage = false
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
  height: 90vh;
}
.outer{
  width: 100%;
  height: 90vh;
  .video-image{
    height: 90vh;
  }
}
</style>
