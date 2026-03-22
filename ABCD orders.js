import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { 
  getFirestore, collection, getDocs, query, where 
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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadOrders(user);
});

async function loadOrders(user) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  container.innerHTML = "";

  if (snapshot.empty) {
    container.innerHTML = "<p>No orders yet</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const order = docSnap.data();

    container.innerHTML += `
      <div style="border:1px solid white; padding:10px; margin:10px;">
        <h3>${order.name}</h3>
        <p>${order.kit}</p>
        <p>₹${order.price}</p>
        <p>Quantity: ${order.quantity}</p>
        <p>Total: ₹${order.total}</p>
        <p>Status: ${order.status}</p>
      </div>
    `;
  });
}