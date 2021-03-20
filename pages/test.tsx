import React from "react";
import { State } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    counter: number;
    increment: () => any;
    decrement: () => any;
}

const Component: React.FC<Props> = (props) => {
    const counter = useSelector<State, number>(state => state.signupReducer.counter);
    const dispatch = useDispatch();


    return <div>
        <h1>{ counter }</h1>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
}

export default Component;
