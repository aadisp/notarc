/*let qnt=1;

function Cartplus(){
  qnt++
  document.querySelector('.js-prdctqnt').innerHTML=qnt
}
function Cartminus(){
  if (qnt==1){
    
  }
  else{
    qnt--
    document.querySelector('.js-prdctqnt').innerHTML=qnt
  }
}
function CartBuy(){
  alert("Bought")
}
function CartDel(){
  alert("Deleted")
}

let ntrc_cart=JSON.parse(localStorage.getItem('ntrc_cart_log'))||{prdct:0}

function addTOCart(func_prdct,func_price,func_btn){
  localStorage.setItem('ntrc_cart_log',JSON.stringify(ntrc_cart))
  ntrc_cart[func_prdct]={ntrc_price:func_price};
  ntrc_cart[func_prdct].ntrc_qnt=1;
  console.log(ntrc_cart);
  const formattedPrice = func_price.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
  document.querySelector(func_btn).innerHTML=`
    <a href="testpage.html"><button class="prdctcartbtn">View in Cart</button></a>  
  `
}
  localStorage.removeItem('ntrc_cart_log')*/

let ntrc_cart=JSON.parse(localStorage.getItem('ntrc_cart_log'))||{count:0,cartCount:0}
function cartsave(){
  localStorage.setItem('ntrc_cart_log',JSON.stringify(ntrc_cart))
}
console.log(ntrc_cart);
let code=``;
cartGenerator()
cartCheck()
//console.log(code);
//console.log(ntrc_cart.count);

function cartCheck(){
  if (ntrc_cart.cartCount==0){
    document.querySelector('main').innerHTML=`
      <div class="main-left-side">
        <div class="main-profile">
          <div class="main-profile-pic"></div>
          <div class="main-profile-name">
            <p class="main-profile-name-ptag">Profile Name</p>
          </div>
        </div>
        <div class="main-side-tab">
          <div class="main-orders">
            <p class="main-orders-ptag">Orders</p>
          </div>
        </div>
      </div>

      <div class="empty-right-side">
        <p>Nothing in cart yet</p>
        <div>
          <a href="testpage2.html"><button class="browse-btn">Browse</button></a>
        </div>
      </div>
    `
  }
  else{
    document.querySelector('main').innerHTML=`

      <div class="main-left-side">
        <div class="main-profile">
          <div class="main-profile-pic"></div>
          <div class="main-profile-name">
            <p class="main-profile-name-ptag">Profile Name</p>
          </div>
        </div>
        <div class="main-side-tab">
          <div class="main-orders">
            <p class="main-orders-ptag">Orders</p>
          </div>
        </div>
      </div>
      <div class="main-right-side">
        <div class="checkout">
          <button class="checkout-btn">Checkout</button>
        </div>
        <div class="buypad">
        
          ${code}
          
        </div>
      </div>
    `
  }
  cartsave()
}

function x(){
  localStorage.removeItem('ntrc_cart_log')
}

function cartGenerator(){
  let img=``;
  let nm=``;
  let kit=``;
  let prc=``;
  for (i=1;i<=ntrc_cart.count;i++){
    if(ntrc_cart[`prdct${i}`]!=undefined){
      img=ntrc_cart[`prdct${i}`].imgsrc;
      nm=ntrc_cart[`prdct${i}`].prdct_name;
      kit=ntrc_cart[`prdct${i}`].prdct_kit;
      qnt=ntrc_cart[`prdct${i}`].ntrc_qnt;
      const formattedPrice = ntrc_cart[`prdct${i}`].ntrc_disprice.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
      prc=formattedPrice;
    code+=`
      <div class="buyprdct">
        <div class="prdctimg"><img class="prdctimage" src="${img}"></div>
        <div class="prdctname">${nm}</div>
        <div class="prdctkit">${kit}</div>
        <div class="prdctmarkt">
          <div class="prdctprice">${prc}</div>
          <div class="prdctqnt js-prdctqnt">${qnt}</div>
          <div class="prdctcart">
            <button class="prdctcartbtn" onclick="Cartplus(${i})">+</button>
            <button class="prdctcartbtn" onclick="Cartminus(${i})">-</button>
          </div>
        </div>
          <div class="prdctfate">
            <button class="prdctdelbtn" onclick="CartDel(${i})">Delete</button>
            <button class="prdctbuybtn" onclick="CartBuy()">Buy</button>
          </div>
      </div>
    `
    }
    
  }
  cartsave()
}

function CartDel(prdctnum){
  delete ntrc_cart[`prdct${prdctnum}`];
  ntrc_cart.cartCount--;
  code=``;
  cartGenerator();
  cartCheck();
}


function Cartplus(prdctnum){
  let dp=ntrc_cart[`prdct${prdctnum}`].ntrc_price;
  if(ntrc_cart[`prdct${prdctnum}`].ntrc_qnt<10){
    ntrc_cart[`prdct${prdctnum}`].ntrc_qnt++;
    ntrc_cart[`prdct${prdctnum}`].ntrc_disprice=dp*ntrc_cart[`prdct${prdctnum}`].ntrc_qnt;
    code=``;
    cartGenerator();
    cartCheck();
  }
}
function Cartminus(prdctnum){
  let dp=ntrc_cart[`prdct${prdctnum}`].ntrc_price;
  if(ntrc_cart[`prdct${prdctnum}`].ntrc_qnt>1){
    ntrc_cart[`prdct${prdctnum}`].ntrc_qnt--;
    ntrc_cart[`prdct${prdctnum}`].ntrc_disprice=dp*ntrc_cart[`prdct${prdctnum}`].ntrc_qnt;
    code=``;
    cartGenerator();
    cartCheck();
  }
  else{
    CartDel(prdctnum);
  }
}