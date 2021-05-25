/* eslint-disable prettier/prettier */
import * as React from 'react'

import { getTasks } from '../utils/api'

export const useTasks = (boardId) => {
	const [data, setData] = React.useState([])
	React.useEffect(() => {
		try {
			const fetchData = async () => {
				const responese = await getTasks(boardId)
				setData(responese)
			}
			fetchData()
		} catch (e) {
			console.log(e)
		}
	}, [boardId, data])

	return data
}
