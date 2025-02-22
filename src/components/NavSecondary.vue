<script setup>
import SvgIcon from '@/components/helpers/SvgIcon.vue'
import eventBus from '@/utils/eventBus.js'
</script>

<template>
  <nav class="nav-secondary">
    <ul class="nav-secondary__list" role="menu">
      <li class="nav-secondary__list-item" role="menuitem">
        <button class="button button--secondary" @click="eventBus.emit('drawer.open')">
          <SvgIcon name="fa/gear"/>
          <span class="screen-reader-text">
            Settings
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav-secondary__list {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
}
</style>
