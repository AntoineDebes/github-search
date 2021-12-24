import "./Homepage.scss";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FindParamModel {
  find: string;
  findOption: any;
}

const Homepage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindParamModel>();
  const [findOption, setFindOption] = useState(undefined);

  const handleSelectedChange = (e: any) => {
    setFindOption(e.target.value);
  };

  const onChange: SubmitHandler<FindParamModel> = (data) => {
    let params: FindParamModel = {
      find: data.find,
      findOption,
    };
  };
  return (
    <div className="wrapper" id="wrapper">
      <section className="search">
        <div className="search__container">
          <i className="search__container__github-icon fab fa-github" />
          <div className="search__container__content">
            <h3>GitHub Searcher</h3>
            <p>Search users or repositories below</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onChange)} className="search__form">
          <input
            className="search__form__input"
            type="text"
            placeholder="Start typing to search .."
            {...register("find", { required: true })}
          />
          <div className="search__form__container">
            <select
              className="search__form__container__select"
              value={findOption}
              {...register("findOption", {
                required: true,
              })}
              onChange={handleSelectedChange}
            >
              <option value="user">Users</option>
              <option value="repository">Repository</option>
            </select>
            <i className="search__form__container__dropdown-icon fas fa-caret-down" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Homepage;
