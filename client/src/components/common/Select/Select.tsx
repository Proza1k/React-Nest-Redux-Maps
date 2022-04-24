import React, { ChangeEventHandler, useState } from 'react'

import cx from 'classnames'
import css from './Select.module.scss'

export type SelectProps = {
  className?: string
  options?: Array<{
    value: string
    label: string
  }> | null
  value?: string | null
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export const Select = ({ className, options, value = '', placeholder, onChange }: SelectProps) => (
  <div className={cx(css.select_container, className)}>
    <span className={cx(css.select_placeholder)}>{placeholder}</span>
    <select className={cx(css.select, className)} value={value ?? ''} onChange={onChange}>
      {options &&
        options.map((option) => {
          return <option value={option.value}>{option.label}</option>
        })}
    </select>
  </div>
)
