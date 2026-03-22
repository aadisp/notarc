
let ntrc_cart=JSON.parse(localStorage.getItem('ntrc_cart_log'))||{count:0,cartCount:0}
ifInCart()

function cartsave(){
  localStorage.setItem('ntrc_cart_log',JSON.stringify(ntrc_cart))
}

function addTOCart(func_prdct,func_price,func_btn,prdct_num,imageName,productName,productKit){
  /*if (prdct_num>ntrc_cart.hcount){
    ntrc_cart.history.push(ntrc_cart.hcount);
    ntrc_cart.hcount=prdct_num;
  }*/
  ntrc_cart.count++;
  ntrc_cart.cartCount++;
  ntrc_cart[func_prdct]={ntrc_price:func_price};
  ntrc_cart[func_prdct].ntrc_disprice=func_price;
  ntrc_cart[func_prdct].ntrc_qnt=1;
  ntrc_cart[func_prdct].btn_div=func_btn;
  ntrc_cart[func_prdct].imgsrc=imageName;
  ntrc_cart[func_prdct].prdct_name=productName;
  ntrc_cart[func_prdct].prdct_kit=productKit;
  console.log(ntrc_cart);
  const formattedPrice = func_price.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
  document.querySelector(func_btn).innerHTML=`
    <a href="testpage.html"><button class="prdctcartbtn">View in Cart</button></a>  
  `
  cartsave()
}

console.log(ntrc_cart);

function ifInCart(){
  let k='';
  for (i=1;i<=ntrc_cart.count;i++){
    //console.log(i);
    if(ntrc_cart[`prdct${i}`]!=undefined){
    //console.log(ntrc_cart[`prdct${i}`]);
      k=ntrc_cart[`prdct${i}`].btn_div;
      //console.log(k);
      document.querySelector(k).innerHTML=`
        <a href="testpage.html"><button class="prdctcartbtn">View in Cart</button></a>  
      `
    }
  }
  cartsave()
}

function x(){
  localStorage.removeItem('ntrc_cart_log');
}