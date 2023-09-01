<template>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  data(){
    return{
      error: null
    }
  },
  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('coachesStore/register', data);
 
      } catch (err) {
        this.error = err
      }
      this.$router.push('/coaches');
     
    },
    handleError(){
      this.error = null
    }
  },
};
</script>
