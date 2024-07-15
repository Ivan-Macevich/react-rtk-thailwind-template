import { AppDispatch, RootState } from "../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export * from "./useArrayRef";
export * from "./useListState";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
