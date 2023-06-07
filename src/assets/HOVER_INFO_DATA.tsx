export const HOVER_INFO_DATA = new Map()
  // Setup page  
  .set('setup.language.en', 'Set the test language to English')
  .set('setup.language.ru', 'Set the test language to Russian')
  .set('setup.language.ua', 'Set the test language to Ukrainian')

  .set('setup.type.text-end', 'Set test pass type to text-end (the test will run until the specified number of characters is over)')
  .set('setup.type.time-end', 'Set test pass type to text-end (the test will run until the specified time is over)')

  .set('setup.size.small', 'Set the required number of characters to pass to 100')
  .set('setup.size.medium', 'Set the required number of characters to pass to 250')
  .set('setup.size.long', 'Set the required number of characters to pass to 500')

  .set('setup.time.30s', 'Set the required amount of time to pass in 30 seconds')
  .set('setup.time.60s', 'Set the required amount of time to pass in 60 seconds')
  .set('setup.time.90s', 'Set the required amount of time to pass in 90 seconds')
  .set('setup.time.120s', 'Set the required amount of time to pass in 120 seconds')


  // Statistic page
  .set('statistic.head.id', 'Element identifier')
  .set('statistic.head.date', 'Date of passage ')
  .set('statistic.head.type', 'Type of passage, or until the end of the timer, or until the end of the number of characters')
  .set('statistic.head.language', 'Passing language')
  .set('statistic.head.symbols', 'Number of characters entered')
  .set('statistic.head.words', 'Number of words entered')
  .set('statistic.head.mistakes', 'Number of mistakes made')
  .set('statistic.head.time', 'Time spent on passing')

  .set('statistic.actions.select-all', 'Select all records')

  .set('statistic.actions.delete', 'Delete selected records')
  .set('statistic.actions.export', 'Copy selected records')
  .set('statistic.actions.import', 'Paste copied records');