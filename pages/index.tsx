import { useEffect } from 'react'
import { API } from 'aws-amplify'

export default function Home() {
	// useEffect(() => {
	// 	API.get('MyPetsAPI', '/pets')
	// 		.then((res) => console.log(res))
	// 		.catch((err) => console.log(err))
	// }, [])

	useEffect(() => {
		fetch('https://4hbkyijns8.execute-api.us-east-1.amazonaws.com/prod/pets')
			.then((res) => res.json())
			.then((data) => console.log({ data }))
			.catch((err) => console.log({ err }))
	}, [])
	return <main></main>
}
