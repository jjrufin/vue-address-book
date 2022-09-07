<template>
	<div class="contact-list">
		<div class="contact-list__container">
			<div class="contact-list__header">
			Contacts
			</div>
			<div class="contact-list__contacts" v-if="contacts.length === 0">
				You currently have 0 contacts.
			</div>
			<div class="contact-list__contacts" v-else>
				<div class="contact-card-container" v-for="(contact, index) in contacts" :key="index" @click="selectContact(index)">
					<ContactCard class="contact-list__contact"
						:contact="contact"
						/>
				</div>
			</div>
			<button class="button button--confirm home__create-contact-button" @click="$emit('show-create-contact-modal')">Add a contact</button>
		</div>
		<ContactDetails
			class="contact-list__details"
			:contact="activeContact"
			@unset-active-contact-index="activeContactIndex = null"
			@delete-active-contact="deleteActiveContact"
		/>
	</div>
</template>

<script>
import ContactDetails from './ContactDetails.vue'
import ContactCard from './ContactCard.vue'

export default {
    name: 'ContactList',
		components: {
			ContactDetails,
			ContactCard
		},
		props: {
			contacts: Array
		},
		data () {
			return {
				activeContactIndex: null
			}
		},
		computed: {
			activeContact () {
				return this.contacts[this.activeContactIndex]
			}
		},
		methods: {
			selectContact (contactIndex) {
				this.activeContactIndex = contactIndex
			},
			deleteActiveContact () {
				this.$emit('delete-active-contact', this.activeContact)
			}
		}
}
</script>

<style lang="scss" scoped>
.contact-list {
	display: flex;
	gap: 24px;

	&__header {
		@include h2;
		margin-bottom: 16px;
	}

	&__contacts {
		margin-bottom: 8px;
	}

	&__details, &__container {
		flex-basis: 50%;
	}

	&__details {
		margin-top: 48px;
	}

	&__contact-name {
		margin-bottom: 4px;
		@include h3;
	}
}
</style>
