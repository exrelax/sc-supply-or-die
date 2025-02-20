<script setup lang="ts">
import { computed } from 'vue'
import { default as iconConfig } from '@/components/dev/icons.json'

interface Props {
  name: string
  viewBox?: string
}

const props = defineProps<Props>()

const path = '/images/svg-sprites/'

const getIconData = (name: string) => {
  let fileName: string, iconName: string, viewBox: string

  if (props.name.indexOf('/') > -1) {
    const iconFragments = name.split('/')
    fileName = iconFragments[0]
    iconName = iconFragments[1]
    viewBox = iconConfig
      .find((item: any) => item.path === fileName)
      ?.viewBoxes.find((item: any) => item.name === iconName)?.viewBox
  } else {
    iconName = name
    viewBox = iconConfig
      .reduce((accumulator: [any], item: any) => {
        if (item.viewBoxes == null || !Array.isArray(item.viewBoxes)) {
          return accumulator
        }

        return accumulator.concat(item.viewBoxes)
      }, [])
      ?.find((item: any) => item.name === iconName)?.viewBox
  }

  return {
    fileName,
    iconName,
    viewBox,
  }
}

const viewBox = computed(() => {
  const { viewBox } = getIconData(props.name)

  if (props.viewBox != null) {
    return props.viewBox
  }

  return viewBox || null
})

const iconName = computed(() => {
  const { iconName } = getIconData(props.name)

  return iconName
})

const href = computed(() => {
  const { fileName, iconName } = getIconData(props.name)

  if (fileName != null) {
    return `${path}${fileName}.svg#icon-${iconName}`
  } else {
    return `#icon-${iconName}`
  }
})
</script>

<template>
  <svg :class="['icon', `icon--${iconName}`]" :viewBox="viewBox">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="href"></use>
  </svg>
</template>
