import { CardProps } from "../models/CardModel";
import "./UsersCard.scss";

const Card = ({
  avatar_url,
  login,
  repos_url,
  organizations_url,
  followers_url,
}: CardProps) => {
  return (
    <div className="cards__grid__card">
      <img
        className="cards__grid__card__img"
        src={avatar_url}
        alt="User Profile"
      />
      <div className="cards__grid__card__content">
        <div>
          <p>Username</p>
          <p>{login}</p>
        </div>
        <a href={repos_url}>
          <p>Repos</p>
        </a>
        <a href={organizations_url}>
          <p>Organizations</p>
        </a>
        <a href={followers_url}>
          <p>followers_url</p>
        </a>
      </div>
    </div>
  );
};

export default Card;
