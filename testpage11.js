localStorage.removeItem('ntrc_cart_log')
let ntrc_cart=JSON.parse(localStorage.getItem('ntrc_cart_log'))||{prdct:0}

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
  console.log(ntrc_cart);

function x(){
  localStorage.removeItem('ntrc_cart_log')
}