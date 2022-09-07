<template>
  <div id="app" class="app" :class="{'app--dimmed': showUserSettingsModal}">
    <NavBar class="app__navigation container" @show-user-settings-modal="showUserSettingsModal = true"/>
    <router-view class="container"/>
    <UserSettingsModal
      v-show="showUserSettingsModal"
      class="app__user-settings-modal container"
      :class="{'app__user-settings-modal--active': showUserSettingsModal}"
      @hide-user-settings-modal="showUserSettingsModal = false"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import UserSettingsModal from './components/UserSettingsModal.vue'
export default {
  components: {
    NavBar,
    UserSettingsModal
  },
  data () {
    return {
      showUserSettingsModal: false
    }
  }
}
</script>
<style lang="scss">
.app {
	padding: 80px 12px;
	@media screen and (min-width: 769px) {
		padding-left: 24px;
    padding-right: 24px;
	}
  &__navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
  }
  &__user-settings-modal {
    position: fixed;
    top: 15%;
    z-index: 9999;
    left: calc(50% - (500px / 2) );
    &--active {
      pointer-events: all;
    }
  }
  &--dimmed {
    &:before {
      content: '';
      background: rgba(0, 0, 0, 0.6);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100vh;
      z-index: 4;
    }
  }
}
</style>
