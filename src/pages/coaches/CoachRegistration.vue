<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
  </div>
  
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('coachesStore/register', data);
        this.$router.push('/coaches');
      } catch (err) {
        this.error = err;
        console.error(this.error); // Log the error message
      }
    },
    handleError() {
      this.error = null;
         this.$router.push('/coaches');
    },
  },
};
</script>
