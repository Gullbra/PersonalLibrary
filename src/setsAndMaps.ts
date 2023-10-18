/**
 * @implements SetExpandedDev<T> No need to copy over. Only used for making this code easier to write.
 */
interface SetExpandedDev<T> extends Set<T>{
  addAll(iterable: Iterable<T>): void

  hasAny(iterable: Iterable<T>): boolean

  hasAll(iterable: Iterable<T>): boolean
}
export class SetExpanded<T> extends Set<T> implements SetExpandedDev<T> {
  addAll(iterable: Iterable<T>): void {
    for (let el of iterable)
      this.add(el);
  }
  
  hasAny(iterable: Iterable<T>): boolean {
    for (let el of iterable)
      if (super.has(el))
        return true;

    return false;
  }
  
  hasAll(iterable: Iterable<T>): boolean {
    for (let el of iterable)
      if (!super.has(el))
        return false;

    return true
  }
}


/**
 * Creates and returns a Map from two arrays of the same size. Throws an error when the arrays aren't of the same size.
 * @param arrKeys Will be converted into Map-keys.
 * @param arrValues Will be converted into Map-values.
 */
export const mapFromArrays = <T,U>(arrKeys: T[], arrValues: U[]): Map<T, U> => {
  if(arrKeys.length !== arrValues.length)
    throw new RangeError('Args for mapFromArrays(arrKeys, arrValues) must have the same length.')

  return arrKeys.reduce(
    (prev, curr, index) => {
      if((typeof curr === "object" && curr !== null) || typeof curr === 'function')
        throw new TypeError("Setting an object or a function as a key in a Map will make it's value unreasonably cumbersome to retrieve.")
  
      return prev.set(curr, arrValues[index])
    }, 
    new Map<T, U>()
  )
}