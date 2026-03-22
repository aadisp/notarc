import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { 
  getFirestore, collection, getDocs, doc, 
  updateDoc, deleteDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAx1vpBGEKGcKHMnSQuAfBxH-NeiF9BUM8",
  authDomain: "notarc-1a2ae.firebaseapp.com",
  projectId: "notarc-1a2ae",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const container = document.getElementById("cart-container");
const adminpanel = document.getElementById("admin");
const chckout = document.getElementById("chckout");

onAuthStateChanged(auth, async(user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
 
  loadCart(user);
});

async function loadCart(user) {
  const cartRef = collection(db, "users", user.uid, "cart");
  const snapshot = await getDocs(cartRef);

  container.innerHTML = "";
  chckout.innerHTML =``;

  let total = 0;

  // 🔒 CHECK ADMIN
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.data().role == "admin") {
    adminpanel.innerHTML =`<a href="ABC admin.html"><button>Admin Pannel</button></a>`
  }

  if (snapshot.empty) {
    document.getElementById("cart-total").innerText = 
    ``;
    container.innerHTML += `
      <div class="empty-right-side">
        <p>Nothing in cart yet</p>
        <div>
          <a href="A product.html">
            <button class="browse-btn">Browse</button>
          </a>
        </div>
      </div>
    `;
    return;
  }
  


  snapshot.forEach(docSnap => {
    const item = docSnap.data();
    const id = docSnap.id;

    const db=item.price*item.quantity;
    const formattedPrice = db.toLocaleString('en-US', { style: 'currency', currency: 'INR' });

    total += item.price * item.quantity;
      chckout.innerHTML =`
    <div onclick="buyAll()">
      <button class="checkout-btn">Checkout</button>
    </div>
  `

    container.innerHTML += `

        
        <div class="buyprdct">
          <div class="prdctimg"><img class="prdctimage" src="${item.img}"></div>
          <div class="prdctname">${item.name}</div>
          <div class="prdctkit">${item.kit}</div>
          <div class="prdctmarkt">
            <div class="prdctprice">${formattedPrice}</div>
            <div class="prdctqnt js-prdctqnt">${item.quantity}</div>
            <div class="prdctcart">
              <button class="prdctcartbtn" onclick="increase('${id}')">+</button>
              <button class="prdctcartbtn" onclick="decrease('${id}')">-</button>
            </div>
          </div>
            <div class="prdctfate">
              <button class="prdctdelbtn" onclick="deleteItem('${id}')">Delete</button>
              <button class="prdctbuybtn" onclick="buyItem('${id}')">Buy</button>
            </div>
        </div>        
        
      
    `;
  });
  const formattedTotal = total.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
  document.getElementById("cart-total").innerHTML= 
  `Cart Total: ${formattedTotal}`;
}

window.increase = async function(id) {
  const ref = doc(db, "users", auth.currentUser.uid, "cart", id);
  const snap = await getDoc(ref);

  if (snap.data().quantity < 10) {
    await updateDoc(ref, {
      quantity: snap.data().quantity + 1
    });
  }

  loadCart(auth.currentUser);
};

window.decrease = async function(id) {
  const ref = doc(db, "users", auth.currentUser.uid, "cart", id);
  const snap = await getDoc(ref);

  const qty = snap.data().quantity;

  if (qty > 1) {
    await updateDoc(ref, { quantity: qty - 1 });
  }else{
    deleteItem(id);
  }

  loadCart(auth.currentUser);
};

window.deleteItem = async function(id) {
  const ref = doc(db, "users", auth.currentUser.uid, "cart", id);
  await deleteDoc(ref);

  loadCart(auth.currentUser);
};

window.buyItem = async function(id) {
  const userId = auth.currentUser.uid;

  const ref = doc(db, "users", userId, "cart", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const item = snap.data();

  const total = item.price * item.quantity;

  const confirmBuy = confirm(
    `Buy ${item.name} (${item.kit})\nQuantity: ${item.quantity}\nTotal: ₹${total}`
  );

  if (!confirmBuy) return;

  // ✅ ADD TO ORDERS
  await addDoc(collection(db, "orders"), {
    userId: userId,
    name: item.name,
    kit: item.kit,
    price: item.price,
    quantity: item.quantity,
    total: total,
    status: "placed",
    createdAt: new Date()
  });

  // ✅ REMOVE FROM CART
  await deleteDoc(ref);

  alert("Order placed successfully!");

  loadCart(auth.currentUser);
};

window.buyAll = async function() {
  const user = auth.currentUser;
  const userId = user.uid;

  const cartRef = collection(db, "users", userId, "cart");
  const snapshot = await getDocs(cartRef);

  if (snapshot.empty) {
    alert("Cart is empty");
    return;
  }

  let total = 0;
  let items = [];

  snapshot.forEach(docSnap => {
    const item = docSnap.data();

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    items.push({
      id: docSnap.id,
      ...item,
      total: itemTotal
    });
  });

  const confirmBuy = confirm(`Buy all items?\nTotal: ₹${total}`);

  if (!confirmBuy) return;

  // ✅ ADD EACH ITEM TO ORDERS
  for (const item of items) {
    await addDoc(collection(db, "orders"), {
      userId: userId,
      name: item.name,
      kit: item.kit,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      status: "placed",
      createdAt: new Date(),
      img:item.img
    });

    // ✅ DELETE FROM CART
    await deleteDoc(doc(db, "users", userId, "cart", item.id));
  }

  alert("All items purchased successfully!");

  loadCart(user);
};