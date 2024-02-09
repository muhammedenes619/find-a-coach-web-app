<template>
  <div>
    <base-dialog @close="handleError" :show="!!error" title="Error">
      <p>{{ error }}</p>
    </base-dialog>
    <div>
      <base-card>
        <header>
          <h2>request recieved</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in recievedRequests"
            :key="req.id"
            :email="req.email"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You have no requests yet</h3>
      </base-card>
    </div>
  </div>
</template>
<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  computed: {
    recievedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requests/fetchRequests');
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.error = error || 'something went wrong';
      }
    },
    handleError() {
      this.error = null;
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
