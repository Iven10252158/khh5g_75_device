<script>
export default {
  methods: {
    templateAPI () {
      this.$router.push({ path: 'content', query: { uuid: `${process.env.VUE_APP_UUID}` } })
    }
  },
  mounted () {
    console.log(process.env.VUE_APP_UUID)
    this.templateAPI()
  }
}
// 0dd1faf5-7bae-4714-8926-7387091f5f68
// 5fe69ddb-43f1-40f5-82a3-01af0e59556d
</script>
