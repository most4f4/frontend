// store/atoms.js

import {  atom  } from 'jotai'

export const authStatusAtom = atom(false);


export const bookAtom = atom([])
export const currentPageAtom = atom(0)
export const totalBooksAtom = atom(0)