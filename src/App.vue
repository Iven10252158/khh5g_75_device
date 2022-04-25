<template>
  <div class="dark">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.dark{
    background-color: #000;
    height: 100vh;
    user-select: none;
  }
  @import "./assets/all";
</style>
