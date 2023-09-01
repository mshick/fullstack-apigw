import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'

type Pet = {
	id: string
	name: string
	owner: string
	type: string
}
export default function Home() {
	const [pets, setPets] = useState<Pet[]>([])
	useEffect(() => {
		API.get('MyPetsAPI', '/pets', {})
			.then((res) => {
				return setPets(res as Pet[])
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<main>
			<h1>Pets</h1>
			<ul>
				{pets.map((pet) => (
					<li key={pet.id}>{pet.name}</li>
				))}
			</ul>
		</main>
	)
}
