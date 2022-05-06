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
// get search keyword
var searchKeyword = localStorage.getItem('searchKeyword')?localStorage.getItem('searchKeyword'):''
document.querySelector('.category-para').innerHTML='Showing results for '+searchKeyword
var products
// default filter type
var filterType = 'any'
// get category products
    // make a request
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://fakestoreapi.com/products',true)
    xhr.send()
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            // hide loader
            document.querySelector('.loader-container').style.display='none'
            // display page content
            document.querySelector('.category-section').style.display='block'
            products = JSON.parse(this.response)
            getCategoryProducts(filterType)
        }
    }
// products filter function
function getCategoryProducts(type, min, max){
    var productsContainer = document.querySelector('.products')
    productsContainer.innerHTML=''
    products.forEach((product) => {
        if(type=='any'&&(product.title.toLowerCase().includes(searchKeyword.toLowerCase())||product.description.toLowerCase().includes(searchKeyword.toLowerCase())||product.category.toLowerCase().includes(searchKeyword.toLowerCase()))){
            productContent(productsContainer, product)
        }
        else if(type=='range'&&(product.title.toLowerCase().includes(searchKeyword.toLowerCase())||product.description.toLowerCase().includes(searchKeyword.toLowerCase())||product.category.toLowerCase().includes(searchKeyword.toLowerCase()))&&product.price>=min&&product.price<=max){
            productContent(productsContainer, product)
        }
        else if(type=='openRange'&&(product.title.toLowerCase().includes(searchKeyword.toLowerCase())||product.description.toLowerCase().includes(searchKeyword.toLowerCase())||product.category.toLowerCase().includes(searchKeyword.toLowerCase()))&&product.price>=min){
            productContent(productsContainer, product)
        }
        
    });
}
// product html
function productContent(productsContainer, product){
    productsContainer.innerHTML+=`
    <div class="product" id="id${product.id}">
        <img class="product-img" src=${product.image} alt="" data-id=${product.id} onclick="getProductDetails(event)">
        <p class="title">${product.title}</p>
        <div class="rating-details">
            <div class="rating">
            </div>
            <span class="reviews">${product.rating.count}  Reviews</span>
        </div>
        <span class="price">$${product.price}</span>
        <button class="add-to-cart" data-id=${product.id} onclick="addToCart(event)">ADD TO CART</button>
    </div>
    `
    var rating = document.querySelector('#id'+product.id+' .rating')
    var ratingCount = Math.floor(product.rating.rate)
    for(let i=1;i<=5;i++){
        if(i<=ratingCount){
            rating.innerHTML+='<img src="img/Filled_star.png" alt="">'
        }
        else{
            rating.innerHTML+='<img src="img/empty_star.png" alt="">'
        }
    }
}
// filter category products btns
var filterBtns = document.querySelectorAll('input[type="radio"]')
filterBtns.forEach(filterBtn=>{
    filterBtn.addEventListener('click',function(){
        if(filterBtn.dataset.type=='any'){
            getCategoryProducts(filterBtn.dataset.type)
        }
        else if(filterBtn.dataset.type=='range'){
            getCategoryProducts(filterBtn.dataset.type, filterBtn.dataset.min, filterBtn.dataset.max)
        }
        else if(filterBtn.dataset.type=='openRange'){
            getCategoryProducts(filterBtn.dataset.type, filterBtn.dataset.min)
        }
    })
})
// clear filter
document.querySelector('.clear-filter').addEventListener('click',function(){
    document.querySelector('#any').checked=true
    getCategoryProducts('any')
})
// getProductDetails page
function getProductDetails(e){
    localStorage.setItem('productID',e.target.dataset.id)
    location.href='productDetails.html'
}
// addToCart
function addToCart(e){
    if(currentUser!=='no user found'){
        currentUserCart = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum +'CartProducts')) ? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'CartProducts')) : []
        var existing = false
        currentUserCart.forEach(p=>{
            if(e.target.dataset.id==p.product.id){
                p.count++
                existing=true
            }
        })
        if(!existing){
            var product
            products.forEach(p=>{
                if(e.target.dataset.id==p.id){
                    product=p
                }
            })
            currentUserCart.push({product, count:1})
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