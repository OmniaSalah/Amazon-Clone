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
var totalPriceSpan=document.querySelector('.price')
var totalPrice=0
// products quantities
var counters 
var productsContainer = document.querySelector('.products')
currentUserCart.forEach((product,index) => {
        productsContainer.innerHTML+=`
        <div class="product" id=${"id"+product.product.id}>
            <div class="product-img">
                <img src=${product.product.image} alt="load...">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.product.title}</h3>
                <div class="rating">
                    <div class="stars">
                    </div>
                    <p class="reviews">${product.product.rating.count} reviews</p>
                </div>
                <span class="product-price">$${product.product.price}</span>
                <span class="description">Description</span>
                <p class="description-p">${product.product.description}</p>
                <div class="product-quantity">
                    <span>Qty</span>
                    <div class="count">
                        <span class="subtract" id=${index} data-id=${product.product.id} onclick="subtractOne(event)">-</span>
                        <span class="counter">${product.count}</span>
                        <span class="add" id=${index} data-id=${product.product.id} onclick="addOne(event)">+</span>
                    </div>
                    <button data-id=${product.product.id} onclick="deleteProduct(event)">Delete</button>
                </div>
            </div>
        </div>`
        var rating = document.querySelector('#id'+product.product.id+' .stars')
        var ratingCount = Math.floor(product.product.rating.rate)
        for(let i=1;i<=5;i++){
            if(i<=ratingCount){
                rating.innerHTML+='<img src="img/Filled_star.png" alt="">'
            }
            else{
                rating.innerHTML+='<img src="img/empty_star.png" alt="">'
            }
        }
        counters=document.querySelectorAll('.counter')
        totalPrice+=product.count*product.product.price
        totalPriceSpan.innerHTML=`$${totalPrice.toFixed(2)}`

})

// product quantity control
function subtractOne(e){
    if(counters[e.target.getAttribute('id')].innerHTML>1){
        // subtractOne
        counters[e.target.getAttribute('id')].innerHTML=parseInt(counters[e.target.getAttribute('id')].innerHTML)-1
        // update localStorage
        currentUserCart.forEach(p=>{
            if(e.target.dataset.id==p.product.id){
             p.count=parseInt(counters[e.target.getAttribute('id')].innerHTML)
             totalPrice=totalPrice-p.product.price
             totalPriceSpan.innerHTML=`$${totalPrice.toFixed(2)}`
            }
        })
        localStorage.setItem(currentUser.emailOrPhoneNum +'CartProducts',JSON.stringify(currentUserCart))
    }
}
function addOne(e){
    counters[e.target.getAttribute('id')].innerHTML=parseInt(counters[e.target.getAttribute('id')].innerHTML)+1
    // update localStorage
    currentUserCart.forEach(p=>{
        if(e.target.dataset.id==p.product.id){
         p.count=parseInt(counters[e.target.getAttribute('id')].innerHTML)
         totalPrice=totalPrice+p.product.price
         totalPriceSpan.innerHTML=`$${totalPrice.toFixed(2)}`
        }
    })
    localStorage.setItem(currentUser.emailOrPhoneNum +'CartProducts',JSON.stringify(currentUserCart))
}
// deleteProduct
function deleteProduct(e){
    for(let index=0;index<currentUserCart.length;index++){
        if(currentUserCart[index].product.id==e.target.dataset.id){
            totalPrice= Math.abs(totalPrice-(currentUserCart[index].count*currentUserCart[index].product.price))
            totalPriceSpan.innerHTML=`$${totalPrice.toFixed(2)}`
            currentUserCart.splice(index,1)
            cart.innerHTML=currentUserCart.length
            var deletedProduct=document.querySelector('div.product#id'+e.target.dataset.id)
            deletedProduct.remove()
            index--
        }
    }
    localStorage.setItem(currentUser.emailOrPhoneNum +'CartProducts',JSON.stringify(currentUserCart))
}
// go to checkout page
function checkOut(){
    if(currentUser!=='no user found')
    {
        window.location.href= 'checkOut.html'
    }
    else{
        // set current location to back after signing in
        localStorage.setItem('currentURL','checkOut.html')
        location.href='signIn.html'
    }
}