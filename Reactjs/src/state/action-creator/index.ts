export const depositMoney = (amount: any) => {
  return (dispatch: any) => {
    dispatch({
      type: "deposit",
      payload: amount,
    });
  };
};
