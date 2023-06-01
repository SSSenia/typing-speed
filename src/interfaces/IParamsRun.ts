export default interface IParamsRun {
  language: 'en' | 'ru' | 'ua',
  type: 'text-end' | 'time-end',
  size: number,
  time: number,
  keyboard: string[][],
  text: string
}