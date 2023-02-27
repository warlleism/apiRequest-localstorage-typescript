import useRepositoryLikeManagement from './hooks/useRepositoryLikeManagement/useRepositoryLikeManagement';
import { useGithubRepositories } from './hooks/useGitRepositories/useGitRepositories';
import './App.css'


function App() {

  const { response, isLoading, error, refetch } = useGithubRepositories({ org: 'google' });

  const { repositoryLike, handlerLike } = useRepositoryLikeManagement()
  
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
