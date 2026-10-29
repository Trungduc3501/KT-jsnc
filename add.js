document.getElementById("form-add").addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=document.getElementById("name").value;
    const duration=document.getElementById("duration").value;
    const thumbnail=document.getElementById("thumbnail").value;
    const category=document.getElementById("category").value;
    const newData= {
        name,
        duration,
        thumbnail,
        category
    }
    if (!name ||!duration||!thumbnail||!category) {
        alert("Can nhap du du lieu");
        return;
    }
    if (duration<0) {
        alert("Thoi luong can lon hon hoac bang 0");
        return;
    }if (name.length<5) {
        alert("Ten khoa hoc can dai hon 5 ky tu");
        return;
    }
    axios.post("http://localhost:3000/courses",newData).then(()=>{
        location.replace("index.html");
        alert("Them du lieu thanh cong");
    }).catch(()=>{
        alert("Them du lieu that bai");
    })
})