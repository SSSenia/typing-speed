export  default interface ITypeRun {
  language: 'en' | 'ru' | 'ua',
  type: 'text-end' | 'time-end';
  size: 'small' | 'medium' | 'long' | 'infinity';
  time: '30s' | '60s' | '90s' | '120s' | 'infinity';
}