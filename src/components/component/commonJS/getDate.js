export default () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const getInfo = {
    month,
    day,
    year
  };

  return getInfo;
};
