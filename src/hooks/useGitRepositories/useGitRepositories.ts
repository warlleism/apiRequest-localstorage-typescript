
import { useCallback, useEffect, useState } from 'react';
import { IGuithubRepository } from './../../types/iGuithubRepository';

type Props = {
    org: string;
}

export function useGithubRepositories({ org }: Props) {

    const [response, setResponse] = useState<IGuithubRepository[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetcher = useCallback(() => {
        fetch(`https://api.github.com/orgs/${org}/repos`)
            .then(res => res.json())
            .then(data => setResponse(data))
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    useEffect(() => {
        fetcher()
    }, [fetcher]);

    return { response, isLoading, error, refetch: fetcher }

}
