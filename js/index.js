// first get login user data
var currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : 'no user found'
var currentUserCart = JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum+'CartProducts')) ? JSON.parse(localStorage.getItem(currentUser.emailOrPhoneNum + 'CartProducts')) : []
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
// end navbar
// header slider
var headerSliderCounter=0
var setAutomaticSlider
// automatic slider navigate
automaticSlider();
function automaticSlider(){
    setAutomaticSlider=setInterval(()=>{
        document.querySelector('.slide.first').style.marginLeft =`-${headerSliderCounter*25}%`;
        headerSliderCounter++
        if(headerSliderCounter>3){
            headerSliderCounter=0
        }
    },5000)
}
// manual slider navigate
var leftBtn = document.querySelector('.left')
var righttBtn = document.querySelector('.right')
leftBtn.addEventListener('click',function(){
    headerSliderCounter++
    if(headerSliderCounter>3){
        headerSliderCounter=0
    }
    document.querySelector('.slide.first').style.marginLeft =`-${headerSliderCounter*25}%`;
})
righttBtn.addEventListener('click',function(){
    console.log('right')
    headerSliderCounter--
    if(headerSliderCounter<0){
        headerSliderCounter=3
    }
    document.querySelector('.slide.first').style.marginLeft =`-${headerSliderCounter*25}%`;
})
// end header slider
// make a request
var xhr = new XMLHttpRequest();
xhr.open('GET','https://fakestoreapi.com/products',true)
xhr.send()
xhr.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        // hide loader
        document.querySelector('.loader-container').style.display='none'
        // display page content
        document.querySelector('.main-container').style.display='block'
        var products = JSON.parse(this.response)
        var menClothing = document.querySelector('#men-clothing .slides')
        var womenClothing = document.querySelector('#women-clothing .slides')
        var jewelery = document.querySelector('#jewelery .slides')
        var electronics = document.querySelector('#electronics .slides')
        // get menClothing category to slider
        var menSlider = document.createElement('div')
        menSlider.classList='slide first'
        var productNum=0
        products.forEach(product=>{
            if(product.category=="men's clothing"&& productNum<8){
                productNum++
                menSlider.innerHTML+=`
                <div class="product-img">
                    <img src=${product.image} alt="" data-id=${product.id} onclick="productDetails(event)">
                    <span class="product-title">${product.title}</span>
                </div>
                `
            }
        })
        menClothing.appendChild(menSlider)
        //  end getting menClothing category to slider
        // get womenClothing category to slider
        var womenSlider = document.createElement('div')
        womenSlider.classList='slide first'
        productNum=0
        products.forEach(product=>{
            if(product.category=="women's clothing"&& productNum<8){
                productNum++
                womenSlider.innerHTML+=`
                <div class="product-img">
                    <img src=${product.image} alt="" data-id=${product.id} onclick="productDetails(event)">
                    <span class="product-title">${product.title}</span>
                </div>
                `
            }
        })
        womenClothing.appendChild(womenSlider)
        //  end getting womenClothing category to slider
        // get jewelery category to slider
        var jewelerySlider = document.createElement('div')
        jewelerySlider.classList='slide first'
        productNum=0
        products.forEach(product=>{
            if(product.category=="jewelery"&& productNum<8){
                productNum++
                jewelerySlider.innerHTML+=`
                <div class="product-img">
                    <img src=${product.image} alt="" data-id=${product.id} onclick="productDetails(event)">
                    <span class="product-title">${product.title}</span>
                </div>
                `
            }
        })
        jewelery.appendChild(jewelerySlider)
        //  end getting jewelery category to slider
         // get electronics category to slider
         var electronicsSlider = document.createElement('div')
         electronicsSlider.classList='slide first'
         productNum=0
         products.forEach(product=>{
             if(product.category=="electronics"&& productNum<8){
                 productNum++
                 electronicsSlider.innerHTML+=`
                 <div class="product-img">
                     <img src=${product.image} alt="" data-id=${product.id} onclick="productDetails(event)">
                     <span class="product-title">${product.title}</span>
                 </div>
                 `
             }
         })
         electronics.appendChild(electronicsSlider)
         //  end getting electronics category to slider
    }
}
// end request
// categories slider
var counters = [0,0,0,0]
var leftBtns = document.querySelectorAll('.category-sections-slider .left')
var rightBtns = document.querySelectorAll('.category-sections-slider .right')
for(let i=0; i<4; i++){
    leftBtns[i].addEventListener('click',function(){
        counters[i]++
        if(counters[i]>1){
            counters[i]=0
        }
        document.querySelector('#'+leftBtns[i].dataset.category+' .slide.first').style.marginLeft =`-${counters[i]*50}%`;
    })
    rightBtns[i].addEventListener('click',function(){
        counters[i]--
        if(counters[i]<0){
            counters[i]=0
        }
        document.querySelector('#'+rightBtns[i].dataset.category+' .slide.first').style.marginLeft =`-${counters[i]*50}%`;
    })
}
// end categories slider
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
// go to product details page
function productDetails(e){
    localStorage.setItem('productID',e.target.dataset.id)
    location.href='productDetails.html'
}
// end going to product details page