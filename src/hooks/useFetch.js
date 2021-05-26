/* eslint-disable prettier/prettier */
import * as React from 'react'

export const useFetch = (method, arg) => {
	const [data, setData] = React.useState([])

	const fetchData = React.useCallback(async () => {
		try {
			const response = await method(arg)
			setData(response)
		} catch (e) {
			console.log(e)
		}
	}, [method, arg])

	React.useEffect(() => {
		fetchData()
	}, [fetchData, arg])

	return { data, fetchData }
}
