import { getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";

export type LocationObjectType = {
  latitude: number | undefined;
  longitude: number | undefined;
};

type State = {
  coordinates: LocationObjectType | null;
};

const initialState: State = {
  coordinates: null,
};

export const Context = createContext<{ state: State; dispatch: Dispatch<any>;}>({
  state: initialState,
  dispatch: () => null,
});

// define actions
type Action =
  | { type: "ADD_USER_LOCATION"; payload: LocationObjectType }

// define reducer
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_USER_LOCATION":
      return {
        ...state,
        coordinates: { longitude: action.payload.longitude, latitude: action.payload.latitude },
      };
    default:
      return state;
  }
};

interface ContextProviderProps {
  children: ReactNode;
}
// define context provider
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getLocation() {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await getCurrentPositionAsync();
        await dispatch({ type: "ADD_USER_LOCATION", payload: coords });
      } else {
        throw new Error('Location permission not granted');
      }
    }
    getLocation();
    watchPositionAsync({ accuracy: 6, timeInterval: 5000, distanceInterval: 1 }, (location) => {
      dispatch({ type: "ADD_USER_LOCATION", payload: location.coords });
    }
    );
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

// use global state
export const useGlobalState = () => useContext(Context);