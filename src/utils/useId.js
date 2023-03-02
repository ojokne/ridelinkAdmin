const useId = () => {
  return sessionStorage.getItem("adminId") ?? false;
};

export default useId;
