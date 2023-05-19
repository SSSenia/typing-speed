export interface IRun {
  date: Date,
  type: 'text-end' | 'time-end';
  language: string,
  symbols: number,
  words: number,
  time: number
}