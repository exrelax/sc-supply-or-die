import { defineStore } from 'pinia'
import * as state from './supplyOrDie/state.js'
import * as getter from './supplyOrDie/getter.js'
import * as actions from './supplyOrDie/actions.js'

export const useSupplyOrDieStore = defineStore('supply-or-die', () => {
  return {
    ...state,
    ...getter,
    ...actions,
  }
})
