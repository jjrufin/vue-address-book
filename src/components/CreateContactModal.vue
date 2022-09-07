<template>
	<div class="create-contact-modal modal" v-show="showModal">
		<button @click="closeContactModal()" class="button button--close-x create-contact-modal__close-form">X</button>
		<form class="create-contact-modal__form" @submit.prevent="checkContactForm">
			<div class="create-contact-modal__header">
				Create a Contact
			</div>
			<div class="create-contact-modal__sub-header"><sup>* denotes field is required</sup></div>
			<div class="create-contact-modal__field create-contact-modal__field--photo">
				<label class="create-contact-modal__label" for="photo">Photo: </label>
				<input class="create-contact-modal__input" id="photo" type="file"/>
			</div>
			<div class="create-contact-modal__field create-contact-modal__field--salutation">
				<label class="create-contact-modal__label" for="salutation">Salutation: </label>
				<select class="create-contact-modal__input" id="salutation" v-model="contact.salutation">
					<option
						v-for="(salutation, index) in salutations"
						:key="index"
						@click="changeSalutation(salutation)"
						>
						{{ salutation }}
					</option>
				</select>
			</div>
			<div class="create-contact-modal__field create-contact-modal__field--first-name">
				<label class="create-contact-modal__label" for="first-name">First Name<sup>*</sup>: </label>
				<input class="create-contact-modal__input" id="first-name" v-model="contact.firstName" type="text" />
			</div>
			<div class="create-contact-modal__field create-contact-modal__field--last-name">
				<label class="create-contact-modal__label" for="last-name">Last Name<sup>*</sup>: </label>
				<input class="create-contact-modal__input" id="last-name" v-model="contact.lastName" type="text" />
			</div>
			<div class="create-contact-modal__field create-contact-modal__field--company">
				<label class="create-contact-modal__label" for="company">Company: </label>
				<input class="create-contact-modal__input" id="company" v-model="contact.companyName" type="text"/>
			</div>
			<div class="create-contact-modal__phone-number" v-for="(number, index) in contact.phoneNumbers" :key="index">
				<button class="button button--close-x button--delete create-contact-modal__delete-number" v-if="contact.phoneNumbers.length > 1" @click="$delete(contact.phoneNumbers, index)" type="button">x</button>
				<div class="create-contact-modal__field">
					<label class="create-contact-modal__label" :for="`phone-number__number--${index}`">Phone Number<sup>*</sup>: </label>
					<input class="create-contact-modal__input" :id="`phone-number__number--${index}`" v-model="contact.phoneNumbers[index].number" type="text" />
				</div>

				<div class="create-contact-modal__field create-contact-modal__field--secondary">
					<label class="create-contact-modal__label" :for="`phone-number__type--${index}`">Number Type<sup>*</sup>: </label>
					<select :id="`phone-number__type--${index}`" v-model="contact.phoneNumbers[index].type">
						<option v-for="(type, index) in phoneNumberTypes"
							:key="index"
							@click="changePhoneNumberType(type)"
							>
							{{ type }}
						</option>
					</select>
				</div>
				<div class="create-contact-modal__field create-contact-modal__field--secondary">
					<label class="create-contact-modal__label" :for="`primary-${index}`">Primary Number: </label>
					<input class="create-contact-modal__input create-contact-modal__input--checkbox" v-model="contact.phoneNumbers[index].primaryNumber" type="checkbox" :id="`primary-${index}`" :name="`primary-${index}`" @click="setPrimaryPhoneNumber(index)" :disabled="contact.phoneNumbers.length === 1">
				</div>
			</div>
			<button class="create-contact-modal__add-number button button--confirm" type="button" @click="addPhoneNumber()">+</button>

			<button class="button button--confirm" type="submit">Add Contact</button>
			</form>
	</div>
</template>

<script>
export default {
		/*
		TODO: Refactor creating contact
		*/
	props: {
		showModal: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			contact: {
				photo: '',
				id: Math.random().toString(),
				salutation: '',
				firstName: '',
				lastName: '',
				companyName: '',
				phoneNumbers: [
					{
						number: '',
						type: '',
						primaryNumber: true
					}
				]
			},
			phoneNumberTypes: [
				'Work',
				'Cell',
				'Home'
			],
			salutations: [
				'Mr.',
				'Ms.',
				'Mrs.',
				'Dr.',
				'Prof.'
			]

		}
	},
	watch: {
		showModal () {
			this.contact = {
				photo: null,
				id: Math.random().toString(),
				salutation: '',
				firstName: '',
				lastName: '',
				companyName: '',
				phoneNumbers: [
					{
						number: '',
						type: '',
						primaryNumber: true
					}
				]
			}
		},
		'contact.phoneNumbers': {
			deep: true,
			handler () {
				if (this.contact.phoneNumbers.length === 1) this.contact.phoneNumbers[0].primaryNumber = true
			}
		}
	},
	methods: {
		addPhoneNumber () {
			const phoneNumberObj = {
						number: '',
						type: '',
						primaryNumber: false
					}
			this.contact.phoneNumbers.push(phoneNumberObj)
		},
		closeContactModal () {
			this.$emit('close-modal')
		},
		changeSalutation (salutation) {
			this.activeSalutation = salutation
		},
		changePhoneNumberType (type) {
			this.activePhoneNumberType = type
		},
		checkContactForm () {
			if (this.contact.firstName.length > 0 && this.contact.lastName.length > 0) {
				for (let i = 0; i < this.contact.phoneNumbers.length; i++) {
					if (this.contact.phoneNumbers[i].number.length < 1 || this.contact.phoneNumbers[i].type === '') return
				}
				this.addContactToContacts()
			}
		},
		addContactToContacts () {
			console.log('contact', this.contact)
			this.$emit('add-contact', this.contact)
			this.closeContactModal()
		},
		setPrimaryPhoneNumber (phoneNumberIndex) {
			for (let i = 0; i < this.contact.phoneNumbers.length; i++) {
				if (phoneNumberIndex !== i) this.contact.phoneNumbers[i].primaryNumber = false
				else this.contact.phoneNumbers[i].primaryNumber = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.create-contact-modal {
	margin: 0 auto;
	padding: 32px 16px;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-moz-box-shadow: 0 0 15px rgba(0, 0, 0, .3);
		-o-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-khtml-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
		-ms-box-shadow: 0 0 5px rgba(0, 0, 0, .3);
	position: relative;

	&__close-form {
		position: absolute;
		top: 0;
		left: 0;
	}

	&__header {
		@include h1;
		padding: 12px 0;
		text-align: center;
	}

	&__form {
		display: flex;
		flex-direction: column;
		padding: 0 16px;
		margin: 0 auto;
	}

	&__input {
		&--disabled {
			pointer-events: none;
		}
	}

	&__field {
		padding: 8px 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;

		&--secondary {
			justify-content: flex-end;
		}
	}

	&__label {
		display: flex;
		padding-right: 8px;
	}
	&__input {
		flex-grow: 1;
		width: 100%;
		&--checkbox {
			flex-grow: 0;
			width: auto;
		}
	}

	&__phone-number {
		padding: 16px 0 4px;
	}

	&__add-number {
		align-self: flex-end;
		margin-bottom: 16px;
	}

	&__delete-number {
		position: absolute;
		top: 20px;
		right: 0;
		z-index: 2;
	}

}
</style>
