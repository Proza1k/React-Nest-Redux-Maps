import cx from 'classnames'
import css from './Map.module.scss'
import { YMaps, Map, Polyline, ZoomControl } from 'react-yandex-maps'
import { MapConfiguration } from 'src/types/map.types'

export type MapProps = {
  className?: string
  mapConfiguration: MapConfiguration
}

export const Maps = ({ mapConfiguration, className }: MapProps) => (
  <YMaps>
    <Map state={mapConfiguration.state} className={cx(css.map, className)} defaultState={mapConfiguration.state}>
      <Polyline
        geometry={mapConfiguration.polyline.geometry}
        color={mapConfiguration.polyline.color}
        strokeWidth={400}
      />
      <ZoomControl state={mapConfiguration.state} />
    </Map>
  </YMaps>
)
