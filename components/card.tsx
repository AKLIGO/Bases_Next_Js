import type { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
    const cardStyle= {
        width: "100%",
        height: "100%",
        minHeight: "220px",
        padding: "24px",
        margin:"0",
        border:"1px solid #ddd",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        boxSizing: "border-box" as const,
        
    };
    return <div style={cardStyle}>
        {children}
    </div>
}