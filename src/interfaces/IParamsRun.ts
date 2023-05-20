export default interface IParamsRun {
  language: 'en' | 'ru' | 'ua',
  type: 'text-end' | 'time-end',
  size: number | 'infinity',
  time: number | 'infinity',
  keyboard: string[][]
}