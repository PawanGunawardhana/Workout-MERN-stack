import { useAuthContext } from "./useAuthContext";
import  useWorkoutsContext  from "./useWorkoutsContext";

const Logout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  };
  return { logout };
};

export default Logout;
