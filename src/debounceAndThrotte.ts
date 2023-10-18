/**
 * Wraps provided function inside a promise so that, when it's called, it resolves after a specified amount of milliseconds after it was last called.
 * @param func Function to be wrapped.
 * @param waitFor Milliseconds before resolve.
 * @returns A wrapped, callable, function.
 * @see https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 */
export const debounceWrapper = <F extends (...args: any[]) => any>(func: F, waitFor: number = 1000) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<F>): Promise<ReturnType<F>> => (
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor)
    })
  )
}


/**
 * Wraps provided function to add throttling. Once the wrapped function has been called, it wont be callable again for specified amount of milliseconds.
 * Saves the last unsuccessful call, and calls it after the waiting period ends.
 * @param func Function to be wrapped.
 * @param delay Minimum milliseconds between calls.
 * @returns Nothing. Designed for event control.
 * @see https://www.youtube.com/watch?v=cjIswDCKgu0
 */
export const throttleWrapper = <F extends (...args: any[]) => any>(func: F, delay: number = 1000) => {
  let shouldWait = false,  waitingArgs: Parameters<F> | null

  const timoutFunction = () => {
    if (waitingArgs == null) {
      shouldWait = false
      return
    }

    func(...waitingArgs)
    waitingArgs = null
    setTimeout(timoutFunction, delay)
  }

  return (...args: Parameters<F>): void => {
    if(!!shouldWait) {
      waitingArgs = args
      return 
    }

    shouldWait = true
    setTimeout(timoutFunction, delay)
    func(...args)
  }
}