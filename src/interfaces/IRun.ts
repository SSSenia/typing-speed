export default interface IRun {
  id: number,
  date: Date,
  type: 'text-end' | 'time-end';
  language: string,
  symbols: number,
  words: number,
  mistakes: number,
  time: number
}