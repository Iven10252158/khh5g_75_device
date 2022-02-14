const state = {
  newStickerID: '',
  mediaLID: '',
  mediaSID: '',
  newSticker: '',
  video: {
    src: ''
  },
  image: '',
  isLoading: false
}

const mutations = {
  open (state) {
    console.log('open mutations')
  },
  setWsRes (state, payload) {
    console.log(payload)
    if (payload.uuid) {
      payload.contents.forEach(item => {
        switch (item.name) {
          case 'newsticker' :
            state.newStickerID = item.uuid
            if (state.newStickerID) {
              console.log('newSticker', state.newStickerID)
            }
            break
          case 'mediaS' :
            state.mediaSID = item.uuid
            if (state.mediaSID) {
              console.log('mediaSID', state.mediaSID)
            }
            break
          case 'mediaL' :
            state.mediaLID = item.uuid
            if (state.mediaSID) {
              console.log('mediaLID', state.mediaLID)
            }
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

  loading ({ commit }) {
    commit('loadingState')
  }
}

const getters = {
  newSticker (state) {
    return state.newSticker
  },
  video (state) {
    return state.video.src
  },
  image (state) {
    return state.image
  },
  loading (state) {
    return state.isLoading
  },
  initID (state) {
    return state.initID
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
