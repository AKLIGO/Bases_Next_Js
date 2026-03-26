export default function DashbordComplexLayout(
    {children,
    users,
    product_CRUD,
    revenusMetrique,
    notification
    }: {children: React.ReactNode;
        users:React.ReactNode;        product_CRUD:React.ReactNode;
        revenusMetrique:React.ReactNode;
        notification:React.ReactNode;
    }
){
    return (
        <section
            style={{
                width: "100%",
                minHeight: "calc(100vh - 32px)",
                padding: "12px",
                boxSizing: "border-box",
            }}
        >
            <div>{children}</div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "16px",
                    minHeight: "calc(100vh - 92px)",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "repeat(3, minmax(0, 1fr))",
                        gap: "16px",
                    }}
                >
                    <div style={{ display: "flex" }}>{users}</div>
                    <div style={{ display: "flex" }}>{product_CRUD}</div>
                    <div style={{ display: "flex" }}>{revenusMetrique}</div>
                </div>
                <div style={{ display: "flex" }}>{notification}</div>
            </div>
        </section>
    );
}