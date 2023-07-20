<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred." @close="handleError">
      <p>{{error}}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Loading..." @close="handleError" fixed>
      <base-spinner />
    </base-dialog>
  <base-card>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email"/>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password"/>
      </div>
      <p v-if="!formIsValid">Please enter a valid email and password (Password must be at least 6 characters).</p>
      <base-button type="submit">{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="outline" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
    </form>
  </base-card>
  </div>
</template>

<script>
import BaseButton from "@/ui/BaseButton.vue";
import BaseCard from "@/ui/BaseCard.vue";
import BaseDialog from "@/ui/BaseDialog.vue";
import {handleError} from "vue";

export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Register';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Register' : 'Login';
    }
  },
  methods: {
    handleError,
    onSubmit(event) {
      event.preventDefault();
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$emit('save-data', data);
    },
    async validateForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@')) {
        this.formIsValid = false;
        return;
      }
      if (this.password === '' || this.password.length < 6) {
        this.formIsValid = false;
      }
      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
      } catch (error) {
        this.error = error.message || 'Failed to authenticate. Please try again later.';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
    },
  },
  components: {BaseDialog, BaseCard, BaseButton}
}
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>