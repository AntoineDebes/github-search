/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Homepage.scss";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useAppContext } from "../context/AppContext";
import UsersCard from "../component/UsersCard";
import { useDebounce } from "../hooks/useDebounce";
import ReposCard from "../component/ReposCard";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { FindParamModel } from "../models/HomepageModel";

const Homepage = () => {
  // const {
  //   fetchDataFromSearchContext,
  //   appContextStore,
  //   setAppContextStore,
  //   resetAppContext,
  // } = useAppContext();

  const fetchedData = useSelector((state: any) => state.search);
  const dispatch = useDispatch();
  const { fetchAppData, resetAppData } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [searchTerm, setSearchTerm] = useState<any>(false);
  const [pageRange, setPageRange] = useState<number>(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 750);
  const contentDataVerification = !!(
    fetchedData?.users?.length || fetchedData?.repositories?.length
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindParamModel>();

  useEffect(() => {
    if (!!resetAppData && !!Object.keys(errors).length) {
      resetAppData();
    }
  }, [errors.searchName]);

  useEffect(() => {
    handleSubmit(onChangeSubmitForm)(searchTerm);
  }, [pageRange]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSubmit(onChangeSubmitForm)(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const onChangeSubmitForm: SubmitHandler<FindParamModel> = ({
    searchName,
    searchTarget,
  }) => {
    if (!!fetchAppData && searchName.length > 2) {
      let params: FindParamModel = {
        searchName: searchName,
        searchTarget: searchTarget,
        pageRange: pageRange,
      };
      fetchAppData({ bodyData: params, searchTarget, searchName });
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
              <option value="repositories">Repo</option>
            </select>
            <i className="search__form__container__dropdown-icon fas fa-caret-down" />
          </div>
        </form>
      </section>
      {contentDataVerification && (
        <section className="cards__grid">
          {fetchedData?.users?.map((_card: any, index: number) => {
            return <UsersCard key={index} {..._card} />;
          })}
          {fetchedData?.repositories?.map((_card: any, index: number) => {
            return <ReposCard key={index} {..._card} />;
          })}
        </section>
      )}
      {contentDataVerification && (
        <div className="loadmore__container">
          <button onClick={loadMoreHandler}>Load more</button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
