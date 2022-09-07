<template>
	<div class="user-settings-modal modal">
		<button @click="$emit('hide-user-settings-modal')" class="button button--close-x user-settings-modal__close-form">X</button>
		<form class="user-settings-modal__form" @submit.prevent="checkUserSettingsForm">
			<div class="user-settings-modal__field">
				<label for="new-username">New Username:</label>
				<input v-model="newUsername" id="new-username" type="text"/>
			</div>
			<div class="user-settings-modal__button-container">
				<button class="button button--confirm" type="submit">Save new username</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'UserSettingsModal',
	computed: {
		showUserSettingsModal () {
			return this.$store.getters.showUserSettingsModal
		},
		currentUsername () {
			return this.$store.getters.user.username
		},
		userPassword () {
			return this.$store.getters.user.password
		}
	},
	watch: {
		currentUsername () {
			this.resetNewUsername()
		},
		showUserSettingsModal () {
			if (!this.showUserSettingsModal) {
				this.resetNewUsername()
			}
		}
	},
	data () {
		return {
			newUsername: ''
		}
	},
	methods: {
		checkUserSettingsForm () {
			if (this.newUsername.length > 0) {
				this.$store.dispatch('setUser', {
					username: this.newUsername
				})
				this.$emit('hide-user-settings-modal')
			}
		},
		resetNewUsername () {
			this.newUsername = this.currentUsername
		}
	}
}
</script>

<style lang="scss" scoped>
.user-settings-modal {
	width: 500px;
	form {
		padding: 0 16px;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
	}
	&__button-container {
		padding: 12px 0 16px;
	}
}
</style>
