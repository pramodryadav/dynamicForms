export const getSubdirectory = () => {
    const path = window.location.pathname.split("/");
    return path[1];
};