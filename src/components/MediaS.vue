<template>
<div class="wrap">
    <div v-show="media_S_showImage" class="bg-cover media_s_picture" :style="{backgroundImage:'url(' + media_S_image + ')'}"></div>
    <div v-show="!media_S_showImage" class="video">
      <iframe class="liveVideo" ref="liveVideo"
          style='width:100%; height:42vh; display:block'
          :src="media_S_video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
      </iframe>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      media_S_showImage: true
    }
  },
  watch: {
    media_S_image () {
      this.media_S_showImage = true
    },
    media_S_video () {
      this.media_S_showImage = false
    }
  },
  computed: {
    media_S_image () {
      return this.$store.getters['ws/media_S_image']
    },
    media_S_video () {
      return this.$store.getters['ws/media_S_video']
    }
  }
}
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        .media_s_picture{
          height: 42.8vh;
        }
    }
    .bg-cover{
        background-size: cover;
        background-repeat:no-repeat ;
        background-position: center center;
    }
</style>
