import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import Link from 'next/link'

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

	async function handlePetDelete(id: string) {
		setPets(pets.filter((pet) => pet.id !== id))
		await API.del('MyPetsAPI', `/pets`, { body: { id } })
	}

	const handleCreatePetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get('name') as string,
			type: formData.get('type') as string,
		}
		await API.post('MyPetsAPI', `/pets`, {
			body: { name: data.name, type: data.type },
		})

		const target = e.target as HTMLFormElement
		target.reset()
	}
	return (
		<main>
			<h1>Pets</h1>
			<ul>
				{pets.map((pet) => (
					<li>
						<Link href={`/pets/${pet.id}`}>{pet.name} </Link>
						<button onClick={() => handlePetDelete(pet.id)}>X</button>
					</li>
				))}
			</ul>
			<h2>Create a Pet</h2>
			<form onSubmit={handleCreatePetSubmit}>
				<label>
					Name:
					<input type="text" name="name" placeholder="new dog name" />
				</label>
				<label>
					Type:
					<input type="text" name="type" placeholder="new dog type" />
				</label>
				<button>Submit</button>
			</form>
		</main>
	)
}
