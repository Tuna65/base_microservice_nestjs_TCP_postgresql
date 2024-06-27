
const checkNullList = <T>(value: T) => {
  if (value == '' || value == null || !value) return true;
  return false;
};
