<script setup>
import { storeToRefs } from 'pinia'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const props = defineProps({
  missions: Array,
})

const store = useSupplyOrDieStore()
const { rewards } = storeToRefs(store)
</script>

<template>
  <div class="supply-or-die__rewards">
    <h2>
      Rewards
    </h2>

    <div class="supply-or-die__rewards-grid">
      <div v-for="reward in rewards" :key="reward.id" class="supply-or-die__rewards-grid__item">
        <figure class="supply-or-die__rewards-grid__item-figure">
          <img v-if="reward.image" :src="`images/${reward.image}`" :alt="reward.name" />
        </figure>
        <h3>{{ reward.name }}</h3>
        <p class="supply-or-die__rewards-points">{{ reward.points }} Points</p>
      </div>
    </div>
  </div>
</template>

<style>
.supply-or-die__rewards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.supply-or-die__rewards-grid__item {
  text-align: center;
}

.supply-or-die__rewards-grid__item-figure {
  height: 160px;
  width: auto;
}

.supply-or-die__rewards-grid__item-figure img {
  height: 100%;
  width: auto;
  transition: transform 0.2s ease;
}

.supply-or-die__rewards-grid__item-figure:hover img {
  transform: scale(1.2);
}

.supply-or-die__rewards-points {
  font-size: 125%;
  font-family: var(--font-family-goldman);
  margin: 0;
  color: var(--color-yellow-neon);
}
</style>
