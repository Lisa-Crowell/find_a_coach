<script setup>

import BaseCard from "@/ui/BaseCard.vue";
</script>

<template>
  <div>
    <section>
      <base-card>
        <h2>Page not found</h2>
        <p>Sorry, this page does not exist. Please check out our other <router-link to="/coaches">coaches</router-link>!</p>
      </base-card>
    </section>
  </div>
</template>

<style scoped>

</style>