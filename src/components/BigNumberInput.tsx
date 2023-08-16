import { BigNumber } from 'ethers'
import * as React from 'react'

import { formatUnits, parseUnits } from 'ethers/lib/utils.js'

export type BigNumberInputProps = {
  decimals: number
  value: string
  onChange: (value: string) => void
  renderInput?: (props: React.HTMLProps<HTMLInputElement>) => React.ReactElement
  autofocus?: boolean
  placeholder?: string
  max?: string
  min?: string
}

export function BigNumberInput({
  autofocus,
  decimals,
  max,
  min,
  onChange,
  placeholder = '0.00',
  renderInput,
  value,
}: BigNumberInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [inputValue, setInputvalue] = React.useState('')

  // update current value
  React.useEffect(() => {
    if (!value) {
      setInputvalue('')
    } else {
      let parseInputValue: BigNumber | undefined

      try {
        parseInputValue = parseUnits(inputValue || '0', decimals)
      } catch {
        // do nothing
      }

      if (!parseInputValue || !parseInputValue.eq(value)) {
        setInputvalue(formatUnits(value, decimals))
      }
    }
  }, [value, decimals, inputValue])

  React.useEffect(() => {
    if (!renderInput && autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement
      node.focus()
    }
  }, [autofocus, inputRef, renderInput])

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    if (value === '') {
      onChange(value)
      setInputvalue(value)
      return
    }

    let newValue: BigNumber
    try {
      newValue = parseUnits(value, decimals)
    } catch (e) {
      // don't update the input on invalid values
      return
    }

    const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max))
    if (invalidValue) {
      return
    }

    setInputvalue(value)
    onChange(newValue.toString())
  }

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: 'text',
    value: inputValue,
  }

  return renderInput ? renderInput({ ...inputProps }) : <input {...inputProps} ref={inputRef} />
}
