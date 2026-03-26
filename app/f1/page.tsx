import Link from "next/link"

export default function F1(){
    return (<> <h1>
        F1 Page
    </h1>
    <div><Link href={"/f1/f2"}>Go to F2 Page</Link></div>
    <div><Link href={"/f3"}>Go to F3 Page</Link></div>
</>)
}