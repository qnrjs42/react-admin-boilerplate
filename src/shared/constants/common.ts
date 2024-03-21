export const INPUT_TYPE_ATTRIBUTES: string[] = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
] as const;

export const TOAST_DURATION = {
  SUCCESS: 2000,
  WARNING: 3000,
  ERROR: 3000,
} as const;

export const DIALOG_DURATION = {
  CLOSE: 500,
} as const;
