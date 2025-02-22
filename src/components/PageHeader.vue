<script setup>
import { RouterLink } from 'vue-router'
import NavMain from '@/components/NavMain.vue'
import NavSecondary from '@/components/NavSecondary.vue'
</script>

<template>
  <header class="page-header">
    <div class="area-logo">
      <h1 class="logo">
        <RouterLink to="/">Supply or Die</RouterLink>
      </h1>
    </div>
    <NavMain />
    <NavSecondary />
  </header>
</template>

<style>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
</style>
