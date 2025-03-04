import config from '@/config'
import { CompleteMission } from '@/models/Mission'

export interface MissionGroup {
  title: string
  missions: CompleteMission[]
}

export interface ConfigMissionTableField {
  name: string
  title: string
  classSuffix: string
}

export interface MissionTableFieldClassNames {
  classNames: string[]
  headClassNames: string[]
}

export interface MissionTableCell {
  name: string
  title: string
  classNames: string[]
  headClassNames?: string[]
  colspan?: number
  component?: any
  componentProps?: any
}

export interface MissionTableField extends ConfigMissionTableField, MissionTableFieldClassNames {}

const configMissionTableFields: ConfigMissionTableField[] = config.missionTableFields
const cellClassName = 'table-missions__cell'
const headCellClassName = `${cellClassName}--head`
const headlineCellClassName = `${cellClassName}--headline`
const headlineOffsetCellClassName = `${headlineCellClassName}-offset`
const groupTitleCellClassName = `${cellClassName}--group-title`
const gapClassName = `${cellClassName}--gap`
const cellIndexClassNamePrefix = `${cellClassName}--index-`
const missionCellClassNamePrefix = `${cellClassName}--mission-`

export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj)
}

export const groupMissionsByFieldName = (
  missions: CompleteMission[],
  fieldName: string,
): MissionGroup[] => {
  return missions.reduce((accumulator: MissionGroup[], mission: CompleteMission) => {
    const searchValue = mission[fieldName]
    const foundGroup: MissionGroup = accumulator.find((group) => group.title === searchValue)

    if (foundGroup) {
      foundGroup.missions.push(mission)
    } else {
      accumulator.push({
        title: searchValue,
        missions: [mission] as CompleteMission[],
      })
    }

    return accumulator
  }, [] as MissionGroup[])
}

const createFieldClassNames = (
  configMissionTableField: ConfigMissionTableField,
  index: number,
  addGapClassName: boolean = false,
): MissionTableFieldClassNames => {
  const classNames = [cellClassName, `${cellClassName}--${configMissionTableField.classSuffix}`]
  const indexCellClassName = `${cellIndexClassNamePrefix}${index}`
  const headClassNames = classNames.concat([headCellClassName, indexCellClassName])

  if (addGapClassName) {
    classNames.push(gapClassName)
    headClassNames.push(gapClassName)
  }

  return {
    classNames,
    headClassNames,
  }
}

const createMissionTableFields = (fieldNames: string[]) => {
  return fieldNames.map((fieldName, index) => {
    const foundConfigMissionTableField: ConfigMissionTableField = configMissionTableFields.find(
      (field) => field.name === fieldName,
    )

    return {
      ...foundConfigMissionTableField,
      ...createFieldClassNames(foundConfigMissionTableField, index),
    }
  })
}

const createMissionTableCell = (
  mission: CompleteMission,
  missionTableField: MissionTableField,
  missionIndex: number,
  cellIndex: number,
  groupTable: boolean = false,
): MissionTableCell => {
  const { name } = missionTableField
  const rawTitle = name.indexOf('.') > -1 ? getNestedValue(mission, name) : mission[name]
  const missionClassName = `${missionCellClassNamePrefix}${missionIndex}`
  const cellIndexClassName = `${cellIndexClassNamePrefix}${cellIndex}`
  const classNames: string[] = missionTableField.classNames.concat([
    missionClassName,
    cellIndexClassName,
  ])
  const headClassNames: string[] = missionTableField.headClassNames.concat([
    missionClassName,
    cellIndexClassName,
  ])

  const title =
    (rawTitle != null && typeof rawTitle === 'string') || typeof rawTitle === 'number'
      ? rawTitle.toString()
      : ''
  const component = rawTitle?.component ?? null
  const componentProps = rawTitle?.componentProps ?? null

  if (groupTable) {
    if (missionIndex > 0 && cellIndex === 1) {
      classNames.push(gapClassName)
      headClassNames.push(gapClassName)
    }
  }

  return {
    name,
    title,
    classNames,
    headClassNames,
    component,
    componentProps,
  }
}

const createMissionTableRows = (
  missions: CompleteMission[],
  missionTableFields: MissionTableField[],
) => {
  return missions.map((mission: CompleteMission, missionIndex: number) => {
    return missionTableFields.map((missionTableField: MissionTableField, cellIndex) => {
      return createMissionTableCell(mission, missionTableField, missionIndex, cellIndex, false)
    })
  })
}

const createGroupedMissionTableRows = (
  missionGroups: MissionGroup[],
  missionTableFields: MissionTableField[],
  headers: MissionTableCell[],
) => {
  return missionGroups.map((group: MissionGroup, rowIndex: number) => {
    const cells = [
      {
        title: group.title,
        classNames: headers[0].classNames.concat([groupTitleCellClassName]),
      },
    ]

    group.missions.forEach((mission: CompleteMission, missionIndex: number) => {
      missionTableFields.forEach((missionTableField: MissionTableField, cellIndex) => {
        if (cellIndex === 0) {
          return
        }

        const { title, classNames, headClassNames } = createMissionTableCell(
          mission,
          missionTableField,
          missionIndex,
          cellIndex,
          true,
        )

        if (rowIndex === 0) {
          headers.push({
            name: missionTableField.name,
            title: missionTableField.title,
            classNames: headClassNames,
          })
        }

        cells.push({
          title,
          classNames,
        })
      })
    })

    return cells
  })
}

const createHeadlineClassNames = (missionIndex?: number): string[] => {
  const classNames = [cellClassName, headlineCellClassName]

  if (missionIndex != null) {
    classNames.push(`${missionCellClassNamePrefix}${missionIndex}`)
  }

  if (missionIndex > 0) {
    classNames.push(gapClassName)
  }

  return classNames
}

const createMissionHeaderHeadline = (
  missions: CompleteMission[],
  fieldNames: string[],
  missionHeadlineField: string,
  offset?: number = 0,
) => {
  let indexCellClassName: string
  let classNames = createHeadlineClassNames()
  const headerHeadline = []
  const title = missions[0][missionHeadlineField]
  let headlineCellIndex = 0

  if (offset > 0) {
    for (headlineCellIndex = 0; headlineCellIndex < offset; headlineCellIndex++) {
      indexCellClassName = `${cellIndexClassNamePrefix}${headlineCellIndex}`
      headerHeadline.push({
        name: fieldNames[headlineCellIndex],
        title: '',
        classNames: classNames.concat([headlineOffsetCellClassName, indexCellClassName]),
        colspan: 0,
      })
    }
  }

  indexCellClassName = `${cellIndexClassNamePrefix}${headlineCellIndex + 1}`
  headerHeadline.push({
    name: missionHeadlineField,
    title,
    colspan: fieldNames.length - headlineCellIndex,
    classNames: classNames.concat([indexCellClassName]),
  })

  return headerHeadline
}

const createGroupedMissionHeaderHeadline = (
  missionGroups: MissionGroup[],
  fieldNames: string[],
  missionHeadlineField: string,
) => {
  let headlineCellIndex = 0
  let classNames = createHeadlineClassNames()
  let indexCellClassName = `${cellIndexClassNamePrefix}${headlineCellIndex}`
  const headerHeadline: MissionTableCell[] = [
    {
      name: fieldNames[0],
      title: '',
      classNames: classNames.concat([
        headlineOffsetCellClassName,
        groupTitleCellClassName,
        indexCellClassName,
      ]),
      colspan: 0,
    },
  ]

  missionGroups[0].missions.forEach((mission: CompleteMission, missionIndex) => {
    headlineCellIndex++
    classNames = createHeadlineClassNames(missionIndex)
    indexCellClassName = `${cellIndexClassNamePrefix}${headlineCellIndex}`

    headerHeadline.push({
      name: missionHeadlineField,
      title: mission[missionHeadlineField],
      colspan: fieldNames.length - 1,
      classNames: classNames.concat([indexCellClassName]),
    } as MissionTableCell)
  })

  return headerHeadline
}

/* Create Tables */

export const createMissionTableData = (
  missions: CompleteMission[],
  fieldNames: string[],
  missionHeadlineField?: string,
  offset?: number,
) => {
  const missionTableFields: MissionTableField[] = createMissionTableFields(fieldNames)

  const headers = missionTableFields.map((missionTableField: MissionTableField) => {
    return {
      name: missionTableField.name,
      title: missionTableField.title,
      classNames: missionTableField.headClassNames,
    }
  })
  const rows = createMissionTableRows(missions, missionTableFields)
  const headerHeadline =
    missionHeadlineField != null
      ? createMissionHeaderHeadline(missions, fieldNames, missionHeadlineField, offset)
      : null

  return {
    headerHeadline,
    headers,
    rows,
  }
}

export const createGroupedMissionsTableData = (
  missionGroups: MissionGroup[],
  fieldNames: string[],
  missionHeadlineField?: string,
) => {
  const missionTableFields: MissionTableField[] = createMissionTableFields(fieldNames)
  const headers = [missionTableFields[0]]
  const rows = createGroupedMissionTableRows(missionGroups, missionTableFields, headers)
  const headerHeadline =
    missionHeadlineField != null
      ? createGroupedMissionHeaderHeadline(missionGroups, fieldNames, missionHeadlineField)
      : null

  return {
    headerHeadline,
    headers,
    rows,
  }
}
