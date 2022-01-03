import { ReposCardProps } from "../models/ReposCardModel";

const ReposCard = ({
  name,
  owner: { avatar_url, login, organizations_url },
  stargazers_count,
  followers_url,
}: ReposCardProps) => {
  return (
    <div className="cards__grid__card">
      <img
        className="cards__grid__card__img"
        src={avatar_url}
        alt="User Profile"
      />
      <div className="cards__grid__card__content">
        <div>
          <p>repository name</p>
          <p>{name}</p>
        </div>
        <div>
          <p>author</p>
          <p>{login}</p>
        </div>
        <div>
          <p>stars</p>
          <p>{stargazers_count}</p>
        </div>
        <a href={organizations_url}>
          <p>organizations</p>
        </a>
        <a href={followers_url}>
          <p>followers</p>
        </a>
      </div>
    </div>
  );
};

export default ReposCard;
