const fs = require('fs')

class AllResultsCsvReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options

    if (!this._options.outputDir) {
      this._options.outputDir = '.'
    }

    if (!this._options.outputFile) {
      this._options.outputFile = 'all_result.csv'
    }
  }

  onRunComplete(contexts, results) {
    let result4csv = ['"id","module","name","file","status","duration"\n']
    const suites = results.testResults
    for (const suite of suites) {
      console.log("Suite:");
      console.log(suite);
      for (const testCase of suite.testResults) {
        console.log("Test Case:");
        console.log(testCase);
        result4csv.push(`"${suite.displayName}::${testCase.title}","${suite.displayName}","${testCase.title}","${suite.testFilePath}","${testCase.status}","${testCase.duration}"\n`)
      }
    }
    fs.writeFile(`${this._options.outputDir}/${this._options.outputFile}`, result4csv.join(''), err => {
      if (err) {
        console.error(err)
      } else {
        console.log(`write all results to ${this._options.outputFile}`)
      }
    })
  }
}

module.exports = AllResultsCsvReporter 
