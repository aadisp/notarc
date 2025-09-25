// Import Firebase dependencies
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp, doc, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfTl5OB-6QKUNPUEDeqOyX98xNgo3XidQ",
  authDomain: "notarc-6302f.firebaseapp.com",
  projectId: "notarc-6302f",
  storageBucket: "notarc-6302f.appspot.com",
  messagingSenderId: "841309472742",
  appId: "1:841309472742:web:74409d36af283542e87827",
  measurementId: "G-VQSD8ZQPCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// DOM elements
const loginForm = document.getElementById('login-form');
const imageForm = document.getElementById('blog-form');
const imageSection = document.getElementById('blog-section');
const imageList = document.getElementById('blog-list');
const imageInput = document.getElementById('image');

// State variables
let currentUser = null;

// Handle login form submission
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully');
        alert("Login successful :)");
        // Authentication state listener
        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUser = user;
                imageSection.style.display = 'block';
                loginForm.style.display = 'none';
                loadImages();
            } else {
                currentUser = null;
                imageSection.style.display = 'none';
                loginForm.style.display = 'block';
            }
        });
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again. :(');
    }
});

// Handle image form submission
imageForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show the loading spinner
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';

    const image = imageInput.files[0];

    try {
        let imageUrl = '';

        if (image) {
            // Upload image
            const imageRef = ref(storage, `galleryImages/${image.name}`);
            const snapshot = await uploadBytes(imageRef, image);
            imageUrl = await getDownloadURL(snapshot.ref);

            // Store image metadata in Firestore
            await addDoc(collection(firestore, 'galleryImages'), {
                userId: currentUser.uid,
                imageUrl,
                createdAt: Timestamp.now()
            });

            console.log('Image uploaded successfully');
        }

        // Clear form fields
        imageForm.reset();
        loadImages();
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred. Please try again.');
    } finally {
        // Hide the loading spinner
        loadingSpinner.style.display = 'none';
    }
});

// Load images and display them
const loadImages = async () => {
    if (!currentUser) return;

    try {
        const imagesQuery = query(collection(firestore, 'galleryImages'), where('userId', '==', currentUser.uid));
        const imagesSnapshot = await getDocs(imagesQuery);
        const images = imagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        imageList.innerHTML = '';
        images.forEach(image => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="col-lg-4 col-md-6 col-sm-12 portfolio-item sixth">
                    <div class="portfolio-wrap">
                        <a href="${image.imageUrl}" data-lightbox="portfolio">
                            <img src="${image.imageUrl}" alt="Portfolio Image">
                        </a>
                    </div>
                    <button class="delete-button" data-image-id="${image.id}">Delete</button>
                    <p>Uploaded at: ${new Date(image.createdAt.seconds * 1000).toLocaleString()}</p>
                </div>
            `;
            imageList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
};

// Add event listener to handle delete buttons
imageList.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('delete-button')) {
        const imageId = target.dataset.imageId; // Correctly retrieve image ID
        deleteImage(imageId);
    }
});
// Delete image function
const deleteImage = async (imageId) => {
    try {
        // Reference to the image document in Firestore
        const imageDocRef = doc(firestore, 'galleryImages', imageId);

        // Get the document data to retrieve the image URL
        const imageDoc = await getDoc(imageDocRef);
        if (imageDoc.exists()) {
            const imageUrl = imageDoc.data().imageUrl;

            // Extract the file name from the URL
            const fileName = decodeURIComponent(imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.indexOf('?')));

            // Reference to the image in Firebase Storage (without extra 'galleryImages/' prefix)
            const imageRef = ref(storage, `${fileName}`);

            // Delete the image from Firebase Storage
            await deleteObject(imageRef);

            // Delete the document from Firestore
            await deleteDoc(imageDocRef);

            console.log('Image deleted successfully');
            loadImages();
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image. Please try again.');
    }
};