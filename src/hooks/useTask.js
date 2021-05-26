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
			// eslint-disable-next-line no-console
			console.log(e)
		}
	}, [boardId])

	return data
}
