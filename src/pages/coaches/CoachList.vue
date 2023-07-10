<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import BaseCard from "@/ui/BaseCard.vue";
import BaseButton from "@/ui/BaseButton.vue";
export default {
  components: {
    BaseButton,
    BaseCard,
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        return (this.activeFilters.career && coach.areas.includes('career'));
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    loadCoaches() {
      this.$store.dispatch('coaches/loadCoaches');
    }
  }
}
</script>

<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
    <div class="controls">
      <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
      <base-button link to="/register" v-if="!isCoach">Register as a Coach</base-button>
    </div>

    <ul v-if="hasCoaches">
      <coach-item
      v-for="coach in filteredCoaches"
      :key="coach.id"
      :id="coach.id"
      :first-name="coach.firstName"
      :last-name="coach.lastName"
      :rate="coach.hourlyRate"
      :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>No coaches found!</h3>
  </base-card>
  </section>
</template>

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