interface SideNavPaperStylesParams {
    width: number | string;
}

interface SideNavPaperStyles {
    [key: string]: Record<string, unknown>;
}

export const sideNavPaperStyles = (width: number | string): SideNavPaperStyles => ({
    "& .MuiDrawer-paper": {
        width: width,
        boxSizing: "border-box",
        backgroundColor: "#F9FAFB",
        borderRight: "1px solid #e0e0e0",
        padding: "10px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            width: "4px"
        },
        "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px"
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#D2D7D7",
            borderRadius: "10px",
            "&:hover": {
                background: "#9f9f9fff"
            }
        }
    }
});
