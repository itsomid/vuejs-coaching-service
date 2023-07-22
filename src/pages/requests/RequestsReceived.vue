<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>
<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  data() {
    return {
      isLoading: false,
      allRequests: [],
    };
  },
  components: {
    RequestItem,
  },
  created() {
    this.loadRequests();
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requestStore/requests'];
    },
    hasRequests() {
      return this.$store.getters['requestStore/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      
      try {
        await this.$store.dispatch('requestStore/fetchRequest');
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
