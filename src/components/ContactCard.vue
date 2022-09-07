<template>
	<div class="contact-card">
		<div class="contact-list__contact-name">
						{{ contact.firstName }} {{ contact.lastName}}
					</div>
					<div class="contact-list__contact-number">
						{{ getContactsPrimaryNumber(contact.phoneNumbers) }}
					</div>
	</div>
</template>

<script>
export default {
	name: 'ContactCard',
	props: {
		contact: Object
	},
	methods: {
		getContactsPrimaryNumber (phoneNumbers) {
				const primaryPhoneNumber = phoneNumbers.filter(number => number.primaryNumber)
				return `${primaryPhoneNumber[0].number} (${primaryPhoneNumber[0].type})`
			}
	}
}
</script>

<style lang="scss" scoped>
	.contact-card {
		top: 0;
		position: relative;
		border-radius: 4px;
		padding: 20px 16px;
		background: $white;
		margin-bottom: 20px;
		transition: top .325s ease-in-out;
		cursor: pointer;
		box-shadow: 0 0 5px rgba(0, 0, 0, .3);
			-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
			-moz-box-shadow: 0 0 15px rgba(0, 0, 0, .3);
			-o-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
			-khtml-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
			-ms-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	}
</style>
