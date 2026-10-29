document.getElementById("registerForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    const name= document.getElementById("fullName").value;
    const email= document.getElementById("email").value;
    const password= document.getElementById("password").value;
    const confirmPassword= document.getElementById("confirmPassword").value;
    const newUser={
        name,
        email,
        password
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email||!name||!password) {
        alert("Can nhap du du lieu");
        return;
    }
    if (password.length<6) {
        alert("Do dai mat khau phai lon hon 6");
        return;
    }
    if (confirmPassword!==password) {
        alert("Mat khau nhap lai sai, vui long nhap dung");
        return;
    }
    if (!regexEmail.test(email)) {
        alert("Can nhap dung dinh dang email");
        return;
    }
    axios.post("http://localhost:3000/register",newUser).then(()=>{
        location.replace("login.html");
        alert("Dang ky thanh cong");
    }).catch(()=>{
        alert("Dang ky that bai")
    })
})