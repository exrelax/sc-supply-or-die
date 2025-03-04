<script setup>
import { computed } from 'vue'

const props = defineProps({
  commodities: Array,
})

const classNames = computed(() => {
  return {
    'sod__single-commodity': true,
  }
})
</script>

<template>
  <span v-for="(commodity, index) in commodities" :key="index" :class="classNames">
    <span class="sod__single-commodity__scu">{{ commodity.scu }}</span
    ><abbr :title="commodity.name" class="sod__single-commodity__name">{{
      commodity.nameShort
    }}</abbr>
    <span v-if="index < commodities.length - 1" class="sod__single-commodity__separator"> + </span>
  </span>
</template>

<style>
.sod__single-commodity {
  display: inline-block;
  margin-left: 0.6em;
}

.sod__single-commodity:first-child {
  margin-left: 0.6em;
}

.sod__single-commodity__name {
  margin-left: 0.2em;
}

.sod__single-commodity__separator {
  display: none;
}
</style>
