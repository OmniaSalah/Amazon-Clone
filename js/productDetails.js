// first get login user data
var currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : 'no user found'
var currentUserCart = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum +'CartProducts'))? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'CartProducts')) : []
var cart = document.querySelector('.cart-count')
cart.innerHTML = currentUserCart.length
// end getting login user data
// initialize current page
localStorage.setItem('currentURL','')
// start navbar
var searchDiv = document.getElementById("searchDiv")
var OverLayDiv = document.getElementById('overlay')
var searchDiv = document.getElementById("searchDiv")

function searchInputAddBorder(){
    searchDiv.style.border = "3px solid #ff9900"
    OverLayDiv.style.display ="block"
}
function searchInputRemoveBorder(){
   searchDiv.style.border = "none"
   OverLayDiv.style.display ="none"
}
// ////////////////////////////////////
var dropdownContent = document.getElementById("dropdown-content")
function onHover(){
    dropdownContent.style.display = "block"
    OverLayDiv.style.display ="block"
}
function onLeave(){
    dropdownContent.style.display = "none"
    OverLayDiv.style.display ="none"
}
/// //////////////////////////////////////

/// //////////////////////////////////////
var dropdownContent2 = document.getElementById("dropdown-content-signIn")
function onHover2(){
    dropdownContent2.style.display = "block"
    OverLayDiv.style.display ="block"
}
function onLeave2(){
    dropdownContent2.style.display = "none"
    OverLayDiv.style.display ="none"
}

///////////  ////////////////  ///////////////////
// set user info into navbar
if(currentUser!=='no user found'){
    var firstName = currentUser.fullName.split(' ')[0]
    document.querySelector('.deliver-user-name').innerHTML=firstName
    document.querySelector('.hello-user-name').innerHTML=firstName
    document.querySelector('.amazon-user-name').innerHTML=`${firstName}'s`
    // set sign in button of dropdown none
    document.querySelector('.sign-in-btn').style.display='none'
}
else{
    document.querySelector('.deliver-user-name').innerHTML=''
    document.querySelector('.hello-user-name').innerHTML='Sign in'
    document.querySelector('.amazon-user-name').innerHTML='your'
    // set sign in button of dropdown block
    document.querySelector('.sign-in-btn').style.display='block'
}
// set user current url to back after signing in
document.querySelector('#dropdown-content-signIn .signIn').addEventListener('click',function(e){
    e.preventDefault()
    var pagePath = (window.location.href).split('/')[3].split('?')[0]
    localStorage.setItem('currentURL',pagePath)
    location.href='signIn.html'
})
// search function
function search(e){
    e.preventDefault()
    var searchKeyword = document.querySelector('#search')
    localStorage.setItem('searchKeyword',searchKeyword.value)
    location.href='search.html'
}
// openOrders page function
function openOrders(e){
    e.preventDefault()
    if(currentUser!=='no user found')
    {
        location.href='orders.html'
    }
    else{
        // set current location to back after signing in
        localStorage.setItem('currentURL','orders.html')
        location.href='signIn.html'
    }
}
// openCart page function
function openCart(){
    if(currentUser!=='no user found')
    {
        location.href='shoppingCart.html'
    }
    else{
        // set current location to back after signing in
        localStorage.setItem('currentURL','shoppingCart.html')
        location.href='signIn.html'
    }
}
// sign out
document.querySelector('.sign-out').addEventListener('click', function(e){
    e.preventDefault()
    localStorage.setItem('currentUser','')
    location.href='signIn.html'
})
// go to category page
var categoryBtns = document.querySelectorAll('.category-link')
categoryBtns.forEach(btn=>{
    btn.addEventListener('click',function(e){
        e.preventDefault()
        localStorage.setItem('category',btn.dataset.category)
        location.href='category.html'
    })
})
// end going to category page
// end navbar
// get product info
var counter
var productID = localStorage.getItem('productID')
var product
// make a request
var xhr = new XMLHttpRequest();
xhr.open('GET','https://fakestoreapi.com/products/'+productID,true)
xhr.send()
xhr.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        // hide loader
        document.querySelector('.loader-container').style.display='none'
        // display page content
        document.querySelector('.product-details-container').style.display='block'
        product = JSON.parse(this.response)
        var productContainer = document.querySelector('.product')
        productContainer.innerHTML=`
        <div class="product-info">
            <div class="product-img">
            <img src=${product.image} alt="">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <div class="rating">
                    <div class="stars">
                    </div>
                    <p class="reviews">${product.rating.count} reviews</p>
                </div>
                <span class="product-price">$${product.price}</span>
                <span class="description">Description:</span>
                <p class="description-p">${product.description}</p>
            </div>
        </div>
        <div class="total-amount">
            <div class="total-amount-price">
                <span>Total amount</span>
                <span class="price">$${product.price}</span>
            </div>
            <div class="product-stock">
                <span>Stock</span>
                <span class="stock">In Stock</span>
            </div>
            <div class="product-quantity">
                <span>Qty</span>
                <div class="count">
                    <span id="subtract" onclick="subtractOne()">-</span>
                    <span class="counter">1</span>
                    <span id="add" onclick="addOne()">+</span>
                </div>
            </div>
            <button class="add-to-cart" data-id=${product.id} onclick="addToCart(event)">ADD TO CART</button>
        </div>`
        var rating = document.querySelector('.stars')
        var ratingCount = Math.floor(product.rating.rate)
        for(let i=1;i<=5;i++){
            if(i<=ratingCount){
                rating.innerHTML+='<img src="img/Filled_star.png" alt="">'
            }
            else{
                rating.innerHTML+='<img src="img/empty_star.png" alt="">'
            }
        }
        counter = document.querySelector('.counter')
    }
}
// addToCart
function addToCart(e){
    if(currentUser!=='no user found'){
        currentUserCart = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum +'CartProducts')) ? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'CartProducts')) : []
        var existing = false
        console.log(currentUserCart)
        currentUserCart.forEach(p=>{
            if(e.target.dataset.id==p.product.id){
                p.count=parseInt(counter.innerHTML)
                existing=true
            }
        })
        if(!existing){
            currentUserCart.push({product, count:parseInt(counter.innerHTML)})
            cart.innerHTML = currentUserCart.length
            localStorage.setItem(currentUser.emailOrPhoneNum+'CartProducts',JSON.stringify(currentUserCart))
        }
        else{
            localStorage.setItem(currentUser.emailOrPhoneNum+'CartProducts',JSON.stringify(currentUserCart))
        }
    }
    else{
        // set current location to back after signing in
        var pagePath = (window.location.href).split('/')[3].split('?')[0]
        localStorage.setItem('currentURL',pagePath)
        location.href='signIn.html'
    }
}
// openCart page
function openCart(){
    if(currentUser!='no user found'){
        location.href='shoppingCart.html'
    }
    else{
        // set current location to back after signing in
        var pagePath = (window.location.href).split('/')[3].split('?')[0]
        localStorage.setItem('currentURL',pagePath)
        location.href='signIn.html'
    }
}
// product quantity control
function subtractOne(){
    if(counter.innerHTML>1){
        counter.innerHTML=parseInt(counter.innerHTML)-1
    }
}
function addOne(){
    counter.innerHTML=parseInt(counter.innerHTML)+1
}