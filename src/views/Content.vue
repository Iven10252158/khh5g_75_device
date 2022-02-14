<template>
  <div class="allPage">
    <NewSticker/>
    <div class="row g-0">
      <div class="col-sm-9">
        <div v-show="showImage" class="video-image bg-cover" :style="{backgroundImage:'url(' +image+ ')'}"></div>
        <div v-show="!showImage" class="video">
          <iframe class="liveVideo" ref="liveVideo"
              style='width:100%; height:90vh; display:block'
              :src="youtubeSrc"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
      </div>
      <div class="col-sm-3">
        <MediaS/>
        <TimeTable/>
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
      showImage: false,
      contents: [],
      newStickerID: '',
      mediaLID: '',
      mediaSID: ''
    }
  },
  watch: {
    image () {
      this.showImage = true
    },
    youtubeSrc () {
      this.showImage = false
    }
  },
  computed: {
    youtubeSrc () {
      return this.$store.getters['ws/video']
    },
    image () {
      return this.$store.getters['ws/image']
    },
    loading () {
      return this.$store.getters['ws/loading']
    }
  },
  methods: {
    getPageID () {
      this.$http.get(`http://20.106.156.149:8080/template/${this.$route.query.uuid}`)
        .then(res => {
          console.log(res)
          this.$store.dispatch('ws/handWsRes', res.data)
          // this.contents = res.data.contents
          // console.log('res', res.data)
          // this.contents.forEach(content => {
          //   if (content.name === 'newsticker') {
          //     this.newStickerID = content.uuid
          //     console.log('newSticker', this.newStickerID)
          //   } else if (content.name === 'mediaL') {
          //     this.mediaLID = content.uuid
          //     console.log('mediaLID', this.mediaLID)
          //   } else {
          //     this.mediaSID = content.uuid
          //     console.log('mediaSID', this.mediaSID)
          //   }
          // })
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
  background-position: center center;
}
.video-image{
  height: 90vh;
}
</style>
