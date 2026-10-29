function logout(params) {
     axios.post("http://localhost:3000/logout").then((res)=>{

        localStorage.removeItem("accessToken",res.data.accessToken);
        localStorage.removeItem("user",JSON.stringify(res.data.user));
        location.replace("index.html");
    })
}

document.getElementById("logoutButton").addEventListener("click",logout());