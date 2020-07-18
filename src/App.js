import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
	const [ repos, setRepos ] = useState([])

	useEffect(() => {
		fetchRepositories()
	}, []);

	async function fetchRepositories() {
		const { data } = await api.get('/repositories')

		setRepos([...repos, ...data])
	}

	async function handleAddRepository() {
		const repo = {
			title: 'Teste' + repos.length,
			url: 'http://github.com/franciscosvargas',
			techs: []
		}

		const { data } = await api.post('/repositories', repo)

		setRepos([...repos, data])
	}

	async function handleRemoveRepository(id) {
		const { status } = await api.delete(`/repositories/${id}`) 

		if(status === 204) {
			const repoIndex = repos.findIndex(repo => repo.id === id)
			const newRepoArray = repos
			newRepoArray.splice(repoIndex, 1)

			setRepos([...newRepoArray])
		}
	}

	return (
		<div>
		<ul data-testid="repository-list">

			{repos.map(repo => (
				<li key={repo.id}>
					{repo.title}

					<button onClick={() => handleRemoveRepository(repo.id)}>
						Remover
					</button>
				</li>
			))}
			
		</ul>

		<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
