const Background = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('/pup-bg.png')",
            }}>
            {children}
        </div>
    );
}

export default Background;