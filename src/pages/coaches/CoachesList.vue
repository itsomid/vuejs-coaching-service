<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <coache-item
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :areas="coach.areas"
        :rate="coach.hourlyRate"
      ></coache-item>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>
<script>
import coacheItem from '../../components/coaches/CoachItem.vue';
export default {
  components: {
    coacheItem,
  },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coachesStore/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coachesStore/hasCoaches'];
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
