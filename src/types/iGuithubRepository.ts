export interface IGuithubRepository {
    id: number;
    full_name: string;
    owner: {
        login: string;
    }
}