import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { 
  getFirestore, doc, collection, getDocs, getDoc, query, where 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAx1vpBGEKGcKHMnSQuAfBxH-NeiF9BUM8",
  authDomain: "notarc-1a2ae.firebaseapp.com",
  projectId: "notarc-1a2ae",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const container = document.getElementById("orders-container");
const emptycontainer = document.getElementById("empty-container");
const adminpanel = document.getElementById("admin");

window.logoutUser = () => {
  signOut(auth);
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }
  document.getElementById("user-email").innerHTML =`${user.email}`;

  document.title=`notarc - ${user.email} Orders`;
  loadOrders(user);
});

async function loadOrders(user) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  container.innerHTML = "";
  emptycontainer.innerHTML="";
  // 🔒 CHECK ADMIN
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (snap.data().role == "admin") {
    adminpanel.innerHTML =`<a href="admin pagesetup.html" class="side-tab-link">Admin Panel</a>`
  }

  if (snapshot.empty) {
    emptycontainer.innerHTML += `
      <div class="empty-right-side">
        <p>No orders found</p>
        <div>
          <a href="/index.html">
            <button class="browse-btn">Browse</button>
          </a>
        </div>
      </div>
    `;
    return;
  }

  snapshot.forEach(docSnap => {
    const order = docSnap.data();


    const dp=order.price*order.quantity;
    const formattedoPrice = dp.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
    const dop=order.price;
    const formattedPrice = dop.toLocaleString('en-US', { style: 'currency', currency: 'INR' });

    container.innerHTML += `
        <div class="buyprdct">
          <div class="prdctimg"><img class="prdctimage" src="/${order.img}"></div>
          <div class="prdctname">${order.name}</div>
          <div class="prdctkit">${order.kit}</div>
          <div class="prdctmarkt">
            <div class="prdctprice">${formattedPrice}</div>
            <div class="prdctqnt js-prdctqnt">${order.quantity}</div>
          <div class="prdctprice">Total: ${formattedoPrice}</div>
          </div>
        </div>    
    `;
  });
}