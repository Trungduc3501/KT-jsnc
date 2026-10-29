// function getData(params) {
//     axios.get("http://localhost:3000/courses").then((res)=>{
//         console.log(res.data);
//         const htnl= res.data.map((course,key)=>{
//             return`
//             <tr class="transition hover:bg-slate-50">
//                 <td class="border-b border-slate-100 px-4 py-3 text-center">
//                   ${key+1}
//                 </td>

//                 <td
//                   class="border-b border-slate-100 px-4 py-3 font-medium text-slate-800"
//                 >
//                   ${course.name}
//                 </td>

//                 <td class="border-b border-slate-100 px-4 py-3 text-center">
//                     ${course.duration}
//                 </td>

//                 <td class="border-b border-slate-100 px-4 py-3 text-center">
//                   <img
//                     src="${course.thumbnail}"
//                     class="mx-auto h-12 w-20 rounded object-cover"
//                   />
//                 </td>

//                 <td class="border-b border-slate-100 px-4 py-3">
//                   <span
//                     class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
//                   >
//                     ${course.category}
//                   </span>
//                 </td>

//                 <td class="border-b border-slate-100 px-4 py-3 text-center">
//                   <div class="flex items-center justify-center gap-2">
//                     <a
//                       class="button rounded bg-blue-500 px-3 py-1.5 text-white transition hover:bg-blue-600"
//                         href="edit.html?id=${course.id}"
//                     >
//                       Sửa
//                     </a>

//                     <button
//                       class="rounded bg-red-500 px-3 py-1.5 text-white transition hover:bg-red-600"
//                       onClick="deleteData('${course.id}')"
//                     >
//                       Xóa
//                     </button>
//                   </div>
//                 </td>
//               </tr>`
//         }).join("");
//         document.getElementById("list").innerHTML=htnl;
//     })
// }

// function deleteData(id) {
//     const result= confirm("Ban co chac chan muon xoa khong ?")
//     if (result) {
//             axios.delete(`http://localhost:3000/courses/${id}`).then(()=>{
//         location.replace("index.html");
//         alert("Xoa thanh cong");
//     }).catch(()=>{
//         alert("Xoa that bai");
//     })
//     }

// }




// getData();







// Lấy các phần tử trên giao diện
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const sortField = document.getElementById("sortField");
const sortOrder = document.getElementById("sortOrder");

// Lưu danh sách khóa học
let courses = [];

// Lấy dữ liệu từ API
async function getData() {
    try {
        const response = await axios.get(
            "http://localhost:3000/courses"
        );

        courses = response.data;

        // Hiển thị danh sách khóa học
        renderCourses();

    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        alert("Không thể tải danh sách khóa học!");
    }
}

// Tìm kiếm và sắp xếp khóa học
function renderCourses() {
    // Lấy từ khóa tìm kiếm
    const keyword = searchInput.value.trim().toLowerCase();

    // Lọc danh sách theo tên khóa học
    let result = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword);
    });

    // Lấy trường cần sắp xếp
    const field = sortField.value;

    // Lấy thứ tự sắp xếp
    const order = sortOrder.value;

    // Sắp xếp danh sách
    result.sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];

        // Sắp xếp theo Duration hoặc ID dạng số
        if (field === "duration" || field === "id") {
            valueA = Number(valueA);
            valueB = Number(valueB);

            if (!Number.isFinite(valueA)) valueA = 0;
            if (!Number.isFinite(valueB)) valueB = 0;

        } else {
            // Sắp xếp tên không phân biệt chữ hoa, chữ thường
            valueA = String(valueA ?? "").toLowerCase();
            valueB = String(valueB ?? "").toLowerCase();
        }

        // Tăng dần
        if (order === "asc") {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        }

        // Giảm dần
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    });

    // Hiển thị kết quả
    if (result.length === 0) {
        list.innerHTML = `
            <tr>
                <td colspan="6" class="px-4 py-6 text-center text-gray-500">
                    Không tìm thấy khóa học!
                </td>
            </tr>
        `;
        return;
    }

    list.innerHTML = result.map((course, index) => {
        return `
            <tr class="transition hover:bg-slate-50">
                <td class="border-b border-slate-100 px-4 py-3 text-center">
                    ${index + 1}
                </td>

                <td class="border-b border-slate-100 px-4 py-3 font-medium">
                    ${course.name}
                </td>

                <td class="border-b border-slate-100 px-4 py-3 text-center">
                    ${course.duration}
                </td>

                <td class="border-b border-slate-100 px-4 py-3 text-center">
                    <img
                        src="${course.thumbnail}"
                        alt="${course.name}"
                        class="mx-auto h-12 w-20 rounded object-cover"
                    />
                </td>

                <td class="border-b border-slate-100 px-4 py-3">
                    <span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                        ${course.category}
                    </span>
                </td>

                <td class="border-b border-slate-100 px-4 py-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <a
                            class="rounded bg-blue-500 px-3 py-1.5 text-white hover:bg-blue-600"
                            href="edit.html?id=${course.id}"
                        >
                            Sửa
                        </a>

                        <button
                            class="rounded bg-red-500 px-3 py-1.5 text-white hover:bg-red-600"
                            onclick="deleteData('${course.id}')"
                        >
                            Xóa
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

// Khi thay đổi trường sắp xếp
sortField.addEventListener("change", renderCourses);

// Khi thay đổi thứ tự tăng dần / giảm dần
sortOrder.addEventListener("change", renderCourses);

// Khi nhập từ khóa tìm kiếm
searchInput.addEventListener("input", renderCourses);

// Xóa khóa học
async function deleteData(id) {
    const result = confirm("Bạn có chắc chắn muốn xóa khóa học này không?");

    if (!result) return;

    try {
        await axios.delete(`http://localhost:3000/courses/${id}`);

        alert("Xóa khóa học thành công!");

        // Tải lại dữ liệu sau khi xóa
        await getData();

    } catch (error) {
        console.error("Lỗi xóa khóa học:", error);
        alert("Xóa khóa học thất bại!");
    }
}

// Chạy chương trình
getData();