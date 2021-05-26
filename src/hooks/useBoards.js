/* eslint-disable prettier/prettier */
import * as React from 'react'
import { getBoards } from '../utils/api'

export const useBoards = () => {
	const [data, setData] = React.useState([])
	React.useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await getBoards()
				setData(response)
			}
			fetchData()
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e)
		}
	}, [])

	return data
}
