/* eslint-disable prettier/prettier */
import * as React from 'react'

export const useFetch = (method, arg) => {
	const [data, setData] = React.useState([])

	const fetchData = React.useCallback(async () => {
		const response = await method(arg)
		setData(response)
	}, [method, arg])

	React.useEffect(() => {
		try {
			fetchData()
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e)
		}
	}, [fetchData, arg])

	return { data, fetchData }
}
