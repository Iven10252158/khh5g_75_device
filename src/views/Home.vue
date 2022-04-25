<script>
export default {
  methods: {
    templateAPI () {
      this.$router.push({ path: 'content', query: { uuid: `${process.env.VUE_APP_UUID}` } })
    }
  },
  mounted () {
    this.templateAPI()
  }
}
</script>
