export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }

      ]
    }
  },
  mutations: {
    REGISTER_COACH(state, payload) {
      state.coaches.push(payload)
      console.log(payload)
    }
  },
  actions: {
    register(context, data) {
      console.log(context);
      const coachData = {
        id: context.rootGetters.userId,
        // id: new Date().toISOString(),
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        areas: data.areas,
        hourlyRate: data.rate
      }

      fetch('https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')
      context.commit('REGISTER_COACH', coachData)
    }
  },
  getters: {
    coaches(state) {
      return state.coaches
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0
    },
    isCoach(_state, getters, _rootState ,rootGetters) {
      const coaches = getters.coaches
      const userId = rootGetters.userId
      return coaches.some(coach => coach.id === userId)
    }
  }
}