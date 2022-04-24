import React from 'react'

import cx from 'classnames'
import css from './Text.module.scss'

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type TextProps = {
  text: string
  size: Size
  className?: string
  onClick?: () => void
}

export const Text = ({ text, size, className, onClick }: TextProps) => (
  <div
    className={cx(
      css.text,
      {
        [css.text_small]: size === Size.small,
        [css.text_medium]: size === Size.medium,
        [css.text_large]: size === Size.large,
      },
      className,
    )}
    onClick={onClick}
  >
    {text}
  </div>
)
