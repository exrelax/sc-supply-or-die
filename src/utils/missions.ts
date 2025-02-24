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
  title: string
  classNames: string[]
  headClassNames?: string[]
  colspan?: number
}

export interface MissionTableField extends ConfigMissionTableField, MissionTableFieldClassNames {}

const configMissionTableFields: ConfigMissionTableField[] = config.missionTableFields
const cellClassName = 'table-missions__cell'
const headCellClassName = `${cellClassName}--head`
const headlineCellClassName = `${cellClassName}--headline`
const groupTitleCellClassName = `${cellClassName}--group-title`
const gapClassName = `${cellClassName}--gap`
const missionCellClassNamePrefix = `${cellClassName}--mission-`

export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export const groupMissionsByFieldName = (missions: CompleteMission[], fieldName: string): MissionGroup[] => {
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

const createFieldClassNames = (configMissionTableField: ConfigMissionTableField, addGapClassName: boolean = false): MissionTableFieldClassNames => {
  const classNames = [cellClassName, `${cellClassName}--${configMissionTableField.classSuffix}`]
  const headClassNames = classNames.concat([headCellClassName])

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
  return fieldNames.map((fieldName) => {
    const foundConfigMissionTableField: ConfigMissionTableField = configMissionTableFields.find((field) => field.name === fieldName)

    return {
      ...foundConfigMissionTableField,
      ...createFieldClassNames(foundConfigMissionTableField),
    }
  })
}

const createMissionTableCell = (mission: CompleteMission, missionTableField: MissionTableField, missionIndex: number, cellIndex: number, groupTable: boolean = false): MissionTableCell => {
  const title = missionTableField.name.indexOf('.') > -1 ?
    getNestedValue(mission, missionTableField.name) : mission[missionTableField.name]
  const missionClassName = `${missionCellClassNamePrefix}${missionIndex}`
  const classNames: string[] = missionTableField.classNames.concat([missionClassName])
  const headClassNames: string[] = missionTableField.headClassNames.concat([missionClassName])

  if (groupTable) {
    if (missionIndex > 0 && cellIndex === 1) {
      classNames.push(gapClassName)
      headClassNames.push(gapClassName)
    }
  }

  return {
    title,
    classNames,
    headClassNames,
  }
}

const createMissionTableRows = (missions: CompleteMission[], missionTableFields: MissionTableField[]) => {
  return missions.map((mission: CompleteMission, missionIndex: number) => {
    return missionTableFields.map((missionTableField: MissionTableField, cellIndex) => {
      return createMissionTableCell(mission, missionTableField, missionIndex, cellIndex, false)
    })
  })
}

export const createMissionTableData = (missions: CompleteMission[], fieldNames: string[])  => {
  const missionTableFields: MissionTableField[] = createMissionTableFields(fieldNames)

  const headers = missionTableFields.map((missionTableField: MissionTableField) => {
    return {
      title: missionTableField.title,
      classNames: missionTableField.headClassNames,
    }
  })
  const rows = createMissionTableRows(missions, missionTableFields)

  return {
    headers,
    rows,
  }
}

const createGroupedMissionTableRows = (missionGroups: MissionGroup[], missionTableFields: MissionTableField[], headers: MissionTableCell[]) => {
  return missionGroups.map((group: MissionGroup, rowIndex: number) => {
    const cells = [{
      title: group.title,
      classNames: headers[0].classNames.concat([groupTitleCellClassName]),
    }]

    group.missions.forEach((mission: CompleteMission, missionIndex: number) => {
      missionTableFields.forEach((missionTableField: MissionTableField, cellIndex) => {
        if (cellIndex === 0) {
          return
        }

        const { title, classNames, headClassNames } = createMissionTableCell(mission, missionTableField, missionIndex, cellIndex, true)

        if (rowIndex === 0) {
          headers.push({
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

export const createHeadlineClassNames = (missionIndex?: number): string[] => {
  const classNames = [cellClassName, headlineCellClassName]

  if (missionIndex != null) {
    classNames.push(`${missionCellClassNamePrefix}${missionIndex}`)
  }

  if (missionIndex > 0) {
    classNames.push(gapClassName)
  }

  return classNames
}

const createGroupedMissionHeaderHeadline = (missionGroups: MissionGroup[], headers: MissionTableField[], fieldNames: string[], missionHeadlineField: string) => {
  let classNames = createHeadlineClassNames()
  const headerHeadline: MissionTableCell[] = [
    {
      title: '',
      classNames: classNames.concat([groupTitleCellClassName]),
      colspan: 0,
    }
  ]

  missionGroups[0].missions.forEach((mission: CompleteMission, missionIndex) => {
    classNames = createHeadlineClassNames(missionIndex)

    headerHeadline.push({
      title: mission[missionHeadlineField],
      colspan: fieldNames.length - 1,
      classNames,
    } as MissionTableCell)
  })

  return headerHeadline
}

export const createGroupedMissionsTableData = (missionGroups: MissionGroup[], fieldNames: string[], missionHeadlineField?: string) => {
  const missionTableFields: MissionTableField[] = createMissionTableFields(fieldNames)
  const headers = [missionTableFields[0]]
  const rows = createGroupedMissionTableRows(missionGroups, missionTableFields, headers)
  const headerHeadline = missionHeadlineField != null ?
    createGroupedMissionHeaderHeadline(missionGroups, headers, fieldNames, missionHeadlineField) : null

  return {
    headerHeadline,
    headers,
    rows,
  }
}
