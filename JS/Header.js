const header = document.querySelector('header');
header.innerHTML = `
<button>Đăng xuất</button>
<h1>RAM-review<hr></h1>
<div class ="logo">
    <img src="../IMG/logo.jpg" alt="Logo">
</div>
<div class="header-navigation">
<nav>
<a href="../HTML/Products.html">Sản phẩm</a>
<a href = "../HTML/Cart.html">Giỏ hàng</a>
</nav>
</div>`

const logOut = header.querySelector("button")
logOut.addEventListener('click', () => {
    window.location.href = `../HTML/index.html`
})