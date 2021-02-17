import fs from 'fs'
import path from 'path'

/**
 * Finds nested files in a directory matching the pattern specified
 * @param dir Path of directory
 * @param extention Extension to find
 */
export const findFilesByType = (dir: string, extention: string) => {
  let results: string[] = []

  // Read specified folder and for each folder/ file inside of it
  fs.readdirSync(dir).forEach(innerDir => {
    // Join the child folder / file to the parent path we fir specified as `dir`
    innerDir = path.resolve(dir, innerDir)

    // Get file/dir information
    const stat = fs.statSync(innerDir)

    // If path is a directory, rerun this function with the folder path as the dir param to get all the files inside of it
    if (stat.isDirectory()) {
      // Add the resulting file paths of the nested directory
      results = results.concat(findFilesByType(innerDir, extention))
    }

    // If the file path was a file and NOT a directory add it to the results array
    if (stat.isFile() && innerDir.endsWith(extention)) results.push(innerDir)
  })

  // Return array of file paths
  return results
}
