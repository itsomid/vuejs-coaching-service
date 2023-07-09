
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
      console.log('coaches', state.coaches)
    },
    SET_COACHES(state, payload) {
      state.coaches = payload
    }
  },
  actions: {
    async register(context, data) {
      const userId = context.rootGetters.userId;
      const coachData = {
        // id: new Date().toISOString(),
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        areas: data.areas,
        hourlyRate: data.rate
      }
      const response = await fetch(`https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coachData),
      });

      if (!response.ok) {
        //error
      }

      context.commit('REGISTER_COACH', {
        id: userId,
        ...coachData,
      })
    },
    async loadCoaches(context) {
      const response = await fetch('https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')
      const responseData = await response.json()
      const coaches = []
      for(const key in responseData) {
        const coachData = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          areas: responseData[key].areas,
          hourlyRate: responseData[key].hourlyRate
        }
        coaches.push(coachData)
      }
      context.commit('SET_COACHES', coaches)
      console.log(context.state);
    }
  },
  getters: {
    coaches(state) {
      return state.coaches
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0
    },
    isCoach(_state, getters, _rootState, rootGetters) {
      const coaches = getters.coaches
      const userId = rootGetters.userId
      return coaches.some(coach => coach.id === userId)
    }
  }
}