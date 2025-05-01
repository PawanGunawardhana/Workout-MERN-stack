import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};

export default useWorkoutsContext;

