// ------------------------------------------------------------------
//
// https://github.com/type-challenges/type-challenges/blob/main/questions/09384-hard-maximum/README.md
//
// Implement the type Maximum, which takes an input type T, and returns the maximum value in T.
//
// If T is an empty array, it returns never. Negative numbers are not considered.
//
// ------------------------------------------------------------------

import Type from 'typebox'

// ------------------------------------------------------------------
// Solution:  Reduced to enable inference to pass (max-4)
// ------------------------------------------------------------------
const Comparers = Type.Script(`
  type BuildTuple<Size extends number, Tuple extends unknown[] = []> = (
    Tuple['length'] extends Size 
      ? Tuple 
      : BuildTuple<Size, [...Tuple, unknown]>
  )
  export type LessThan<Left extends number, Right extends number> = Left extends Right ? false
    : BuildTuple<Left> extends [...BuildTuple<Right>, ...infer _Rest] ? false
    : true
  export type LessThanEqual<Left extends number, Right extends number> = (
    Left extends Right ? true : LessThan<Left, Right>
  )
  export type GreaterThan<Left extends number, Right extends number> = (
    LessThan<Right, Left>
  )
  export type GreaterThanEqual<Left extends number, Right extends number> = (
    LessThanEqual<Right, Left>
  )
`)

const { ResultA, ResultB, ResultC } = Type.Script(Comparers, `
  type Maximum<T extends unknown[], N extends number = 0> = 
    T extends [infer Left, ...infer Right]
      ? GreaterThan<Left, N> extends true
        ? Maximum<Right, Left>
        : Maximum<Right, N>
      : N extends 0 ? never : N

  type ResultA = Maximum<[]>               // never
  type ResultB = Maximum<[0, 2, 1]>        // 2
  type ResultC = Maximum<[0, 2, 4, 1, 2]>  // 4

`)

type ResultA = Type.Static<typeof ResultA>
type ResultB = Type.Static<typeof ResultB>
type ResultC = Type.Static<typeof ResultC>

// ------------------------------------------------------------------
// Assert
// ------------------------------------------------------------------
import * as Assert from '../common/assert.ts'
const Test = Assert.Context('Type.Challenge')

Test('09384-hard-maximum', () => {
  Assert.IsExtendsMutual<ResultA, never>(true)
  Assert.IsExtendsMutual<ResultB, 2>(true)
  Assert.IsExtendsMutual<ResultC, 4>(true)

  Assert.IsEqual(ResultA, Type.Script(`never`))
  Assert.IsEqual(ResultB, Type.Script(`2`))
  Assert.IsEqual(ResultC, Type.Script(`4`))
})
