<script setup>
import { useSupplyOrDieStore } from '@/stores/supplyOrDie.js'
import { computed } from 'vue'

const store = useSupplyOrDieStore()

const shortNumberMode = computed({
  get() {
    return store.shortNumberMode
  },
  set(value) {
    store.setShortNumberMode(value)
  },
})
</script>

<template>
  <label class="short-number-switch">
    <span class="short-number-switch__label-text label-text"> Rounded Numbers </span>
    <div class="short-number-switch__switch switch">
      <input type="checkbox" v-model="shortNumberMode" />
      <div class="slider round"></div>
    </div>
  </label>
</template>

<style>
.short-number-switch {
  --label-font-size: 16;
  --label-font-size-px: calc(var(--label-font-size) * 1px);

  --switch-height: 30;
  --switch-height-px: calc(var(--switch-height) * 1px);
  --switch-width: 56;
  --switch-width-px: calc(var(--switch-width) * 1px);

  --switch-dot-size: 22;
  --switch-dot-size-px: calc(var(--switch-dot-size) * 1px);

  --switch-dot-offset: calc((var(--switch-height) - var(--switch-dot-size)) / 2);
  --switch-dot-offset-px: calc(var(--switch-dot-offset) * 1px);

  --switch-color-active: var(--color-green-dark);
  --switch-color-inactive: var(--color-gray-50);

  display: flex;
  gap: 10px;
  margin-bottom: 1em;
  justify-content: space-between;
  cursor: pointer;
}

.short-number-switch__label-text {
  line-height: calc(var(--switch-height) / var(--label-font-size));
}

.switch {
  display: inline-block;
  height: var(--switch-height-px);
  position: relative;
  width: var(--switch-width-px);
}

.switch input {
  display: none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  left: var(--switch-dot-offset-px);
  bottom: var(--switch-dot-offset-px);
  content: '';
  height: var(--switch-dot-size-px);
  width: var(--switch-dot-size-px);
  background-color: var(--color-white);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--switch-color-active);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
