<script setup>
import DefaultLayout from '../layouts/Default.vue'
import SupplyOrDieMissionTables from '../components/SupplyOrDie/MissionTables.vue'
import Tutorial from '../components/SupplyOrDie/Tutorial.vue'
import SvgIcon from '../components/helpers/SvgIcon.vue'
</script>

<template>
  <DefaultLayout>
    <Tutorial />
    <!--
    <SupplyOrDieMissionTables />
    -->
  </DefaultLayout>
</template>

<style>
.icon--made-by-the-community {
  width: 60px;
  color: rgb(var(--color-white-rgb) / 80%);
}
</style>
