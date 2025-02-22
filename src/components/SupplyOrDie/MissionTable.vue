<script setup>
const props = defineProps({
  tableData: Object,
})
</script>

<template>
  <table class="table-missions">
    <thead class="table-missions__head">
      <tr class="table-missions__head-row">
        <th
          v-for="(header, index) in tableData.headers"
          :key="index"
          :class="header.headClassNames"
        >
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody class="table-missions__body">
    <tr
      v-for="(row, index) in tableData.rows" :key="index"
      class="table-missions__body-row"
    >
      <td
        v-for="(cell, index) in row" :key="index"
        :class="cell.classNames"
      >
        {{ cell.title }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style>
.table-missions {
  table-layout: fixed;
  width: 100%;
  padding: 0;
  border-spacing: 0;
  border-collapse: separate;
}

.table-missions__head-row .table-missions__cell {
  background: rgb(0 0 0 / 25%);
}

.table-missions__head-row .table-missions__cell--name {
  background: transparent;
}

.table-missions__body-row:nth-child(2n + 1) {
  background: rgb(0 0 0 / 5%);
}

.table-missions__body-row:nth-child(2n) {
  background: rgb(0 0 0 / 15%);
}

.table-missions__body-row:hover {
  background: rgb(0 0 0 / 25%);
}

.table-missions__cell {
  padding: 3px 10px;
  border-bottom: 1px solid #222;
  text-align: left;
}

.table-missions__cell--name {
  width: 100px;
  font-weight: 700;
}

.table-missions__cell--points,
.table-missions__cell--scu {
  width: 80px;
}

.table-missions__cell--name,
.table-missions__cell--points,
.table-missions__cell--payment,
.table-missions__cell--missions-needed,
.table-missions__cell--commodities,
.table-missions__cell--scu,
.table-missions__cell--container,
.table-missions__cell--investment,
.table-missions__cell--profit,
.table-missions__cell--profit-per-scu,
.table-missions__cell--profit-per-container,
.table-missions__cell--profit-total,
.table-missions__cell--points-per-scu,
.table-missions__cell--points-per-container {
  text-align: right;
}

.table-missions__cell--gap {
  padding-left: 60px;
}
</style>
