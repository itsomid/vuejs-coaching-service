/* eslint-disable */
export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
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
    },
    SET_FETCH_TIME_STAMP(state){
      state.lastFetch = new Date().getTime()
    }
  },
  actions: {
    async register(context, data) {
      const userId = context.rootGetters['authStore/userId'];
      const coachData = {
        // id: new Date().toISOString(),
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        areas: data.areas,
        hourlyRate: data.rate
      }
    
      const token = context.rootGetters['authStore/token']
      // console.log(token,context);
    

      const response = await fetch(`https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=`+token, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coachData),
      });
      const responseData = await response.json()
      console.log(responseData);
      
      if (!response.ok) {
        const error = new Error(responseData.error || 'Failed to Register coach')
        throw error
      }

      context.commit('REGISTER_COACH', {
        id: userId,
        ...coachData,
      })
    },
    async loadCoaches(context, payload) {
      if(!context.getters.shouldUpdate && !payload.forceRefresh){
        return context.getters.coaches;
      }
      const response = await fetch('https://vue-http-demo-258c8-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')
      const responseData = await response.json()
      if(!response.ok){
        const error = new Error(response.message || 'something error in fetch!')
        throw error;
      }

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
      context.commit('SET_FETCH_TIME_STAMP')
    },
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
    },
    shouldUpdate(state){
      if(!state.lastFetch){
        return true;
      }
      const newTime = new Date().getTime()
      return (newTime - state.lastFetch) / 1000 > 60
    }
  }
}