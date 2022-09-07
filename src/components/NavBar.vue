<template>
    <nav class="nav-bar">
			<div class="nav-bar__header">
				<router-link to="/" class="nav-bar__nav-item">Address Book</router-link>
			</div>
			<div class="nav-bar__items" v-if="user && user.username">
				<span class="nav-bar__nav-item">{{ user.username }}</span> |
				<span class="nav-bar__nav-item" @click="$emit('show-user-settings-modal')">Settings</span>
			</div>
    </nav>
</template>

<script>
export default {
	name: 'NavBar',
	computed: {
		user () {
			return this.$store.getters.user
		}
	}
}
</script>

<style lang="scss" scoped>
.nav-bar {
	background-color: $brand-light--secondary;
	padding: 0 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 2;

	@media screen and (min-width: 769px) {
		padding: 0 24px
	}

  &__nav-item {

    font-weight: bold;
    color: #2c3e50;
		cursor: pointer;
		text-decoration: none;
  }
}
</style>
