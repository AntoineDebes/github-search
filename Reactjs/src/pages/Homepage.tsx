import "./Homepage.scss";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppContext } from "../context/AppContext";

interface FindParamModel {
  searchName: string;
  searchTarget: any;
  pageRange: number;
}

const Homepage = () => {
  const { fetchDataFromSearchContext, appContextStore, setAppContextStore } =
    useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindParamModel>();
  const [searchTarget, setSearchTarget] = useState("users");

  useEffect(() => {
    setSearchTarget(searchTarget);
  }, [searchTarget]);

  const handleSelectedChange = (e: any) => {
    setSearchTarget(e.target.value);
  };

  const onChangeSubmitForm: SubmitHandler<FindParamModel> = (data) => {
    console.log("data", data);

    let params: FindParamModel = {
      searchName: data.searchName,
      searchTarget: searchTarget,
      pageRange: 1,
    };
    if (fetchDataFromSearchContext !== undefined) {
      fetchDataFromSearchContext({ bodyData: params });
    }
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
        <form className="search__form">
          <input
            className="search__form__input"
            type="text"
            placeholder="Start typing to search .."
            {...register("searchName", {
              onChange: () => handleSubmit(onChangeSubmitForm),
            })}
          />
          <div className="search__form__container">
            <select
              className="search__form__container__select"
              value={searchTarget}
              {...register("searchTarget", {
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
