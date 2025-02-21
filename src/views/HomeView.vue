<script setup>
import DefaultLayout from '../layouts/Default.vue'
import SupplyOrDieMissionTables from '../components/SupplyOrDie/MissionTables.vue'
import SvgIcon from '../components/helpers/SvgIcon.vue'
</script>

<template>
  <DefaultLayout>
    <main>
      <SupplyOrDieMissionTables />
    </main>
    <footer>
      <div class="icon--made-by-the-community">
        <SvgIcon name="made-by-the-community-white" />
      </div>
      <p>
        Special thanks to
        <a href="https://www.youtube.com/MrKraken" title="YouTube">MrKraken</a>
        for the
        <a
          href="https://robertsspaceindustries.com/community-hub/post/supply-or-die-one-page-guide-wQFyeQ03XmuZm"
          title="Star Citizen Community Hub"
          >infographic on the SC Community Hub</a
        >!
      </p>
    </footer>
  </DefaultLayout>
</template>

<style>
.icon--made-by-the-community {
  width: 60px;
  color: rgb(var(--color-white-rgb) / 80%);
}
</style>
