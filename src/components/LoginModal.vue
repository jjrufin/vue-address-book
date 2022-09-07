<template>
	<div class="login-modal modal">
		<form class="login-modal__form" @submit.prevent="checkLoginForm">
			<div class="login-modal__header">
				Login
			</div>
			<div class="login-modal__field-group">
				<label class="login-modal__label" for="username">Username</label>
				<input class="login-modal__input" id="username" v-model="username" type="text" placeholder="username"/>
			</div>
			<div class="login-modal__field-group">
				<label class="login-modal__label" for="password">Password</label>
				<input v-model="password" type="password" id="password" placeholder="password"/>
			</div>
			<div class="login-modal__button-container">
				<button class="button button--confirm" type="submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		// validate
		checkLoginForm () {
			if (this.username.length > 0 && this.password.length > 0) {
				console.log('valid')
				this.submitLoginForm()
				return
			}
			console.log('invalid')
		},
		submitLoginForm () {
			const user = {}

			user.username = this.username
			user.password = this.password

			this.$store.dispatch('setUser', user)
			this.$store.dispatch('setUserIsLoggedIn', true)
			this.$router.push('/')
		}
	}
}
</script>
<style lang="scss" scoped>
.login-modal {
	max-width: 30rem;
	margin: 0 auto;
	&__header {
		@include h1;
		padding: 12px 0;
		text-align: center;
	}
	&__form {
		padding: 0 16px;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}
	&__field-group {
		margin: 8px 0;
	}
	&__button-container {
		padding: 12px 0 16px;
	}
}

</style>
