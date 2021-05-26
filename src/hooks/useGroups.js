/* eslint-disable prettier/prettier */
import * as React from 'react'
import { getTaskGroups } from '../utils/api'

export const useGroups = (boardId) => {
	const [data, setData] = React.useState([])
	React.useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await getTaskGroups(boardId)
				setData(response)
			}
			fetchData()
		} catch (e) {
			console.log(e)
		}
	}, [boardId])

	return data
}
