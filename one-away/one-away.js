const isAtMostOneEditAway = (a, b) => {
    if (a.length < b.length - 1 || a.length > b.length + 1) {
        // If one of our strings is larger than the other by 2 characters it is 2 edits away
        return false
    }

    let changes = 0
    let hasLengthChange = a.length !== b.length

    if (!hasLengthChange) {
        // If our strings have the same length we're only looking for a replace edit
        for (let i = 0; i < a.length; i++) {
            const aChar = a.charAt(i)
            const bChar = b.charAt(i)
            if (aChar !== bChar) changes++
            if (changes > 1) return false
        }
        return true
    } else {
        // Otherwise one of our strings has an additional character, so we need to check that all other characters are matching
        const longestLength = Math.max(a.length, b.length)
        // Start at the beginning of both strings
        let aIndex = 0
        let bIndex = 0

        // Loop over the characters checking for a matches
        for (let i = 0; i < longestLength; i++) {
            // console.log('i =', i)
            // console.log('aIndex =', aIndex)
            // console.log('bIndex =', bIndex)
            const aChar = a.charAt(aIndex) // l
            const bChar = b.charAt(bIndex) // l
            // console.log('a', aChar)
            // console.log('b', bChar)
            if (aChar !== bChar) {
                // If we find a deviation we have found our 1 edit! 
                // Move the character pointer 'i' forward 1 place on the string that has the edit to check the rest of the characters are the same
                // console.log('a is not equal to b')
                aIndex = a.length > b.length ? aIndex : aIndex - 1
                bIndex = b.length > a.length ? bIndex : bIndex - 1
                // Keep track of how many changes we've detected
                changes++
            }
            if (changes > 1) {
                // If we've discovered more than one change early we can return false here
                return false
            }
            aIndex++
            bIndex++
        }
        if (changes > 1) return false
        return true
    }
}

console.log(`Test: 'abc', 'abc' should be true`, isAtMostOneEditAway('abc', 'abc'))
console.log(`Test: 'abc', 'abd' should be true`, isAtMostOneEditAway('abc', 'abd'))
console.log(`Test: 'abc', 'afg' should be false`, isAtMostOneEditAway('abc', 'afg'))
console.log(`Test: 'apple', 'aple' should be true`, isAtMostOneEditAway('apple', 'aple'))
console.log(`Test: 'aple', 'apple' should be true`, isAtMostOneEditAway('aple', 'apple'))
console.log(`Test: 'ab12', 'ab3' should be false`, isAtMostOneEditAway('ab12', 'ab3'))
console.log(`Test: 'ab3', 'ab12' should be false`, isAtMostOneEditAway('ab3', 'ab12'))

