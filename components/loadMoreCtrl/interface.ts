import { SetStateAction } from "react";
import { Dispatch } from "react";

export interface ILoadMore {
    setPage: Dispatch<SetStateAction<number>>,
    setPrevPage?:Dispatch<SetStateAction<number>>
    page: number,
    canLoadNext?: boolean
}