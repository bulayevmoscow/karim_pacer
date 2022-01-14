import {FC} from "react";

type THeader = {
    someNumber: number
}


export const Header : FC<THeader> = ({someNumber}) => {
    return (
        <div>Some {someNumber}</div>
    )
}