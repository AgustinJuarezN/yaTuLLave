import realState from '../../api/realState'

// initial state
const state = {
  all: [],
  neighborhoods:[],
  types: [],
  modes: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllPropertys ({ commit }) {
    realState.getPropertys(propertys => {
      commit('setPropertys', propertys)
    })
  },
  getAllNeighborhood ({ commit }) {
    realState.getNeighborhood(neighborhoods => {
      commit('setNeighborhood', neighborhoods)
    })
  },
  getAllTypes ({ commit }) {
    realState.getAllTypes(types => {
      commit('setTypes',types)
    })
  },
  getAllModes({ commit }) {
    realState.getAllModes(modes => {
      commit('setModes',modes)
    })
  }
}

// mutations
const mutations = {
  setPropertys (state, propertys) {
    state.all = propertys
  },
  setNeighborhood (state, neighborhoods) {
    state.neighborhoods = neighborhoods
  },
  setTypes (state, types) {
    state.types = types
  },
  setModes (state, modes) {
    state.modes = modes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}