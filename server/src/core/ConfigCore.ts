import * as jsonfile from 'jsonfile'

export const getConfig = (file: string) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, mainObj) => {
      if (err) reject(err)
      resolve(mainObj)
    })
  })
}

export const setConfig = (file: string, data: any) => {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, data, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}
