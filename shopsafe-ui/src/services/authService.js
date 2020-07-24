const token = () => {
    const jwt = localStorage.getItem("token");

    if (jwt) return jwt;
    else {
        alert("Please Sign In first");
        window.location = "/signin";
        return null;
    }
}
 
export default token;