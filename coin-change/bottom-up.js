
const optimalChangeCalculator = (coins, value) => {
  const largerNumber = value + 1
  const subProblemMapping = Array.apply(null, Array(largerNumber)).map((_, i) => i !== 0 ? largerNumber : 0)
  
  console.log('Our default settings for all sub problem values', subProblemMapping.join(', '))

  // Calculate how many coins we need for each value, iterating up from one to our final total amount
  console.log('-------------------------')
  for (let currentValueInFocus = 1; currentValueInFocus < subProblemMapping.length; currentValueInFocus++) {
    console.log('Looking at value:', currentValueInFocus)
    console.log('-------------------------')
    for (const coin of coins) {
      console.log('Trying coin:', coin)
      if (coin > currentValueInFocus) {
        console.log(`Coin ${coin} is larger than our value ${currentValueInFocus}, so we cannot include combinations that have the ${coin} coin in them.`)
        continue; // If we can't subtract our coin from the current value we're looking at, skip this coin
      }
      const remainder = currentValueInFocus - coin // Try by subtracting the current coin we're focused on from the value we're currently looking at
      console.log('remainder:', remainder)
      const alreadyCalculatedSubProblemValue = subProblemMapping[remainder]  // We already know how many coins are needed for our sub problem
      console.log(`You can use ${alreadyCalculatedSubProblemValue} coin${alreadyCalculatedSubProblemValue > 1 ? 's' : ''} from our collection of coins (${coins.join(', ')}), to reach the total of ${remainder}`)
      const coinsUsed = 1 + alreadyCalculatedSubProblemValue // As we have used 1 coin, and we already know how many coins are needed to get the remainder we can add 1 coin to the amount needed for our remainder
      console.log(`Using this combination would then result in 1 + ${alreadyCalculatedSubProblemValue} = ${coinsUsed} coins needed to return the total of ${value}`)
      const min = Math.min(coinsUsed, subProblemMapping[currentValueInFocus]) // from the existing value we have currently set for our current value in focus (including the initial value and previous loops) pick the smallest
      console.log(`Choose the smaller option of our latest calculation: ${coinsUsed} vs any previously set value: ${subProblemMapping[currentValueInFocus]}`)
      subProblemMapping[currentValueInFocus] = min // Update our value to show the newest smallest number of coins required.
    }
    console.log('-------------------------')
  }

  const finalCalc = subProblemMapping[subProblemMapping.length - 1]

  const smallestNumCoins = finalCalc <= value ? finalCalc : -1 // If it was not possible to provide correct change for our input value, return -1, otherwise return our calculated smallest amount of coins

  console.log('All minimum coins required for each value up to our total:', subProblemMapping.join(', '))
  console.log(`Smallest number of coins needed to make: ${value}, with coins: [${coins.join(', ')}] is: ${smallestNumCoins}`)


  return smallestNumCoins
}

console.log(optimalChangeCalculator([1,5,7], 10));
