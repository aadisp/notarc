import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { 
  getFirestore, collection, getDocs, doc, getDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAx1vpBGEKGcKHMnSQuAfBxH-NeiF9BUM8",
  authDomain: "notarc-1a2ae.firebaseapp.com",
  projectId: "notarc-1a2ae",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userMap = {};
let allOrders = [];
let currentFilter = "all";

//const container = document.getElementById("admin-container");
const ordersContainer = document.getElementById("orders-container");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  // 🔒 CHECK ADMIN
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists() || snap.data().role !== "admin") {
    alert("Access denied");
    window.location.href = "/index.html";
    return;
  }

  await loadAllUsers();
  await loadAllOrders();
});

async function loadAllUsers() {
  const usersSnap = await getDocs(collection(db, "users"));
console.log(usersSnap.docs.length);
  //container.innerHTML = "";

  for (const userDoc of usersSnap.docs) {
    const userId = userDoc.id;

    const userData = userDoc.data();
    const usertag = userData.username || userData.email || "No Email";

    userMap[userId] = usertag;

    if (userData.username){
      //container.innerHTML += `<h2>User: ${usertag} - ${userData.email}</h2>`;
    }else{
      //container.innerHTML += `<h2>User: ${usertag}</h2>`;
    }
    const cartSnap = await getDocs(
      collection(db, "users", userId, "cart")
    );

    cartSnap.forEach(item => {
      const data = item.data();

      //container.innerHTML += `
       // <div style="margin-left:20px;">
       //   <p>${data.name} (${data.kit}) - ₹${data.price} × ${data.quantity}</p>
       // </div>
     // `;
    });
  }
}

async function loadAllOrders() {
  const snapshot = await getDocs(collection(db, "orders"));

  allOrders = [];

  snapshot.forEach(docSnap => {
    allOrders.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  renderOrders();
}

function renderOrders() {
  ordersContainer.innerHTML = "";

  let filtered = [...allOrders];

  // 🔥 SORT BY DATE (NEWEST FIRST)
  filtered.sort((a, b) => {
    return b.createdAt.seconds - a.createdAt.seconds;
  });

  if (currentFilter !== "all") {
    filtered = allOrders.filter(order => order.status === currentFilter);
  }

  if (filtered.length === 0) {
    ordersContainer.innerHTML = "<p>No orders found</p>";
    return;
  }

  filtered.forEach(order => {
    const usertag = userMap[order.userId] || "Unknown User";
    const date = order.createdAt?.toDate().toLocaleString() || "No date";
    let markcheck="Mark as Delivered";
    let markclass="prdctbuybtnchk ";
    if (order.status=="delivered"){
      markcheck='&#10003';
      markclass+="prdctbuybtnchked ";
    }

    const dp=order.price*order.quantity;
    const formattedoPrice = dp.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
    const dop=order.price;
    const formattedPrice = dop.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
    ordersContainer.innerHTML += `

      <div class="buyprdct">
        <div class="prdctimg"><img class="prdctimage" src="/${order.img}"></div>
        <div class="prdctname">${order.name}</div>
        <div class="prdctkit">${order.kit}</div>
        <div class="prdctkit">${usertag}</div>
        <div class="prdctkit">${date}</div>
        <div class="prdctkit">${order.status}</div>
        <div class="prdctmarkt">
          <div class="prdctprice">${formattedPrice}</div>
          <div class="prdctqnt js-prdctqnt">${order.quantity}</div>
          <div class="prdctprice">Total: ${formattedoPrice}</div>
        </div>
        <div class="prdctfate">
          <button class="${markclass}" onclick="markDelivered('${order.id}')" id="mark-as-delivered">
            ${markcheck}
          </button>
        </div>
      </div> 

    `;
  });
}

window.filterOrders = function(status) {
  currentFilter = status;
  renderOrders();
};

window.markDelivered = async function(orderId) {
  const ref = doc(db, "orders", orderId);

  await updateDoc(ref, {
    status: "delivered"
  });

  // update local data
  const order = allOrders.find(o => o.id === orderId);
  if (order) order.status = "delivered";


  renderOrders();
  
  
};