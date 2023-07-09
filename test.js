let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});
const firebaseConfig = {
  apiKey: "AIzaSyD8GjcUwE_i_KxCT1kmmjQmKXJ_QDzqCq0",
  authDomain: "jsi-form.firebaseapp.com",
  projectId: "jsi-form",
  storageBucket: "jsi-form.appspot.com",
  messagingSenderId: "629018668389",
  appId: "1:629018668389:web:8e4879fb29d7b8a646058c",
};
firebase.initializeApp(firebaseConfig);
const createAccount = document.getElementById("create-account");
createAccount.addEventListener("click", () => {
  event.preventDefault();
  var name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  var cfpassword = document.querySelector('input[name="confirm-pvv"]').value;
  var phonenumber = document.querySelector('input[name="phone number"]').value;
  var date = document.querySelector('input[name="Date of birth"]').value;
  if (
    name == null ||
    email == null ||
    password == null ||
    cfpassword == null ||
    phonenumber == null ||
    date == null
  ) {
    alert("Häy nhâp day du");
    return;
  }
  if (password != cfpassword) {
    alert("not match");
    return;
  }
  //Thong bao loi khi password < 6 ki tu
  if (password.length < 6) {
    alert("not match");
    return;
  }
  //Luu tru ...

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.updateProfile({ displayName: name });
    })
    .catch((err) => {
      console.log(err.message);
    });
  //Firestore
  const db = firebase.firestore();
  // Add a new document in collection
  const newuser = {
    Name: name,
    "Date of birth": date,
    Email: email,
    Password: password,
    "Phone number": phonenumber,
  };
  console.log(newuser);
  db.collection("users")
    .doc(name)
    .set(newuser)
    .then(() => {
      console.log("Document successfully written!");
      slider.classList.remove("moveslider");
      formSection.classList.remove("form-section-move");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  var docRef = db.collection("users").doc(name);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
});

const loginAccount = document.getElementById("login");
loginAccount.addEventListener("click", () => {
  event.preventDefault();
  var email = document.querySelector('input[name="email-login"]').value;
  var password = document.querySelector('input[name="password-login"]').value;
  if (email == null || password == null) {
    alert("Häy nhâp day du");
    return;
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Login successful");
      var user = userCredential.user;
      window.location.href = "Main.html";
      alert("succesful");
      localStorage.setItem("currentusers", JSON.stringify(user));
      localStorage.setItem("login", "true");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert("not successful");
    });
});
