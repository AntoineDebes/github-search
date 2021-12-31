const fetchData = (state = false, action: { type: any }) => {
  switch (action.type) {
    case "SIGN-IN":
      return !state;
  }
};

export default fetchData;
