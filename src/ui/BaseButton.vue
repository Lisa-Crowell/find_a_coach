<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #0f83ad;
  border: 1px solid #97daee;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #0a7d86;
  border-color: #0f83ad;
}

.flat {
  background-color: transparent;
  color: #0f83ad;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #0f83ad;
  color: #0f83ad;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #97daee;
}
</style>