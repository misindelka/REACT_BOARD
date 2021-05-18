export async function get(url) {
  const response = await fetch(url)
  return response.json()
}

export async function getRaw(url) {
  return fetch(url)
}

export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function put(url, data) {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function patch(url, data) {
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function del(url) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
