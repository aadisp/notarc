import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAx1vpBGEKGcKHMnSQuAfBxH-NeiF9BUM8",
  authDomain: "notarc-1a2ae.firebaseapp.com",
  projectId: "notarc-1a2ae",
  storageBucket: "notarc-1a2ae.firebasestorage.app",
  messagingSenderId: "135940483875",
  appId: "1:135940483875:web:de38bf9d7984083954ba96"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const authLink = document.getElementById("authLink");
const hasLoggedInBefore = localStorage.getItem("hasLoggedInBefore");

onAuthStateChanged(auth, async (user) => {
  if (user) {

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email,
        role: "user",
        createdAt: new Date()
      });
    }
    // ✅ Currently logged in
    
    authLink.innerText = "Logout";
    window.logoutUser = () => {
      signOut(auth);
    }

    /*authLink.innerText = "View Dashboard";
    authLink.href = "dashboard.html";*/

    checkCartOnLoad(user);
  } 
  else if (hasLoggedInBefore) {
    // ✅ Logged in sometime in the past on this device
    authLink.innerText = "Log In";
    authLink.href = "login.html";
  } 
  else {
    // ✅ First-time user on this device
    authLink.innerText = "Sign Up";
    authLink.href = "signup.html";
  }
});

window.addToCart = async function(product) {
  const user = auth.currentUser;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const cartRef = doc(db, "users", user.uid, "cart", product.id);

  await setDoc(cartRef, {
    name: product.name,
    kit: product.kit,
    price: product.price,
    quantity: 1,
    img:product.img
  });

  updateButtonToViewCart(product.id); 
};

function updateButtonToViewCart(productId) {
  const btn = document.querySelector(`[data-id="${productId}"]`);

  if (!btn) return;

  btn.innerText = "View in Cart";

  btn.onclick = () => {
    window.location.href = "AB cart.html";
  };
}

async function checkCartOnLoad(user) {
  const cartRef = collection(db, "users", user.uid, "cart");
  const snapshot = await getDocs(cartRef);

  snapshot.forEach(docSnap => {
    updateButtonToViewCart(docSnap.id);
  });
}