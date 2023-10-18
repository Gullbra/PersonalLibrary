import { expect } from 'chai';
import { capitalizeSentence } from '../capitalization'
import { SetExpanded } from '../setsAndMaps'


describe ('capitalizeSentence', () => {
  it('with filter', () => expect(capitalizeSentence('the story about an elephant and a fox', ['the', 'an', 'and', 'a', 'about'])).to.equal('the Story about an Elephant and a Fox'))
})


describe('SetExpanded', () => {
  describe('.addAll', () => {
    it('([1, "5", true])', () => {
      const testInstence = new SetExpanded<number|string|boolean>()
      testInstence.addAll([1, "5", true])
      expect(testInstence).to.eql(new Set([1, "5", true]))
      expect(testInstence).to.not.eql(new Set(["5", true]))
    })
  })

  describe('.hasAll', () => {
    const testInstence = new SetExpanded([1, "5", true])

    it('(...notAllArgs)', () => {
      expect(testInstence.hasAll([1, "6"])).to.be.false
    })
    it('(...allArgs)', () => {
      expect(testInstence.hasAll(["5", true])).to.be.true
    })
    it('(...moreUniqueArgsThanSize)', () => {
      expect(testInstence.hasAll([1, "5", true, 2])).to.be.false
    })
    it('(...duplicateArgsButAllAreIn)', () => {
      expect(testInstence.hasAll([1, "5", true, 1, "5", true])).to.be.true
    })
  })

  describe('.hasAny', () => {
    const testInstence = new SetExpanded([1, "5", true])

    it('(...oneIsRight)', () => {
      expect(testInstence.hasAny([1, "6"])).to.be.true
    })
    it('(...noneIsRight)', () => {
      expect(testInstence.hasAny(["6", false])).to.be.false
    })
  })
})