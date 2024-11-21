import { useAppSelector } from "@/redux/hooks.ts";

const useIsAdmin = () => {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  return isAdmin;
};

export default useIsAdmin;
