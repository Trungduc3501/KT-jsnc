document.getElementById("loginForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=document.getElementById("email").value; 
    const password=document.getElementById("password").value; 
    const loginUser={
        email,
        password
    }
    axios.post("http://localhost:3000/login",loginUser).then((res)=>{
        localStorage.setItem("accessToken",res.data.accessToken);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        location.replace("index.html");
        alert("Dang nhap thanh cong");

    })
})