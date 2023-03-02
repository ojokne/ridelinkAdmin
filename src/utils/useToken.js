const useToken = () => {
  return sessionStorage.getItem("adminToken") ?? false;
};

export default useToken;
