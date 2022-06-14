// Import the functions you need from the SDKs you need
const {initializeApp} = require('firebase/app');
const {getDatabase, onValue, ref, child, get, set} = require('firebase/database');

const { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const { getStorage, uploadBytes } = require("firebase/storage");


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU7GIVXivREBpe0BlYGPSLvDKYPOAYQc0",
  authDomain: "awsauth-53fbe.firebaseapp.com",
  projectId: "awsauth-53fbe",
  storageBucket: "awsauth-53fbe.appspot.com",
  messagingSenderId: "259829351416",
  appId: "1:259829351416:web:b197f66ef80ffdb5144c0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);


// init user id
let userId = null;

async function writeUserLogin(userId) {
  const dbRef = ref(db);
  get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('total logins:', snapshot.val().totalLogins);
      set(ref(db, 'users/' + userId), {
        totalLogins: ++snapshot.val().totalLogins,
        lastLogin: Date()
      });
    } else {
      set(ref(db, 'users/' + userId), {
        totalLogins: 1,
        lastLogin: Date()
      })
    }
  }).catch((error) => {
    console.error(error);
  });
}

function signIn(email, password) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      userId = user.uid
      writeUserLogin(userId);
      resolve(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      reject(errorMessage);
    });
  })
}

function createUser(name, email, passwd) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, passwd)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user);
        userId = user.uid;
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          // Profile updated!
          resolve(auth.currentUser.providerData);
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
          console.log(error)
          reject(error);
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        reject(errorMessage);
        // ..
      });
  })
}


// For basic write operations, you can use set() to save data to a specified reference,
function createNewItem(itemName, count, desc, imgUrl) {
  return new Promise((resolve, reject) => {
    set(ref(db, 'inventory/' + itemName), {
      itemName: itemName,
      count: count,
      desc: desc,
      imgUrl: imgUrl
    })
    .then(() => {
      resolve('//Data saved successfully!');
    })
    .catch((error) => {
      // The write failed...
      reject();
    });
  })
}

function readInventory() {
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `inventory/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      } else {
        console.log("No data available");
        resolve("No data available");
      }})
    .catch((error) => {
      console.error(error);
      reject();
    });
  })
}

// To read data at a path and listen for changes, use onValue() to observe events.
const userRef = ref(db, 'users/' + userId );
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
const invRef = ref(db, 'inventory/'  );
onValue(invRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

module.exports = { createUser, createNewItem, readInventory, signIn}