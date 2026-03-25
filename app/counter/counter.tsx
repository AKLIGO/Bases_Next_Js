"use client";

import { useState } from "react";


// export const metadata={
//     title:"Counter page",
//     description:"This is counter page"
//  }

export function Counter(){
    const [count, setCount] = useState(0);

    return <div>
        <h2>Counter: {count}</h2>
        <button onClick={()=>setCount(count+1)}>Increment</button>
        <button onClick={()=>setCount(count-1)}>Decrement</button>
    </div>

}