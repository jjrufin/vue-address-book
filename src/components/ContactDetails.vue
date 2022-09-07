<template>
	<div class="contact-details" v-if="contact">
		<div class="contact-details__details">
			<div class="contact-details__header">
				Contact Details
			</div>
			<div class="contact-details__detail">Salutation: <span>{{ contact.salutation }}</span></div>
			<div class="contact-details__detail">First Name: <span>{{ contact.firstName }}</span></div>
			<div class="contact-details__detail">Last Name: <span>{{ contact.lastName }}</span></div>
			<div class="contact-details__detail">Company Name: <span>{{ contact.companyName }}</span></div>
			<div class="contact-details__detail">Phone Number:
				<ul>
					<li class="contact-details__detail contact-details__phone-number" v-for="(phoneNumber, index) in contact.phoneNumbers" :key="index">
						<span class="contact-details__number" :class="[`contact-details__number--${phoneNumber.type.toLowerCase()}`]">{{ phoneNumber.number }} ({{ phoneNumber.type.toLowerCase() }}) {{ phoneNumber.primaryNumber ? '(primary)' : ''}}</span>
					</li>
				</ul>
			</div>
			<div class="contact-details__button-container">
				<button @click="$emit('unset-active-contact-index')" class="contact-details__close-button button button--close">Close</button>
				<button class="button button--delete" @click="deleteContact">Delete Contact</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContactDetails',
	props: {
		contact: Object
	},
	methods: {
		deleteContact () {
			this.$emit('delete-active-contact')
		}
	}
}
</script>

<style lang="scss" scoped>
.contact-details {
	background: $white;
	border-radius: 4px;
	padding: 20px 16px;
	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-moz-box-shadow: 0 0 15px rgba(0, 0, 0, .3);
		-o-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-khtml-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-ms-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	&__header {
		@include h2;
	}

	&__detail {
		padding: 8px 0;
		font-weight: bold;
		span {
			font-weight: normal;
		}
	}
	&__phone-number {
		list-style-type: none;
		span {
			display: block;
			padding: 8px;
		}
	}
	&__number {
		border-radius: 4px;
		&--work {
			background-color: #84DCCF
		}
		&--home {
			background-color: #A6D9F7;
		}
		&--cell {
			background-color: #BCCCE0;
		}
	}
	&__close-button	{
		margin-right: 12px;
	}
}
</style>
