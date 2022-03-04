<template>
    <div class="marquee">
        <div class="broadcast-box">
            <div class="broadcast text-center mb-0">
                <img src="~@/assets/svg/broadcast.svg" alt="">
            </div>
        </div>
        <div ref="billboard" class="billboard" >
            <h3 ref="text" class="text mb-0" :style="{left: textLeft + 'px'}">{{ messages }}</h3>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      text: '',
      textWidth: '',
      textLeft: 0
    }
  },
  watch: {
    messages () {
      this.$nextTick(() => {
        this.textWidth = this.$refs.text.offsetWidth // 文字寬度
      })

      if (this.$refs.billboard) {
        this.textLeft = this.$refs.billboard.offsetWidth
      }
    }
  },
  computed: {
    messages () {
      // console.log('computed', this.$store.getters['ws/newSticker'])
      const msg = this.$store.getters['ws/newSticker']
      // if (!this.msgList.includes(msg)) {
      //   this.msgList.push(msg)
      // }
      return msg
    }
  },
  mounted () {
    setInterval(() => {
      this.textLeft -= 1.2
      if (this.textLeft < this.textWidth * -1) {
        this.textLeft = this.$refs.billboard?.offsetWidth
      }
    }, 1)
  }
}
</script>
<style lang="scss" scoped>
.marquee{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000; //orange;
}
.broadcast-box{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 50px;
  @media(max-width:1920px) {
    margin: 0 25px;
  }
  .broadcast{
    img {
      width: 70px;
      height: 60px;
      @media(max-width:1920px) {
        width: 35px;
        height: 30px;
      }
    }
  }
}

.billboard{
  position: relative;
  width: 100%;
  height: 11.1vh;
  background-color: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .text{
    color: #FFDBAD;
    white-space: nowrap;
    font-size: 48px;
    font-weight: 700;
    font-family: Roboto;
    position: absolute;
    @media(max-width:1920px) {
      font-size: 24px;
    }
  }
}
</style>
