const ReposCard = () => {
  return (
    <div className="cards__grid__card">
      <img
        className="cards__grid__card__img"
        // src={avatar_url}
        alt="User Profile"
      />
      <div className="cards__grid__card__content">
        <div>
          <p>repository name</p>
          {/* <p>{login}</p> */}
        </div>
        <p>author</p>
        <p>author</p>

        <p>stars</p>
        <p>Organizations</p>
        <p>statistics</p>
        <p>followers_url</p>
      </div>
    </div>
  );
};

export default ReposCard;
