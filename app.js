const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const buttonWrapper = document.querySelector(".button-wrapper");
const imageListwrapper = document.querySelector(".imagelist-wrapper");
const message = document.querySelector("#message");

runEventListener();

function runEventListener() {
    form.addEventListener("submit", search)
    clearButton.addEventListener("click", clear)
}
function search(e) {
    const value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}&per_page=30`, {
        method: "get",
        headers: {
            Authorization: "Client-ID w4hiwcKpMSy2HQNLiLQgkQ-TAcPZ7V6CwNPl0X6nVVM"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (imageListwrapper.children.length > 0) {
                clear();
            }
            Array.from(data.results).forEach((image) => {
                addImageToUi(image.urls.small,);
            })
            message.innerHTML = `<b>' ${value} '</b> için <b> ${imageListwrapper.children.length} </b> sonuç bulundu
            `;

        })
        .catch((err) => { console.log(err) })
    e.preventDefault();
}

function addImageToUi(url) {
    const div = document.createElement("div");
    div.className = "col-md-4 mx-auto shadow-lg p-3 mb-3 bg-body-tertiary rounded";

    const img = document.createElement("img");
    img.className = "rounded w-100";
    img.height = "400"
    img.setAttribute("src", url)

    div.appendChild(img);
    imageListwrapper.appendChild(div);

    searchInput.value = "";

}

function clear(e) {
    imageListwrapper.innerHTML = "";
}