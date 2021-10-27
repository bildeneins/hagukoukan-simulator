function getCountForNormalTask() {
  return 0
}
function getCountForTask(task) {
  if (task.task_type === '定量作業') {
    return getCountForNormalTask()
  } else {
    return 0
  }
}
export default {
  /**
   * タスク一覧を元に最適なカウント一覧を返す
   * @param tasks - シミュレートするタスク一覧
   * @returns {Promise<{id: Number, count: Number}[]>}
   */
  getCounts(tasks) {
    return tasks.map(i => ({
      id: i.id,
      count: getCountForTask(i)
    }))
  }
}
