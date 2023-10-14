import { expect } from 'chai';
import { capitalizeWord } from './personalLibrary'

describe ('testing', () => {
  it('hey', () => {
    expect(capitalizeWord('hey')).to.equal('Hey')
  })
})