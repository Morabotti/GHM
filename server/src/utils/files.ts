import * as fs from 'fs'

export const deleteFile = (
  path: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(fs.unlinkSync(path))
    }
    catch (err) {
      console.log(err)
      reject(Error)
    }
  })
}

export const renameFile = (
  oldPath: string,
  newPath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.rename(`${oldPath}`, `${newPath}`, function (err) {
      if (err) reject(err)
      resolve()
    })
  })
}

export const getFileExtension = (filename: string) => {
  return filename.split('.').pop()
}
