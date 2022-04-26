import cx from 'classnames'
import css from './Map.module.scss'
import { YMaps, Map, Polyline, ZoomControl } from 'react-yandex-maps'
import { MapConfiguration } from 'src/types/map.types'
import { useEffect } from 'react'

export type MapProps = {
  className?: string
  mapConfiguration: MapConfiguration
}

export const Maps = ({ mapConfiguration, className }: MapProps) => {
  return (
    <YMaps>
      <Map state={mapConfiguration.state} className={cx(css.map, className)} defaultState={mapConfiguration.state}>
        <Polyline
          geometry={mapConfiguration.polyline.geometry}
          color={mapConfiguration.polyline.color}
        />
        <ZoomControl state={mapConfiguration.state} />
      </Map>
    </YMaps>
  )
}
