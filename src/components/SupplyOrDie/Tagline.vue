<script setup>
import SvgIcon from '@/components/helpers/SvgIcon.vue'
</script>

<template>
  <header class="sod__tagline">
    <SvgIcon name="warning" />
    <h2 class="sod__tagline__headline">Contract Progression, Points & Pay can be shared</h2>
    <SvgIcon name="warning" />
  </header>
</template>

<style>
.sod__tagline {
  --font-size-tagline: 28;
  --line_heigh-tagline: 36;
  --font-size-tagline-icon: 26;
  --tagline-icon-dimension: 26;

  --font-size-tagline-pc: calc(var(--font-size-tagline) / var(--font-size-body) * 100%);
  --line-height-tagline-scale: calc(var(--line_heigh-tagline) / var(--font-size-tagline));

  --font-size-tagline-icon-pc: calc(var(--font-size-tagline-icon) / var(--font-size-body) * 100%);
  --line-height-tagline-icon-scale: calc(var(--line_heigh-tagline) / var(--font-size-body));

  --tagline-icon-dimension-px: calc(var(--tagline-icon-dimension) * 1px);

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 20px;
  margin: 1em 0;
  border: 2px solid var(--color-pyro);
  border-left: 0;
  border-right: 0;
}

.sod__tagline__headline {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-tagline-pc);
  line-height: var(--line-height-tagline-scale);
  margin: 0;
  padding: 20px 0;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-white);
}

.sod__tagline .icon {
  width: var(--tagline-icon-dimension-px);
  font-size: var(--font-size-tagline-icon-pc);
  line-height: var(--line-height-tagline-icon-scale);
}
</style>
