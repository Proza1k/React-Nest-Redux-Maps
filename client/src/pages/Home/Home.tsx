import React from 'react'

import cx from 'classnames'
import css from './Home.module.scss'

import { Maps } from 'src/components/Map/Map'
import { Select } from 'src/components/common/Select/Select'
import { Text } from 'src/components/common/Text'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { Size } from 'src/components/common/Heading'
import { UPDATE_MAP } from 'src/redux/actions/map.actions'
import {
  generateCenterPosition,
  generateGeometryPolyline,
  generateOptionsNameBus,
  generateOptionsTimeBus,
  getColor,
  getMaxSpeed,
} from 'src/redux/utils/map.utils'
import { getBusByIdent, getAllTimePicker } from 'src/redux/utils/bus.utils'
import { getUnixTime } from 'src/helpers/time.helper'

export const Home = () => {
  const bus = useAppSelector((state) => state.bus)
  const map = useAppSelector((state) => state.map)
  const dispatch = useAppDispatch()

  const changeBus = (ident: string): void => {
    const currentBusData = getBusByIdent(bus, ident)

    if (currentBusData) {
      const allDataPicker = getAllTimePicker(currentBusData)

      if (allDataPicker.length > 0) {
        const startDate = allDataPicker[0]
        const endDate = allDataPicker[allDataPicker.length - 1]

        dispatch(
          UPDATE_MAP({
            state: {
              center: generateCenterPosition(currentBusData),
              zoom: 0,
            },
            polyline: {
              geometry: generateGeometryPolyline(currentBusData),
              color: getColor(),
            },
            maxSpeed: getMaxSpeed(currentBusData),
            time: {
              startDate: {
                value: startDate,
                options: generateOptionsTimeBus(allDataPicker),
              },
              endDate: {
                value: endDate,
                options: generateOptionsTimeBus(allDataPicker),
              },
            },
            currentBus: ident,
          }),
        )
      }
    }
  }

  const changeIntervalState = (ident: string | null, startDate: string | null, endDate: string | null): void => {
    if (!ident || !startDate || !endDate) {
      return
    }

    const currentBusData = getBusByIdent(bus, ident)

    if (currentBusData) {
      const allDataPicker = getAllTimePicker(currentBusData)
      const startDateUnix = getUnixTime(startDate)
      const endDateUnix = getUnixTime(endDate)
      const intervalBusData = currentBusData.directions.filter((direction) => {
        const directionUnix = getUnixTime(direction.server_timestamp)
        return directionUnix >= startDateUnix && directionUnix <= endDateUnix
      })

      if (intervalBusData) {
        const intervalState = {
          ident: ident,
          directions: intervalBusData,
        }

        dispatch(
          UPDATE_MAP({
            state: {
              center: generateCenterPosition(intervalState),
              zoom: 0,
            },
            polyline: {
              geometry: generateGeometryPolyline(intervalState),
              color: getColor(),
            },
            maxSpeed: getMaxSpeed(intervalState),
            time: {
              startDate: {
                value: startDate,
                options: generateOptionsTimeBus(allDataPicker),
              },
              endDate: {
                value: endDate,
                options: generateOptionsTimeBus(allDataPicker),
              },
            },
            currentBus: ident,
          }),
        )
      }
    }
  }

  return (
    <div className={cx(css.home)}>
      {map.data && bus.data && (
        <>
          <Maps mapConfiguration={map.data} />
          <div className={cx(css.home__select_container)}>
            <Select
              value={map.data.currentBus}
              onChange={(e) => changeBus(e.target.value)}
              placeholder={'Select Bus'}
              options={generateOptionsNameBus(bus.data)}
            />
            {map.data.time.startDate && map.data.time.endDate && (
              <>
                <Select
                  onChange={(e) =>
                    changeIntervalState(map.data!.currentBus, e.target.value, map.data!.time.endDate!.value)
                  }
                  value={map.data!.time.startDate!.value}
                  options={map.data!.time.startDate!.options}
                  placeholder="Select start date"
                />
                <Select
                  onChange={(e) =>
                    changeIntervalState(map.data!.currentBus, map.data!.time.startDate!.value, e.target.value)
                  }
                  value={map.data.time.endDate!.value}
                  options={map.data.time.endDate!.options}
                  placeholder="Выберите Дату конца"
                />
                <Text text={`Max speed: ${map.data.maxSpeed} км/ч`} size={Size.medium} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
