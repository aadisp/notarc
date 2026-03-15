
let ntrc_cart=JSON.parse(localStorage.getItem('ntrc_cart_log'))||{prdct:0}



function addTOCart(func_prdct,func_price,func_btn){
  ntrc_cart[func_prdct]={ntrc_price:func_price};
  ntrc_cart[func_prdct].ntrc_qnt=1;
  console.log(ntrc_cart);
  const formattedPrice = func_price.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
  document.querySelector(func_btn).innerHTML=`
    <a href="testpage.html"><button class="prdctcartbtn js-addedprdctcartbtn">View in Cart</button></a>  
  `
  localStorage.setItem('ntrc_cart_log',JSON.stringify(ntrc_cart))
}

console.log(ntrc_cart);

function ifInCart(){
  if(document.querySelector('.prdctcartbtn').contains('js-addedprdctcartbtn')){
      document.querySelector('.js-addedprdctcartbtn').innerHTML=`
      <a href="testpage.html"><button class="prdctcartbtn .js-addedprdctcartbtn">View in Cart</button></a>  
      `
  }
}

function x(){
  localStorage.removeItem('ntrc_cart_log')
}