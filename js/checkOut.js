// first get login user data
var currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : 'no user found'
var currentUserCart = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum+'CartProducts')) ? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'CartProducts')) : []
var cart = document.querySelector('.cart-count')
cart.innerHTML = currentUserCart.length
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
// validation
var validations = [false, false, false, false]
function checkFullName(){
    var forTest = document.getElementsByClassName("forTest")
    var valueOfInput = document.getElementById("fullName").value
    if(valueOfInput.toLowerCase() == currentUser.fullName.toLowerCase()){
        document.getElementById("email").focus()
        forTest[0].innerHTML = ""
        validations[0] = true;
    }
    else{
        forTest[0].innerHTML = "your full name not correct"
        validations[0] = false;
    }
}
function checkEmail(){
    var forTest = document.getElementsByClassName("forTest")
    var valueOfInput = document.getElementById("email").value
    if(valueOfInput == currentUser.emailOrPhoneNum){
        document.getElementById("address").focus()
        forTest[1].innerHTML = ""   
        validations[1] = true;
    }
    else{
        forTest[1].innerHTML = "your email or phone number not correct"
        validations[1] = false;
    }
}

function checkZip(){
    var zipVal = document.getElementById("zip").value
    var forTest = document.getElementsByClassName("forTest")    
    if(zipVal.length < 5 || zipVal.length > 5){
        forTest[2].innerHTML = "you shoud enter 5 numbers"
        validations[2] = false;
    }else{
        forTest[2].innerHTML = ""
        validations[2] = true;
    }
}

function checCVV(){
    var cvvVal = document.getElementById("cvv").value
    var forTest = document.getElementsByClassName("forTest")    
    // console.log(cvvVal.length)
    if(cvvVal.length < 3 || cvvVal.length > 3){
        forTest[3].innerHTML = "you shoud enter 3 numbers"
        validations[3] = false;
    }
    else{
        forTest[3].innerHTML = ""
        validations[3] = true;
    }
}
// submit form depending on validations
document.forms[0].onsubmit = function (e) {
    e.preventDefault()
    if(validations[0]&&validations[1]&&validations[2]&&validations[3]){
        localStorage.setItem(currentUser.emailOrPhoneNum+'Orders',JSON.stringify(currentUserCart))
        currentUserCart=[]
        localStorage.setItem(currentUser.emailOrPhoneNum+'CartProducts',JSON.stringify(currentUserCart))
        cart.innerHTML = currentUserCart.length
        e.target.submit()
    }
}