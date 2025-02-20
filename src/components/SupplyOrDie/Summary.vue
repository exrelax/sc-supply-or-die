<template>
  <div>
    <header>
      <h2>
        Summary
      </h2>
    </header>
    <p>
      Following the events of ‘Fight for Pyro’
      <span class="inline-icon inline-icon--citizens-for-prosperity" title="Citizens for Prosperity">
        <SvgIcon name="citizens-for-prosperity" />
        <span class="screen-reader-text">Citizens for Prosperity</span>
      </span>
      &
      <span class="inline-icon inline-icon--headhunters" title="Headhunters">
        <SvgIcon name="headhunters" />
        <span class="screen-reader-text">Headhunters</span>
      </span>
      through priority Contracts need help to
      <span class="highlight">resupply stations across Pyro</span>.
      With demands for RMC, CM, Mineable/Trade commodities and the lucrative
      Detatrine – which is sold at new
      <span class="inline-icon inline-icon--xenothreat">
        XenoThreat
        <SvgIcon name="xenothreat" />
      </span>
      Depot locations.
    </p>
    <p>
      Hangar attributed rewards are obtainable at 3 benchmarks, with each type
      of contract coming in Small, Medium and Large. With Medium & Large being
      more suitable for group efforts!
    </p>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/helpers/SvgIcon.vue";
</script>

<style>
.inline-icon {
  svg {
    display: inline-block;
    height: 1.5em;
    width: auto;
    padding: 0 6px;
    vertical-align: bottom;
  }
}

.inline-icon--citizens-for-prosperity {
  color: var(--color-fraction-citizens-for-prosperity);
}
.inline-icon--headhunters {
  color: var(--color-fraction-headhunters);
}
.inline-icon--xenothreat {
  color: var(--color-fraction-xenothreat);

  svg {
    padding: 0 2px;
  }
}

.icon--citizens-for-prosperity {
  color: var(--color-fraction-citizens-for-prosperity);
}
.icon--headhunters {
  color: var(--color-fraction-headhunters);
}
.icon--xenothreat {
  color: var(--color-fraction-xenothreat);
}
</style>
