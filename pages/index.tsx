import { useEffect } from 'react'
import { API } from 'aws-amplify'

export default function Home() {
	useEffect(() => {
		API.get('MyPetsAPI', '/pets', {})
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	}, [])

	return <main></main>
}
