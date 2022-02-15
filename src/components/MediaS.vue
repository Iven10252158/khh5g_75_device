<template>
<div class="wrap">
    <div v-show="showImage" class="bg-cover media_s_picture" :style="{backgroundImage:'url(' +media_S.image+ ')'}"></div>
    <div v-show="!showImage" class="video">
      <iframe class="liveVideo" ref="liveVideo"
          style='width:100%; height:35vh; display:block'
          :src="media_S.src"
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
      showImage: true
    }
  },
  watch: {
    media_S () {
      this.showImage = !this.showImage
    }
  },
  computed: {
    media_S () {
      return this.$store.getters['ws/media_S']
    }
  }
}
</script>

<style lang="scss" scoped>
    .wrap{
        border: 2px solid;
        width: 100%;
        height: 40vh;
        .media_s_picture{
          // padding-top: 70%;
          height: 40vh;
        }
    }
    .bg-cover{
        background-size: contain;
        background-repeat:no-repeat ;
        background-position: center center;
    }
</style>
