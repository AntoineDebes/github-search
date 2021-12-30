import { useEffect, useState } from "react";
import "./Homepage.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import UsersCard from "../component/UsersCard";
import { useDebounce } from "../hooks/useDebounce";

interface FindParamModel {
  searchName: string;
  searchTarget: any;
  pageRange: number;
}

const Homepage = () => {
  const {
    fetchDataFromSearchContext,
    appContextStore,
    setAppContextStore,
    resetAppContext,
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState<any>(false);
  const [pageRange, setPageRange] = useState<number>(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindParamModel>();

  useEffect(() => {
    if (!!resetAppContext && Object.keys(errors).length > 0) {
      console.log("reset");
      resetAppContext();
    }
  }, [errors.searchName]);

  useEffect(() => {
    handleSubmit(onChangeSubmitForm)(searchTerm);
  }, [pageRange]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSubmit(onChangeSubmitForm)(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const onChangeSubmitForm: SubmitHandler<FindParamModel> = ({
    searchName,
    searchTarget,
  }) => {
    console.log(searchName, searchTarget, "here");

    if (!!fetchDataFromSearchContext && searchName.length > 2) {
      console.log("pageRange", pageRange);

      let params: FindParamModel = {
        searchName: searchName,
        searchTarget: searchTarget,
        pageRange: pageRange,
      };
      fetchDataFromSearchContext({ bodyData: params, searchTarget });
    }
  };

  const loadMoreHandler = () => {
    setPageRange((prevValue) => {
      return prevValue + 1;
    });
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
        <form
          onChange={(event) => {
            setSearchTerm(event);
          }}
          className="search__form"
        >
          <div className="search__form__input__container">
            <input
              className="search__form__input"
              type="text"
              placeholder="Start typing to search .."
              {...register("searchName", {
                required: true,
                pattern: {
                  value: /^.{3,}/,
                  message: "Minimum of 3 characters",
                },
              })}
            />
            {errors.searchName && (
              <span className="text-danger">{errors.searchName.message}</span>
            )}
          </div>

          <div className="search__form__container">
            <select
              className="search__form__container__select"
              {...register("searchTarget", {
                required: true,
              })}
            >
              <option value="users">User</option>
              <option value="repositories">Repository</option>
            </select>
            <i className="search__form__container__dropdown-icon fas fa-caret-down" />
          </div>
        </form>
      </section>
      <section className="cards__grid">
        {appContextStore?.users?.map((_card: any, index: number) => {
          return <UsersCard key={index} {..._card} />;
        })}
        {appContextStore?.repositories?.map((_card: any, index: number) => {
          return <UsersCard key={index} {..._card} />;
        })}
      </section>
      <div>
        <button onClick={loadMoreHandler}>Load more</button>
      </div>
    </div>
  );
};

export default Homepage;
