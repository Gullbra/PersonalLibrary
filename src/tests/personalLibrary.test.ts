import { expect } from 'chai';
import { capitalizeSentence } from '../capitalization'
import { SetExpanded , MapExpanded } from '../setsAndMaps'


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

    it('takes a Set', () => {
      const testInstence = new SetExpanded<number|string|boolean>()
      testInstence.addAll(new Set([1, "5", true]))
      expect(testInstence).to.eql(new Set([1, "5", true]))
    })

    it('takes a string', () => {
      const testInstence = new SetExpanded<number|string|boolean>()
      testInstence.addAll('hey you')
      expect(testInstence).to.eql(new Set(["h", "e", "y", " ", "o", "u"]))
    })

    it('takes a Map', () => {
      const testInstence = new SetExpanded()
      testInstence.addAll(new Map([[1, 2], [2, 3]]))
      expect(testInstence).to.eql(new Set([[1, 2], [2, 3]]))
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


describe ("MapExpanded", () => {
  const testInstence = new MapExpanded<number|string|boolean, number|string|boolean>([[1, 2], ["5", 7], [true, false]])

  describe('.hasAll', () => {
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
    it('(...oneIsRight)', () => {
      expect(testInstence.hasAny([1, "6"])).to.be.true
    })
    it('(...noneIsRight)', () => {
      expect(testInstence.hasAny(["6", false])).to.be.false
    })
  })
})