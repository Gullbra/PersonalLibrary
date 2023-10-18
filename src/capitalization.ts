/**
 * Capitalizes string.
 */
export const capitalizeWord = (word: string): string =>  word.length === 0 ? word : word.length === 1 ? word[0].toUpperCase() : word[0].toUpperCase() + word.substring(1)


/**
 * Capitalizes sentence.
 * @param filters Optional array of words to exclude from capitalization. Casesensitive.
 */
export const capitalizeSentence = (sentence: string, filters?: string[]): string => {
  return !filters
    ? sentence.split(' ').map(capitalizeWord).join(' ')
    : sentence.split(' ').map((word) => filters.includes(word) ? word : capitalizeWord(word)).join(' ')
}
