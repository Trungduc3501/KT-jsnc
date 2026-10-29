const id= new URLSearchParams(location.search).get("id");
function getData(params) {
    axios.get(`http://localhost:3000/courses/${id}`).then((res)=>{

        document.getElementById("name").value=res.data.name;
        document.getElementById("duration").value=res.data.duration;
        document.getElementById("thumbnail").value=res.data.thumbnail;
        document.getElementById("category").value=res.data.category;

    })
}

getData();

document.getElementById("form-edit").addEventListener("submit",(e)=>{
    e.preventDefault();
    const name= document.getElementById("name").value;
    const duration= document.getElementById("duration").value;
    const thumbnail= document.getElementById("thumbnail").value;
    const category= document.getElementById("category").value;
    const editData= {
        name,
        duration,
        thumbnail,
        category
    };
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
    axios.put(`http://localhost:3000/courses/${id}`,editData).then(()=>{
        location.replace("index.html");
        alert("SUa du lieu thanh cong")
    }).catch(()=>{
        alert("sua du lieu that bai");
    })
})