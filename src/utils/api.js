import { format } from 'date-fns'
import { get, post, put, patch, del } from './http'

// You might come across a different syntax for using env vars
// which would use process.env.API_HOST.
const baseURL = import.meta.env.VITE_API_HOST

/* Boards */

export async function createBoard(name) {
  const defaultBoardData = {
    name: name || '',
  }
  return post(`${baseURL}/boards`, defaultBoardData)
}

export async function getBoards() {
  return get(`${baseURL}/boards`)
}

export async function getBoard(boardId) {
  return get(`${baseURL}/boards/${boardId}?_embed=taskGroups&_embed=tasks`)
}

export async function updateBoard(boardId, data) {
  return patch(`${baseURL}/boards/${boardId}`, data)
}

export async function removeBoard(boardId) {
  return del(`${baseURL}/boards/${boardId}`)
}

/* Task Groups */

export function createTaskGroup(boardId, name) {
  const defaultTaskGroupData = {
    name: name || '',
    boardId,
    taskIds: [],
  }
  return post(`${baseURL}/taskGroups`, defaultTaskGroupData)
}

export function getTaskGroups(boardId) {
  return get(`${baseURL}/taskGroups?boardId=${boardId}`)
}

export function updateTaskGroup(taskGroupId, data) {
  return patch(`${baseURL}/taskGroups/${taskGroupId}`, data)
}

export function updateTaskGroups(taskGroups) {
  const p = []
  taskGroups.forEach((group) => {
    p.push(put(`${baseURL}/taskGroups/${group.id}`, group))
  })
  return Promise.all(p)
}

export async function removeTaskGroup(taskGroupId) {
  const taskGroup = await get(`${baseURL}/taskGroups/${taskGroupId}`)
  await del(`${baseURL}/taskGroups/${taskGroupId}`)

  const p = []
  taskGroup.taskIds.forEach((taskId) => {
    p.push(del(`${baseURL}/tasks/${taskId}`))
  })

  // Cascade remove all related tasks
  await Promise.all(p)
}

/* Tasks */

export async function getTasks(boardId) {
  return get(`${baseURL}/tasks?boardId=${boardId}`)
}

export async function getTask(taskId) {
  return get(`${baseURL}/tasks/${taskId}`)
}

export async function createTask(boardId, taskGroupId, data) {
  const defaultTaskData = {
    name: '',
    content: '',
    minutes: 0,
    completedMinutes: 0,
    assignedTo: [],
    ...data,
    boardId,
    date: format(Date.now(), 'yyyy-MM-dd'),
  }
  const task = await post(`${baseURL}/tasks`, defaultTaskData)
  const taskGroup = await get(`${baseURL}/taskGroups/${taskGroupId}`)
  const newTaskIds = taskGroup.taskIds.concat(task.id)
  await patch(`${baseURL}/taskGroups/${taskGroupId}`, { taskIds: newTaskIds })
  return task
}

export function updateTask(taskId, task) {
  return put(`${baseURL}/tasks/${taskId}`, task)
}

export async function removeTask(boardId, taskId) {
  await del(`${baseURL}/tasks/${taskId}`)
  const taskGroups = await get(`${baseURL}/taskGroups/?boardId=${boardId}`)
  const newTaskGroups = taskGroups.map((taskGroup) => {
    return { ...taskGroup, taskIds: taskGroup.taskIds.filter((id) => id !== taskId) }
  })
  await updateTaskGroups(newTaskGroups)
  return null
}
