const options: Intl.DateTimeFormatOptions = {
  // month: '2-digit',
  // day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
