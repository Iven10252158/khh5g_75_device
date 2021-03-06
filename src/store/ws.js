const state = {
  newStickerID: '',
  mediaL_ID: '',
  mediaS_ID: '',
  newSticker: '', // 跑馬燈
  media_S: { // media_s的資料集
    image: '',
    src: ''
  },
  media_L: { // media_L的資料集
    image: '',
    src: ''
  },
  isLoading: false
}

const mutations = {
  open (state) {
    console.log('open mutations')
  },
  setWsRes (state, payload) {
    if (payload.id) {
      payload.content.forEach(item => {
        if (item.listID === state.mediaS_ID) {
          // console.log('media_s ID', state.mediaS_ID)
          switch (item.type) {
            case 'image' :
              state.media_S.image = item.content
              state.media_S.src = ''
              // console.log('media_s', state.media_S.image)
              break
            case 'video' :
              console.warn('video', item.content)
              // state.media_S.src = item.content.replace('\n', '')
              // state.media_S.image = ''
              state.media_S.src = `https://www.youtube.com/embed/${item.content.replace('\n', '')}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1}`
              // console.log('content', state.media_S.src)
              break
            case 'stream':
              // state.media_S.src = item.content.replace('\n', '')
              // state.media_S.image = ''
              state.media_S.src = `https://www.youtube.com/embed/${item.content.replace('\n', '')}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1}`
              // console.log('content', state.media_S.src)
              break
          }
        } else if (item.listID === state.newStickerID) {
          state.newSticker = item.content
          // console.log('newSticker', state.newSticker)
        } else {
          switch (item.type) {
            case 'image' :
              state.media_L.image = item.content
              state.media_L.src = ''
              // console.log('media_L', state.media_L.image)
              break
            case 'video' :
              state.media_L.src = item.content.replace('\n', '')
              state.media_L.image = ''
              // state.media_L.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${item.content}`
              // console.log('media_L', state.media_L.src)
              break
            case 'stream':
              state.media_L.src = item.content.replace('\n', '')
              state.media_L.image = ''
              // state.media_L.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${item.content}`
              // console.log('media_L', state.media_L.src)
              break
          }
        }
      })
    } else {
      if (payload.listID === state.mediaS_ID) {
        switch (payload.type) {
          case 'image' :
            state.media_S.image = payload.content
            state.media_S.src = ''
            // console.log('media_s', state.media_S.image)
            break
          case 'video' :
            // state.media_S.src = payload.content.replace('\n', '')
            state.media_S.image = ''
            state.media_S.src = `https://www.youtube.com/embed/${payload.content.replace('\n', '')}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1}`
            // console.log('content', state.media_S.src)
            break
          case 'stream':
            // state.media_S.src = payload.content.replace('\n', '')
            // const id = payload.content.replace('\n', '')
            state.media_S.image = ''
            state.media_S.src = `https://www.youtube.com/embed/${payload.content.replace('\n', '')}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1}`
            // https://www.youtube.com/embed/${payload.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${payload.content}
            // console.log('content', state.media_S.src)
            break
        }
      } else if (payload.listID === state.newStickerID) {
        state.newSticker = payload.content
      } else {
        switch (payload.type) {
          case 'image' :
            state.media_L.image = payload.content
            state.media_L.src = ''
            // console.log('media_L', state.media_L.image)
            break
          case 'video' :
            state.media_L.src = payload.content.replace('\n', '')
            state.media_L.image = ''
            // state.media_L.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${item.content}`
            // console.log('media_L', state.media_L.src)
            break
          case 'stream':
            state.media_L.src = payload.content.replace('\n', '')
            state.media_L.image = ''
            // state.media_L.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=0&loop=1&playlist=${item.content}`
            // console.log('media_L', state.media_L.src)
            break
        }
      }
    }
  },
  handData (state, payload) {
    if (payload.uuid) {
      payload.contents.forEach(item => {
        switch (item.name) {
          case 'newsticker' :
            state.newStickerID = item.uuid
            // console.log('newsticker', state.newStickerID)
            break
          case 'mediaS' :
            state.mediaS_ID = item.uuid
            // console.log('mediaS_ID', state.mediaS_ID)
            break
          case 'mediaL' :
            state.mediaL_ID = item.uuid
            // console.log('mediaL_ID', state.mediaL_ID)
            break
        }
      })
    }
  },
  loadingState (state) {
    state.isLoading = true
  }
}

const actions = {
  onOpen ({ commit }) {
    commit('open')
  },
  handWsRes ({ commit }, message) {
    commit('setWsRes', message)
  },
  handData ({ commit }, data) {
    commit('handData', data)
  },
  loading ({ commit }) {
    commit('loadingState')
  }
}

const getters = {
  newSticker (state) {
    return state.newSticker
  },
  media_S_image (state) {
    return state.media_S.image
  },
  media_S_video (state) {
    return state.media_S.src
  },
  media_L_image (state) {
    return state.media_L.image
  },
  media_L_video (state) {
    return state.media_L.src
  },
  loading (state) {
    return state.isLoading
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
