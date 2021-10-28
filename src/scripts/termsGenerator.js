const margins = require('../settings-margins')
// function getCountForNormalTask() {
//   return 0
// }
function zeroPadding(n) {
  return ('0' + n).slice(-2)
}
function formatTime(date) {
  const hour = date.getHours()
  const min = date.getMinutes()
  return `${zeroPadding(hour)}:${zeroPadding(min)}`
}
export default {
  /**
   * タスク一覧を元に最適なカウント一覧を返す
   * @param tasks - シミュレートするタスク一覧
   * @returns {Promise<{id: Number, count: Number}[]>}
   */
  getTermSettings() {
    const now = new Date()
    const settings = {
      terms: [
        { start: formatTime(now), finish: formatTime(new Date(now.getTime() + margins.terms[0].finish * 60000))},
        { start: formatTime(new Date(now.getTime() + margins.terms[1].start * 60000)),
          finish: formatTime(new Date(now.getTime() + margins.terms[1].finish * 60000))},
      ],
      restTimes: [
        { start: formatTime(new Date(now.getTime() + margins.restTimes[0].start * 60000)),
          finish: formatTime(new Date(now.getTime() + margins.restTimes[0].finish * 60000))},
        { start: formatTime(new Date(now.getTime() + margins.restTimes[1].start * 60000)),
          finish: formatTime(new Date(now.getTime() + margins.restTimes[1].finish * 60000))},
      ]
    }
    console.log(settings)
    return settings
  }
}
