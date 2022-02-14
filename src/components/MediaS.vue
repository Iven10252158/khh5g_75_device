<template>
<div class="wrap">
    <div class="bg-cover" :style="{backgroundImage:'url(' +image+ ')'}"></div>
    <!-- <div class="parent">
        <img class="tvWall img-fluid" :src="image" alt="">
    </div> -->
</div>
</template>
<script>
export default {
  computed: {
    image () {
      return this.$store.getters['ws/image']
    }
  }
}
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
    }
    .bg-cover{
        background-size: cover;
        background-position: center center;
        padding-top: 75%;
    }
</style>
