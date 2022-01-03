export interface ReposCardProps {
  name: string;
  owner: {
    avatar_url: string;
    login: string;
    organizations_url: string;
  };
  stargazers_count: string;
  followers_url: string;
}
