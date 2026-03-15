let test_cart=JSON.parse(localStorage.getItem('test_cart_log'))||{prdct:0}


function addTOCart(func_prdct,test2price,testbtn){
  localStorage.setItem('test_cart_log',JSON.stringify(test_cart))
  test_cart[func_prdct]={test_price:test2price};
  test_cart[func_prdct].test_qnt=1;
  console.log(test_cart);
  const formattedPrice = test2price.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
  document.querySelector(testbtn).innerHTML=`
    <a href="testpage.html"><button class="prdctcartbtn">View in Cart</button></a>  
  `
}
  /*localStorage.removeItem('test_cart_log')
  console.log(test_cart);*/