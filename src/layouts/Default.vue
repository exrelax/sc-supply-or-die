<script setup>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import Drawer from '@/components/Drawer.vue'
</script>

<template>
  <slot name="header">
    <PageHeader />
  </slot>
  <div class="page">
    <main class="page-main">
      <slot />
    </main>
    <slot name="footer">
      <PageFooter />
    </slot>
  </div>
  <Drawer />
</template>

<style>
.page {
  min-width: 300px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
