<template>
  <div class="login-view">
    <LoginModal/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginModal from '@/components/LoginModal.vue'

export default {
  name: 'LoginView',

  components: {
    LoginModal
  }
}
</script>
