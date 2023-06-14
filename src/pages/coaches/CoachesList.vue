<template>
  <section>FILTER</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register" >Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
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
</template>
<script>
import coacheItem from '../../components/coaches/CoachItem.vue';
export default {
  components: {
    coacheItem,
  },
  computed: {
    filteredCoaches() {
      console.log(this.$store.getters['coachesStore/coaches']);
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
