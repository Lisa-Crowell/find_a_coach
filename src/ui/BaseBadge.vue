<script>
export default {
  props:
    ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    }
  }
}
</script>

<template>
  <span class="badge" :class="type">
    {{text}}
  </span>
</template>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #00388d;
  color: white;
}

.backend {
  background-color: #4b965a;
  color: white;
}

.career {
  background-color: #6cce88;
  color: white;
}
</style>