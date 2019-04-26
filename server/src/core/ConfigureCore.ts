import * as jsonfile from 'jsonfile'

import { Countries } from '../types'

const mainFileCountries = './static/config/countries.json'

export const getCountries = () => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(mainFileCountries, (err, mainObj) => {
      if (err) reject(err)
      resolve(mainObj)
    })
  })
}

export const setCountries = (countries: Countries) => {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(mainFileCountries, countries, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}