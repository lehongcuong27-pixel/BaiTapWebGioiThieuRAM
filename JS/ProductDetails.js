const getID = new URLSearchParams(window.location.search)
const idProduct = getID.get("id")

async function renderProduct() {
    const list = await fetch("http://localhost:3000/rams")
    const products = await list.json()

    const product = products.find((item) => String(item.id) === String(idProduct))

    if (!product) {
        console.error("Không tìm thấy sản phẩm")
        return window.location.href = "products.html"
    }

    const container = document.querySelector(".product-container")
    let content = document.createElement("section")
    
    product_specs_and_info(product, content, container)
    product_description(product, content)    
    container.appendChild(content)
    container.innerHTML += `<div>
    <h3>Thêm vào giỏ hàng:</h3>
    <button><img src="../IMG/cart-icon.png" alt="Thêm vào giỏ hàng"></button>
    </div>`
    addToCart(product, container)
}

function getYouTubeEmbedUrl(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    const match = url.match(regex)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

function product_specs_and_info(product, content, container) {
    container.innerHTML = `<h1 class = "product-name">${product.name}</h1>
    <button><img src="../IMG/back-arrow.png" alt="Quay lại" onclick="window.history.back()"></button>`
    content.classList.add("product-detail-info")
    content.innerHTML = `<img src="${product.imageUrl?.[0]}" alt="${product.name}">`
    const specs = document.createElement("div")
    specs.classList.add("product-specs")
    specs.innerHTML = `<h3>Thông số kỹ thuật:</h3>
    <div>
        <h4>Thương hiệu: </h4><p>${product.brand}</p>
    </div>
    <div>
        <h4>Loại RAM: </h4><p>${product.type}</p>
    </div>
    <div>
        <h4>Dung lượng: </h4><p>${product.capacity}</p>
    </div>
    <div>
        <h4>Tốc độ: </h4><p>${product.speed}</p>
    </div>
    <div>
        <h4>Thiết bị tương thích: </h4><p>${product.formFactor}</p>
    </div>`
    content.appendChild(specs)
    container.appendChild(content)
}
function product_description(product, content){
    let description = document.createElement("section")
    description.classList.add("product-description")
    description.innerHTML = `<h3>${product.title}</h3>
    <img src="${product.imageUrl?.[1]}" alt="${product.name}">
    <p>${product.description}</p>
    <img src="${product.imageUrl?.[2]}" alt="${product.name}">
    <p>${product.description2}</p>`

    let video = document.createElement("div")
    video.classList.add("video-description")
    const videoUrl = product.video || ""
    const embedUrl = getYouTubeEmbedUrl(videoUrl)
    video.innerHTML = `<h3>Video giới thiệu:</h3><iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    video.setAttribute("allowfullscreen", "")
    content.appendChild(description)
    content.appendChild(video)
    return content
}
function addToCart(product, detailPage) {
         const addtoCart = detailPage.querySelector("button")
        addtoCart.addEventListener('click', (e) => {
          e.stopPropagation();
          const productsInCart = JSON.parse(localStorage.getItem("idProducts")) || [];
          productsInCart.push(product.id)
          localStorage.setItem("idProducts", JSON.stringify(productsInCart))
     })
}
renderProduct()