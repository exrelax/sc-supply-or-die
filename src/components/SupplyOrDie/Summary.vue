<script setup lang="ts">
import SvgIcon from '@/components/helpers/SvgIcon.vue'
</script>

<template>
  <div class="sod__summary">
    <header>
      <h2>Summary</h2>
    </header>
    <p>
      Following the events of ‘Fight for Pyro’
      <span
        class="inline-icon inline-icon--citizens-for-prosperity"
        title="Citizens for Prosperity"
      >
        <SvgIcon name="citizens-for-prosperity-logo" />
        <span class="screen-reader-text">Citizens for Prosperity</span>
      </span>
      &
      <span class="inline-icon inline-icon--headhunters" title="Headhunters">
        <SvgIcon name="headhunters-logo" />
        <span class="screen-reader-text">Headhunters</span>
      </span>
      through
      <span class="inline-icon inline-icon--warning">
        <SvgIcon name="warning" />
        Priority Contracts
      </span>
      need help to resupply
      <span class="location--pyro">Ruin</span>,
      <span class="location--pyro">Orbituary</span> &
      <span class="location--pyro">Checkmate</span> stations in Pyro &
      <span class="location--stanton">Pyro Gateway</span> in
      <span class="location--stanton">Stanton</span>.
      With demands for RMC, CM, Mineable/Trade commodities and the lucrative
      Detatrine – which is sold at new
      <span class="inline-icon inline-icon--xenothreat">
        XenoThreat
        <SvgIcon name="xenothreat" />
      </span>
      depot locations.
    </p>
    <p>
      Hangar attributed rewards are obtainable at 3 benchmarks, with each type of contract coming in
      Small, Medium and Large. With Medium & Large being more suitable for group efforts!
    </p>
  </div>
</template>

<style>
.location--pyro {
  color: var(--color-pyro);
}

.location--stanton {
  color: var(--color-stanton);
}

.inline-icon {
  white-space: nowrap;
}

.inline-icon--citizens-for-prosperity {
  color: var(--color-fraction-citizens-for-prosperity);
}
.inline-icon--headhunters {
  color: var(--color-fraction-headhunters);
}
.inline-icon--xenothreat {
  color: var(--color-fraction-xenothreat);

  svg.icon {
    padding: 0 4px 0 0;
  }
}

.inline-icon--warning {
  --icon-font-size: 14;
  --icon-line-height: var(--line-height-icon-inline);

  svg.icon {
    font-size: calc(var(--icon-font-size) / var(--font-size-icon-inline) * 100%);
    line-height: calc(var(--icon-line-height) / var(--icon-font-size));
    padding-right: 2px;
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
