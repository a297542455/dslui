export function filterStr(str) {
  // 替换字符串中的所有特殊字符（包含空格）
  if (str) {
    // eslint-disable-next-line no-useless-escape
    const pattern = /\\|\/|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\-|\_|\~|\`|\|/g
    const newStr = str.replace(pattern, '')

    return newStr
  }

  return str
}
