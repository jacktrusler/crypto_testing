import { useState } from 'react'
import './App.css'
import { parseEther } from 'ethers/lib/utils';
import { BigNumberInput } from './components/BigNumberInput';
import { BigNumber } from 'ethers';

function App() {
  const [cryptoish, setCryptoish] = useState(BigNumber.from('0'))

  function handleCrypto(e) {
    const { target } = e;
    if (onlyDigits(target.value)) {
      setCryptoish(parseEther(target.value).toString())
    }
  }

  /**
   * Function that matches a string with digits, 1 period, and more digits
   */
  function onlyDigits(s: string): boolean {
    const pattern = /^\d*\.?\d*$/
    return pattern.test(s)
  }

  // const displayValue = cryptoish ? BigNumber.from(cryptoish).toString() : ""
  return (
    <div>
      <label>Crypto Time</label>
      <BigNumberInput
        decimals={18}
        value={cryptoish}
        onChange={setCryptoish}
        min='0'
        max='100000000000000000000000000'
      />

      {cryptoish}
    </div>
  )
}

export default App
