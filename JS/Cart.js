const itemsInCart = JSON.parse(localStorage.getItem("products"))
const container = document.querySelector('[name ="cart-container"]');
container.classList.add("cart-container");

function parseMoney(value) {
    const cleaned = String(value ?? "0").replace(/\./g, "").trim();
    const number = Number(cleaned);
    return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
    return Number(value).toLocaleString("vi-VN");
}

if (itemsInCart == null || itemsInCart.length === 0) {
    container.innerHTML = `<p>Giỏ hàng đang trống</p>`
}
else{
    renderCart(container,itemsInCart)
    totalCalc(container, itemsInCart)
    purchase(container)
}


 function renderCart(container, itemsInCart){

    itemsInCart.forEach((product) => {
        const item = document.createElement("div")
        item.classList.add("cart-items")
        item.innerHTML = `<img src = "${product.image}">
        <h3>${product.name}</h3>`
        const price = document.createElement("p")
        price.classList.add("item-price")
        const itemTotal = parseMoney(product.price) * Number(product.quantity || 0)
        price.innerHTML = `Tổng tiền:<br><span>${formatMoney(itemTotal)}</span>`
        item.appendChild(price)
        const quantity = document.createElement("p")

        quantity.classList.add("item-quantity")
        quantity.innerHTML = `Số lượng:<br><span>${product.quantity}</span>`
        item.appendChild(quantity)

        const removeBtn = document.createElement("button")
        removeBtn.classList.add("removeBtn")
        removeBtn.innerHTML = `<img src = "../IMG/remove-icon.png">`
        item.appendChild(removeBtn)
        container.appendChild( item,product)

        item.addEventListener('click', () =>{
        window.location.href = `ProductDetails.html?id=${product.id}`
        })
        remove(item, product)
    })
}
function sumCost(itemsInCart){
    let sum = 0 ;
    itemsInCart.forEach((item) => {
        sum += parseMoney(item.price) * Number(item.quantity || 0)
    })
    return sum;
}
function totalCalc(container, itemsInCart){
    const total = document.createElement("div")
    total.classList.add("cart-total")
    const totalPrice = sumCost(itemsInCart)
    const sum = document.createElement("p")
    sum.classList.add("total-price")
    sum.innerHTML = `Tổng cộng:<span>${formatMoney(totalPrice)}</span>`
    total.appendChild(sum)

    const purchaseBtn = document.createElement("button")
    purchaseBtn.classList.add("purchaseBtn")
    purchaseBtn.innerText = `Thanh toán`
    total.appendChild(purchaseBtn)
    container.appendChild(total)
}

function purchase(container){
    const btn = container.querySelector(".purchaseBtn")
    btn.addEventListener('click', () => {
        alert("Thanh toán thành công")
        localStorage.removeItem("products")
        window.location.href = `../HTML/Cart.html`
    })
}
function remove(item, product){
    const btn = item.querySelector(".removeBtn")
    btn.addEventListener('click', () => {
        const removedProduct = product.id

        const list = JSON.parse(localStorage.getItem("products"))

        const removedList = list.filter(product => product.id != removedProduct)

        localStorage.setItem("products", JSON.stringify(removedList))
        alert("Đã xóa sản phẩm")
        window.location.reload()
    })
}