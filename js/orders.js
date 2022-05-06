// first get login user data
var currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : 'no user found'
var currentUserCart = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum+'CartProducts')) ? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'CartProducts')) : []
var cart = document.querySelector('.cart-count')
cart.innerHTML = currentUserCart.length
var currentUserOrders = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum+'Orders')) ? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'Orders')) : []
// end getting login user data
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
// end navbar
for (var i =0 ; i< currentUserOrders.length ; i++)     
{
    document.getElementById("forFlexing").innerHTML += `
    <div class="insideCard" id=${"id"+currentUserOrders[i].product.id}>
        <div id="forIMG"><img src=${currentUserOrders[i].product.image} alt=""></div>
        <div id="forProductData">
            <p id="title">${currentUserOrders[i].product.title}</p>
            <div class="rating">
            </div>
            <p id="price">${currentUserOrders[i].product.price}</p>
            <span>Qty: ${currentUserOrders[i].count}</span>
            <p id="decription">Description</p>
            <p id="para">${currentUserOrders[i].product.description}</p>
        </div>
    </div>`
    var rating = document.querySelector('#id'+currentUserOrders[i].product.id+' .rating')
    var ratingCount = Math.floor(currentUserOrders[i].product.rating.rate)
    for(let i=1;i<=5;i++){
        if(i<=ratingCount){
            rating.innerHTML+='<img src="img/Filled_star.png" alt="">'
        }
        else{
            rating.innerHTML+='<img src="img/empty_star.png" alt="">'
        }
    }
}