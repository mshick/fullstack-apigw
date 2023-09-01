import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API } from 'aws-amplify'

type Pet = {
	id: string
	name: string
	type: string
}
function PetDetailsPage() {
	const router = useRouter()
	const [pet, setPet] = useState<Pet>()

	useEffect(() => {
		const { petId } = router.query
		API.get('MyPetsAPI', `/pets/${petId}`, {}).then((res) => {
			console.log(res)
			setPet(res as Pet)
		})
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get('name') as string,
		}
		await API.post('MyPetsAPI', `/pets`, {
			body: { id: pet?.id, name: data.name },
		})
		setPet({ ...pet, ...data } as Pet)

		const target = e.target as HTMLFormElement
		target.reset()
	}

	return (
		<>
			<h1>PetDetailsPage</h1>
			<h2>Name: {pet?.name}</h2>
			<h2>Type: {pet?.type}</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Update Name:
					<input type="text" name="name" placeholder="new dog name" />
				</label>
				<button>Submit</button>
			</form>
		</>
	)
}

export default PetDetailsPage
