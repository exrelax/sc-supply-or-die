<script setup>
import { computed, ref } from 'vue'
import eventBus from '@/utils/eventBus.js'
import ShortNumberSwitch from '@/components/SupplyOrDie/ShortNumberSwitch.vue'
import SvgIcon from '@/components/helpers/SvgIcon.vue'

const showDrawer = ref(false)

const openDrawer = () => {
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
}

const cssClasses = computed(() => {
  return {
    drawer: true,
    'drawer--open': showDrawer.value,
    'drawer--closed': !showDrawer.value,
  }
})

eventBus.on('drawer.open', openDrawer)
eventBus.on('drawer.close', closeDrawer)
</script>

<template>
  <div :class="cssClasses">
    <header class="drawer__header">
      <h4>Settings</h4>
      <div>
        <button class="button button--icon" @click="eventBus.emit('drawer.close')" title="Close">
          <SvgIcon name="xmark-large" />
          <span class="screen-reader-text"> Close Drawer </span>
        </button>
      </div>
    </header>
    <div class="drawer__content">
      <ShortNumberSwitch />
    </div>
  </div>
</template>

<style>
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--color-background);
  box-shadow: -2px 0 8px rgb(var(--color-black-rgb) / 50%);
  transform: translateX(100%);
  transition: transform 0.2s ease-in-out;
}

.drawer--closed {
  transform: translateX(100%);
}

.drawer--open {
  transform: translateX(0%);
}

.drawer__header {
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-gray-80);
}

.drawer__header h4 {
  font-family: var(--font-family-goldman);
  font-size: 150%;
  margin: 0;
  line-height: 1;
}

.drawer__header .button--icon {
}

.drawer__content {
  padding: 20px;
}
</style>
