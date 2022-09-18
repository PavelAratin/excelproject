//чистая функция, реагирует только на входящие параметры и не влияет на глобальное окружение
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}