<template>
  <div>
    <base-dialog :show="!!error" @close="closeModal" title="An error occoured!">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login as a coach</base-button>
          <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/coaches/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coache-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coache-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import coacheItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      error: null,
    };
  },

  components: {
    coacheItem,
    CoachFilter,
  },
  computed: {
    isCoach() {
      return this.$store.getters['coachesStore/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coachesStore/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coachesStore/hasCoaches'];
    },
    isLoggedIn(){
      return this.$store.getters['authStore/isAuthenticated']
    }
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(filters) {
      this.activeFilters = filters;
    },
    loadCoaches(refresh = false) {
      this.isLoading = true;
      this.$store
        .dispatch('coachesStore/loadCoaches', { forceRefresh: refresh })
        .then(() => {
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error.message || 'Something Went wrong!';
        });
    },
    closeModal() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
