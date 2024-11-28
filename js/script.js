var bookName = document.getElementById("bookName");
var bookSite = document.getElementById("bookSite");
var siteContainer = [];

if (localStorage.getItem("userBook") !== null) {
    siteContainer = JSON.parse(localStorage.getItem("userBook"))
    displayBook()
}


function createBook() {

    if (!bookName.value || !bookSite.value) {
       
        errorName.classList.remove("d-none")
        bookName.classList.add("is-invalid")
        bookSite.classList.add("is-invalid")
        errorSite.classList.remove("d-none")
      
        return;
    }





    for (var i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].name === bookName.value) {
            window.alert("This bookmark was written by ")
        }
        return;
    }


    var dataBook = {
        name: bookName.value,
        site: bookSite.value,
    }
    siteContainer.push(dataBook);
    localStorage.setItem("userBook", JSON.stringify(siteContainer))
    console.log(siteContainer);
    displayBook();
    clearForm();
    bookName.classList.remove("is-valid");
    bookSite.classList.remove("is-valid");


}

function clearForm() {
    bookName.value = ""
    bookSite.value = ""
}


function displayBook() {
    var cartona = "";
    for (var i = 0; i < siteContainer.length; i++) {
        cartona += `
                <tr class="fw-normal">
                    <td>${i + 1}</td>
                    <td><span>${siteContainer[i].name}</span></td>
                    <td>
                        <button class="btn btn-success eye" onclick="visitWebsite('${siteContainer[i].site}')">
                            <i class="fa-solid fa-eye pe-2"></i><span>Visit</span>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteBookmark(${i})">
                            <i class="fa-solid fa-trash"></i><span>Delete</span>
                        </button>
                    </td>
                </tr>
            `;
    }
    document.getElementById('allBooks').innerHTML = cartona;
}


function visitWebsite(url) {
    window.open(url, "_blank");
}


function deleteBookmark(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            siteContainer.splice(index, 1);
            localStorage.setItem("userBook", JSON.stringify(siteContainer))
            displayBook();
        }
    });
}


function validateBookName() {
    var regex = /^[A-Za-z0-9]{2,15}$/
    var errorName=document.getElementById("errorName")
    if (regex.test(bookName.value)) {
        bookName.classList.add("is-valid")
        bookName.classList.remove("is-invalid")
        errorName.classList.add("d-none")
    } else {
        bookName.classList.remove("is-valid")
        bookName.classList.add("is-invalid")
        errorName.classList.remove("d-none")
    }
}

function validateBookSite() {
var regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}$/
var errorSite=document.getElementById("errorSite")
if (regex.test(bookSite.value)) {
    bookSite.classList.add("is-valid")
    bookSite.classList.remove("is-invalid")
    errorSite.classList.add("d-none")
} else {
    bookSite.classList.remove("is-valid")
    bookSite.classList.add("is-invalid")
    errorSite.classList.remove("d-none")
}
}

