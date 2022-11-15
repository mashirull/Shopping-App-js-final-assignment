$(document).ready(function(){
    $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product',function(productList){

    
        for (var i=0;i<productList.length;i++){
            if(productList[i].isAccessory==false){
                
                var clothing_sec = document.getElementById('clothing');
                var card_div = document.createElement('div')
                card_div.classList.add('card')

                var d_flex = document.getElementById('d_flex')

                var bg_img = document.createElement('div')
                bg_img.classList.add('bg_img')
                bg_img.id = i+1
                bg_img.setAttribute('onclick',`load_details(${i+1})`)
                var bg =productList[i].photos[0]
                bg_img.style.background =`url('${bg}')`
                bg_img.style.backgroundSize ='cover'
                bg_img.style.backgroundPosition ='center'

                var content_div = document.createElement('div')
                content_div.classList.add('content')

                var h2_tag = document.createElement('h2')
                var h2_text = document.createTextNode(productList[i].name)
                h2_tag.appendChild(h2_text)

                var p_tag = document.createElement('p');
                var p_text = document.createTextNode(productList[i].brand)
                p_tag.appendChild(p_text)

                var h3_tag = document.createElement('h3')
                var h3_text = document.createTextNode("Rs "+productList[i].price)
                h3_tag.appendChild(h3_text)


                content_div.appendChild(h2_tag)
                content_div.appendChild(p_tag)
                content_div.appendChild(h3_tag)

                card_div.appendChild(bg_img)
                card_div.appendChild(content_div)
                // console.log(card_div)
                

                d_flex.appendChild(card_div)
                clothing_sec.appendChild(d_flex)

                
            
            }
            else if(productList[i].isAccessory==true){
                // console.log(productList[i])
                var Accessory =document.getElementById('Accessory')
                var card_div = document.createElement('div')
                card_div.classList.add('card')

                var d_flex = document.getElementById('d_flex2')

                var bg_img = document.createElement('div')
                bg_img.classList.add('bg_img')
                bg_img.id = i+1
                bg_img.setAttribute('onclick',`load_details(${(i+1)})`)
                var bg =productList[i].photos[0]
                bg_img.style.background =`url('${bg}')`
                bg_img.style.backgroundSize ='cover'
                bg_img.style.backgroundPosition ='center'

                var content_div = document.createElement('div')
                content_div.classList.add('content')

                var h2_tag = document.createElement('h2')
                var h2_text = document.createTextNode(productList[i].name)
                h2_tag.appendChild(h2_text)

                var p_tag = document.createElement('p');
                var p_text = document.createTextNode(productList[i].brand)
                p_tag.appendChild(p_text)

                var h3_tag = document.createElement('h3')
                var h3_text = document.createTextNode("Rs "+productList[i].price)
                h3_tag.appendChild(h3_text)


                content_div.appendChild(h2_tag)
                content_div.appendChild(p_tag)
                content_div.appendChild(h3_tag)

                card_div.appendChild(bg_img)
                card_div.appendChild(content_div)
                // console.log(card_div)
                

                d_flex.appendChild(card_div)
                Accessory.appendChild(d_flex)
        
            }
    
        }
       
    })
    
    showProductCart() 
})


var currentObj = null;

function load_details(id){
    var Product_section = document.getElementById('Product_section')
    var slider = document.getElementById('slider')
    Product_section.style.display = 'none'
    slider.style.display = 'none'

    $('.product_details_container').css('display','flex')

    $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`,function(data){
        currentObj = data
           

            var details_container= document.querySelector('.product_details_container');
            details_container.innerHTML += `
            <div class="preview_img_box">
              <img src="${data.preview}" alt="product-image">
            </div>
         <div class="details_box">
            <div class="product_name">
                <p style="display:none;">${data.id}</p>
                <h1>${data.name}</h1>
            </div>
            <div class="brand">
                <h3>${data.brand}</h3>
            </div>
            <div class="price">
                <h3>Price: Rs <span>${data.price}</span></h3>
            </div>
            <div class="description">
                <h2 class="title">Description</h2>
                <p>${data.description}</p>
            </div>
            <div class="product_preview_img">
                <h2 class="title">Pruduct preview</h2>
                <div class="preview_img">
                </div>
            </div>
            <button class="add_to_cart" onclick = "addToCart(this)" >Add to Cart</button>

         </div> 
         `
        
        var photos = data.photos

        for(i=0;i<photos.length;i++){
            
            // console.log(photos[i])
            var img  = document.createElement('img')
            img.classList.add('pr_image')
            img.src = photos[i]
            img.setAttribute('onclick','addActive(this)')
            var preview_imgs = document.querySelector('.preview_img');
            preview_imgs.appendChild(img)
            if(i==0){
                img.classList.add('active_img')
            }
            
        }
    });
    
}

function addActive(a){
    // console.log(a)
    var preview_img = document.querySelector('.preview_img_box img')
    var src= a.getAttribute('src')
    // console.log(src)
    preview_img.setAttribute('src',src)

    var pr_image = document.querySelectorAll('.pr_image')
    for(z=0;z<pr_image.length;z++){
        pr_image[z].classList.remove('active_img')
    }

    a.classList.add('active_img')
}




function addToCart(element){
    $('.add_to_cart').addClass('bigger')
    setTimeout(() => {
        $('.add_to_cart').removeClass('bigger')
    }, 200);



    var productRow = localStorage.getItem('shopping_cart');

    productRow = productRow === null || productRow === '' ? [] : productRow;
    productRow = productRow.length > 0 ? JSON.parse(productRow) : [];

    console.log(productRow);

    var f = -1;
    for(var i=0; i < productRow.length; i++) {
        // console.log(productList[i].id);
        if(parseInt(productRow[i].id) == parseInt(currentObj.id)) {
            f = i;
        }
    }

    if(f > -1) {
        productRow[f].count = productRow[f].count + 1;
        console.log(productRow[f].count);
        window.localStorage.setItem('shopping_cart', JSON.stringify(productRow));
    } else {
        currentObj.count = 1;
        productRow.push(currentObj);
        console.log(productRow);
        window.localStorage.setItem('shopping_cart', JSON.stringify(productRow));
    }
    
    
    showProductCart()

}


function showProductCart(){
    var numberOfItem = 0;
    // var totalPrice = 0;
    var cart_count = 0;
    var cartHtml = ""
    var totlePriceForChekout = 0

    if(localStorage.getItem('shopping_cart')){
        var productCart = JSON.parse(localStorage.getItem('shopping_cart'));
        numberOfItem = productCart.length;
        console.log(productCart)
        // console.log(productCart)
        
        
        productCart.forEach(element => {
            cartItem = element
            var totalPriceInCart = parseInt(cartItem.price)*cartItem.count 
            totlePriceForChekout += totalPriceInCart;
            cart_count += cartItem.count
            
            

            // console.log(cartItem)
            var cartbox = document.createElement('div')
            cartbox.classList.add('cart_box')
            
            cartHtml += `
            <div class="itemCart">
                <div class="cart_box_img"><img src="${cartItem.preview}" alt="product image"></div>
                <div class="cart_content ">
                    <h2 class="product_name"> ${cartItem.name}</h2>
                    <p>x${cartItem.count}</p>
                    <p class="price">Amount Rs: ${totalPriceInCart}</p>
                </div>
            </div>
            `
            cartbox.innerHTML = cartHtml
        });

        
    }
    // var cartbox = document.querySelector('cart_box')
    // console.log(totalPrice)
    var cart_container = document.querySelector('.cart_table_container');
    cart_container.innerHTML = cartHtml
    // console.log(cart_container)

    $('.totle_amount').html(totlePriceForChekout)
    
    $('.cart_count').html(cart_count);
    $('.totle_item').html(numberOfItem)
};



function goToCart(){
    $('#slider').css('display','none');
    $('#Product_section').css('display','none');
    $('#cart_page').css('display','block');
    $('#product_details').css('display','none')
}


var dateTime = new Date();

$('#place_order_btn').click(function(){
    var productRow = localStorage.getItem('shopping_cart');

    productRow = productRow === null || productRow === '' ? [] : productRow;
    productRow = productRow.length > 0 ? JSON.parse(productRow) : [];
    console.log(productRow)
    var OrderProductListArray = new Array();
    
    productRow.forEach(element =>{
        // console.log(element)
        var productObj = new Object();

        productObj.id = element.id;
        productObj.name = element.name;
        productObj.preview = element.preview;
        productObj.orderAt = dateTime;

        // console.log(productObj)
        
        OrderProductListArray.push(productObj)
    })
    // console.log(OrderProductListArray)

    if(productRow.length ==0 || productRow ===''){
        alert('Your Cart is Empty')
    }
    else{
        $.post('https://jsonplaceholder.typicode.com/posts',OrderProductListArray,function(data,status){
        // console.log(data)
        // console.log(status)
        // alert('Your Order is Placed')
        $('#success_page').css('display','flex');
        $('#cart_page').hide();
        localStorage.setItem('shopping_cart',[])

    })
    }

// the given creatOrder post link is not working, it give the error bad request 
// so i am using feke api post link

    
    
})


