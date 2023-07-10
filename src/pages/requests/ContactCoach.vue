<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control"  :class="{errors: !formIsValid}">
      <label for="email">Email Address</label>
      <input type="email" id="email" v-model.trim="email.value" @input="clearValidity('email')">
    </div>
    <div class="form-control"  :class="{errors: !formIsValid}">
      <label for="message">Your Message</label>
      <textarea id="message" rows="5" v-model.trim="message.value" @input="clearValidity('message')"></textarea>
    </div>
    <p v-if="!formIsValid"  :class="{errors: !formIsValid}">Please enter a valid email address, enter a message to a coach, and resubmit.</p>
    <div class="actions">
      <base-button @click.prevent="onSubmit" type="submit">Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      message: {
        value: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    onSubmit(event) {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const data = {
        email: this.email.value,
        message: this.message.value,
      };
      this.$emit('save-data', data);
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
        return;
      }
      if (this.message.value === '') {
        this.message.isValid = false;
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch('requests/contactCoach',{
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      }).then(() => {
        this.$router.replace('/coaches');
      });
    },
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #043949;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>