<template>
  <the-header>

  </the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  computed: {
    autoLogout() {
      return this.$store.getters.autoLogout;
    }
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  watch: {
    autoLogout(currentValue, oldValue) {
      if (currentValue !== oldValue && !currentValue) {
        this.$store.dispatch('/coaches');
      }
    }
  }
};

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-active,
.route-leave-active {
  transition: opacity 0.3s ease-out;
}

.route-enter-from,
.route-leave-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
