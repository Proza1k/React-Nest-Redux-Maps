import React from 'react'

import cx from 'classnames'

import css from './Header.module.scss'
import { Heading, Size } from '../common/Heading'

export const Header = () => {
  return (
    <header className={cx(css.header)}>
      <Heading value="Home" size={Size.large} />
    </header>
  )
}
