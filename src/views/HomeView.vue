<template>
  <div class="home">
    <div class="home__contacts">
      <div class="home__contact-list-container">
        <ContactList
          :contacts="contacts"
          @delete-active-contact="deleteContactFromContacts"
          @show-create-contact-modal="showCreateContactModal = true"
          @hide-create-contact-modal="showCreateContactModal = false"/>
      </div>
    </div>
    <CreateContactModal class="home__create-contact-modal" :showModal="showCreateContactModal" @close-modal="showCreateContactModal = false" @add-contact="addContactToContacts"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ContactList from '@/components/ContactList.vue'
import CreateContactModal from '@/components/CreateContactModal.vue'

export default {
  name: 'HomeView',
  components: {
    ContactList,
    CreateContactModal
  },
  data () {
    return {
      contacts: [],
      showCreateContactModal: false,
      activeContactIndex: null
    }
  },
  methods: {
    setActiveContactIndex (e) {
      this.activeContactIndex = e
    },
    addContactToContacts (contact) {
      this.contacts.push(contact)
    },
    deleteContactFromContacts (contact) {
      console.log('delete contact:', contact)
      this.contacts = this.contacts.filter(i => contact.id !== i.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  &__contacts {
    display: flex;
  }
  &__contact-details {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;

    @media screen and (min-width: 769px) {
      align-self: flex-start;
      display: block;
      position: relative;
      width: 500px;
      margin-right: 60px;
    }

    &--active {
      display: block;
    }
  }
  &__contact-list-container {
   width: 100%;
  }
  &__create-contact-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
