import { SetStateAction } from "react";
import { Dispatch } from "react";

export interface ILoadMore {
    isEnd?: boolean
    canLoadNext?: boolean,
    getMore?: (...args:any[]) => void
}