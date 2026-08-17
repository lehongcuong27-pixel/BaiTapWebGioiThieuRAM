

let productsList = []

async function renderList() {
      const list = await fetch("http://localhost:3000/rams")
      productsList = await list.json()

      const productsContainer = document.querySelector(".products-container")

      productsList.forEach((pro) => {
        let card = document.createElement("section")
        card.classList.add("product-card")
        card.innerHTML = `<img src="${pro.imageUrl[0]}" alt="${pro.name}">`
        let productInfo = document.createElement("div")
        productInfo.classList.add("product-info")
        card.appendChild(productInfo)
        productInfo.innerHTML = `<h3>${pro.name}</h3>`
        let price = document.createElement("div")
        price.classList.add("product-price")
        price.innerHTML = `<p>${pro.price}</p>
        <button><img src="../IMG/cart-icon.png" alt="Thêm vào giỏ hàng"></button>`
        productInfo.appendChild(price)

        card.addEventListener('click', () =>{
          window.location.href = `ProductDetails.html?id=${pro.id}`
        })
        productsContainer.appendChild(card)

       addToCart(pro, card)
      })
    }
function addToCart(product, card) {
        const addtoCart = card.querySelector("button")
        addtoCart.addEventListener('click', (e) => {
          e.stopPropagation();
          const quantity = 0 ;
          const productsInCart = JSON.parse(localStorage.getItem("products")) || [];

          const existingProduct = productsInCart.find((item) => item.id === product.id)

          if (existingProduct){
            existingProduct.quantity = String(Number(existingProduct.quantity)+1)
          }
          else{
            productsInCart.push({id: product.id, name: product.name, price: product.price,image: product.imageUrl[0], quantity: "1"})
          }
          
          localStorage.setItem("products", JSON.stringify(productsInCart))
     })
}

renderList()

