export function formatDate(date, locale = 'en') {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
}
