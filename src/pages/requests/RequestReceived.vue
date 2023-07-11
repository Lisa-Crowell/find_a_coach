<template>
  <base-dialog :show="!!error" title="An error occurred, please try back later." @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading" />
      <ul v-else-if="hasRequests && !isLoading">
        <request-item v-for="request in receivedRequests"
                      :key="request.id"
                      :email="request.userEmail"
                      :message="request.message" />
      </ul>
      <h3 v-else>You haven't received any requests yet. Please check back later.</h3>
    </base-card>
  </section>
</template>

<script>
import BaseCard from "@/ui/BaseCard.vue";
import RequestItem from "@/components/requests/RequestItem.vue";
import BaseDialog from "@/ui/BaseDialog.vue";
import BaseSpinner from "@/ui/BaseSpinner.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    BaseSpinner,
    BaseDialog,
    RequestItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      // return this.receivedRequests && this.receivedRequests.length > 0;
      return this.$store.getters['requests/hasRequests'];
    }
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (error) {
        this.error = error.message || 'Failed to fetch requests!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
}
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