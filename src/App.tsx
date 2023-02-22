import { useGithubRepositories } from './hooks/useGitRepositories/useGitRepositories';
import './App.css'
import { useState } from 'react';

type RepositoryState = {
  id: number;
  liked: boolean;
}

function App() {

  const { response, isLoading, error, refetch } = useGithubRepositories({ org: 'google' });
  const [repositoryLike, setRepositoryLikes] = useState<RepositoryState[]>([]);

  function handlerLike(id: number) {

    setRepositoryLikes((prevState) => {
      const exists = prevState.find((r) => r.id === id);

      if (exists) {
        return prevState.map((r) =>
          r.id === id ? { ...r, liked: !r.liked } : r
        );
      }

      return [...prevState, { id, liked: true }];
    })
  }

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <div>
        <p>Erro ao carregar dados</p>
        <button onClick={refetch}>Tentar novamente</button>
      </div>}
      {response.map((data) => {
        const isLiked = repositoryLike.find((r) => r.id === data.id)?.liked;
        return (
          <div key={data.id}>
            <h2>{data.full_name}</h2>
            <span>by {data.owner.login}</span>
            <button onClick={() => handlerLike(data.id)}>{isLiked ? 'Gostei' : 'like'}</button>
          </div>
        )
      })}
    </div>
  )
}

export default App
