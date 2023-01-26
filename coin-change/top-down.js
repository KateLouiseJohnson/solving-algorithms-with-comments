const optimalChangeCalculator = (coins, value) => {
  console.log('-------------------------')
  console.log(`For value: ${value}`)

  const coinComparison = {}
  for (const coin of coins) {
    const remainder = value - coin
    console.log(`Looking at coin ${coin}, after deducting ${coin} from ${value} to get ${remainder}`)
    if (remainder === 0) {
      console.log(`We've made change, set coin ${coin} to 1`)
      coinComparison[coin] = 1
    }
    if (remainder > 0) {
      console.log(`We've still got more to deduct, lets try deduct the coins again from ${remainder}`)
      coinComparison[coin] = 1 + optimalChangeCalculator(coins, remainder)
    }
    if (remainder < 0) {
      console.log(`We've gone over our limit, this combination will not work, set coin ${coin} to -1`)
      coinComparison[coin] = -1
    }
  }

  const min = Object.values(coinComparison).reduce((acc,  value) => {
    return value < acc && value > 0 ? value : acc
  }, value + 1)

  console.log(`Coin combinations:`, JSON.stringify(coinComparison, null, 2))
  console.log(`The smallest amount we have from our 3 coin combinations is ${min}`)

  return min
}

console.log(optimalChangeCalculator([1,2,3], 10))