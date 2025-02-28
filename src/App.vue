<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'
import svgFa from '@/assets/svg-sprites/fa.svg?raw'
import svgIcons from '@/assets/svg-sprites/icon.svg?raw'
import svgLogos from '@/assets/svg-sprites/logo.svg?raw'

const store = useSupplyOrDieStore()
const { version } = storeToRefs(store)

const versionEnvironment = computed(() => {
  return version.value.toLowerCase().includes('ptu') ? 'ptu' : 'live'
})

const cssClasses = ref({
  'sod': true,
  'sod--ptu': versionEnvironment.value === 'ptu',
  'sod--live': versionEnvironment.value === 'live',
})
</script>

<template>
  <div :class="cssClasses">
    <RouterView />

    <div class="is-hidden">
      <span v-html="svgFa" />
      <span v-html="svgIcons" />
      <span v-html="svgLogos" />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
