<script setup>
import Summary from './Summary.vue'
import Rewards from './Rewards.vue'
import Tagline from './Tagline.vue'
import TutorialLowRiskTables from './TutorialLowRiskTables.vue'
</script>

<template>
  <div class="sod__tutorial">
    <div class="sod__tutorial-content">
      <Summary class="sod__tutorial-content-summary" />
      <Rewards class="sod__tutorial-content-rewards" />
    </div>
    <Tagline />
    <TutorialLowRiskTables />
  </div>
</template>

<style>
@media (min-width: 960px) {
  .sod__tutorial-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    justify-content: space-between;
  }

  .sod__tutorial-content-summary {
  }
  .sod__tutorial-content-rewards {
  }
}
</style>


