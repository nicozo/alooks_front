export const state = () => ({
  rooms: [],
  room: {}
})

export const getters = {
  rooms: state => state.rooms,
  room: state => state.room
}

export const mutations = {
  setRooms (state, rooms) {
    state.rooms = rooms
  },
  setRoom (state, room) {
    state.room = room
  },
  addRoom (state, room) {
    state.rooms = state.rooms.unshift(room)
  },
  editRoom (state, updatedRoom) {
    const index = state.rooms.find(room => room.id === updatedRoom.id)
    if (index !== -1) {
      state.rooms.splice(index, 1, updatedRoom)
    }
  },
  deleteRoom (state, deleteRoom) {
    state.rooms = state.rooms.filter(room => room.id !== deleteRoom.id)
  }
}

export const actions = {
  getRooms ({ commit }, res) {
    commit('setRooms', res)
  },
  getRoom ({ commit }, res) {
    commit('setRoom', res)
  },
  addRoom ({ commit }, res) {
    commit('addRoom', res)
  },
  updateRoom ({ commit }, res) {
    commit('editRoom', res)
  },
  deleteRoom ({ commit }, res) {
    commit('deleteRoom', res)
  }
}
