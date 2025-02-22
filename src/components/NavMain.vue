<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const navItems = ref([
  { name: 'Tutorial', path: '/' },
  { name: 'Advanced', path: '/advanced' },
])
</script>

<template>
  <nav class="nav-main">
    <ul class="nav-main__list" role="menu">
      <li v-for="(item, index) in navItems" :key="index" class="nav-main__list-item" role="menuitem">
        <RouterLink :to="item.path">{{ item.name }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav-main {

}

.nav-main__list {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  list-style: none;
}
</style>
