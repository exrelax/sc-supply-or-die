<script setup>
import { storeToRefs } from 'pinia'
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'

const props = defineProps({
  singleRewards: Boolean,
})

const store = useSupplyOrDieStore()
const { rewards } = storeToRefs(store)
</script>

<template>
  <div class="sod__rewards">
    <h2>Rewards</h2>
    <div v-if="singleRewards" class="sod__rewards__items sod__rewards__items--grid-view">
      <div v-for="reward in rewards" :key="reward.id" class="sod__rewards__item">
        <figure class="sod__rewards__item-image-container">
          <img v-if="reward.image" :src="`images/${reward.image}`" :alt="reward.name" />
        </figure>
        <h3 class="sod__rewards__item-headline">
          {{ reward.name }}
        </h3>
        <p class="sod__rewards__item-points">{{ reward.points }} Points</p>
      </div>
    </div>
    <div v-else class="sod__rewards__items sod__rewards__items--list-view">
      <div>
        <div v-for="reward in rewards" :key="reward.id" class="sod__rewards__item">
          <h3 class="sod__rewards__item-headline">
            {{ reward.name }}
          </h3>
          <p class="sod__rewards__item-points">{{ reward.points }} Points</p>
        </div>
      </div>
      <figure class="sod__rewards__item-image-container">
        <img src="/images/sod-rewards.webp" alt="" />
      </figure>
    </div>
  </div>
</template>

<style>
.sod__rewards {
  container: rewarditems/ inline-size;
}

.sod__rewards__item-points {
  font-family: var(--font-family-goldman);
  font-size: 100%;
  margin: 1em 0;
  color: var(--color-yellow-neon);
}

.sod__rewards__item-image-container img {
  max-width: 100%;
}

.sod--ptu .sod__rewards__item-image-container img {
  filter: grayscale(80%) blur(2px);
  opacity: 0.8;
}

/** List view */

.sod__rewards__items--list-view .sod__rewards__item-headline {
  --font-size-headline: 16;
  --font-size-headling-pc: calc(var(--font-size-headline) / var(--font-size-body) * 100%);
  --margin-headline-em: calc(var(--margin-body) / 2 / var(--font-size-headline) * 1em);

  font-size: var(--font-size-headling-pc);
  line-height: calc(var(--line-height-body) / var(--font-size-headline));
  font-weight: 600;
  margin: 0 0 var(--margin-headline-em);
}

.sod__rewards__items--list-view .sod__rewards__item-points {
  --font-size-headline: 16;
  --font-size-headling-pc: calc(var(--font-size-headline) / var(--font-size-body) * 100%);
  --margin-headline-em: calc(var(--margin-body) / 2 / var(--font-size-headline) * 1em);

  margin: 0 0 var(--margin-headline-em);
}

/** Grid view */

.sod__rewards__items--grid-view .sod__rewards__item {
  text-align: center;
}

.sod__rewards__items--grid-view .sod__rewards__item-image-container {
  height: 160px;
  width: auto;
}

.sod__rewards__items--grid-view img {
  height: 100%;
  width: auto;
  transition: transform 0.2s ease;
}

.sod__rewards__items--grid-view .sod__rewards__item-image-container :hover img {
  transform: scale(1.2);
}

@container rewarditems (min-width: 520px) {
  .sod__rewards__items--list-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@container rewarditems (min-width: 960px) {
  .sod__rewards__items--grid-view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}
</style>
