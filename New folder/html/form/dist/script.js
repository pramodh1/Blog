console.log("hello");


$(".form").on('click', function () {
  $(this).addClass('active');
});

$(".submit").on('click', function () {
  $(this).parent().parent().hide(300);
  $(".ok_message").addClass("active");
});

$(".ok_message").on('click', function () {
  $(this).removeClass("active");
  $(".form").removeClass("active").show();
});






var firebaseConfig = {
  apiKey: "AIzaSyAT1l-iJGW2QqAm9fji5iUwE8mMz88spRU",
  authDomain: "fir-c59f4.firebaseapp.com",
  databaseURL: "https://fir-c59f4.firebaseio.com",
  projectId: "fir-c59f4",
  storageBucket: "fir-c59f4.appspot.com",
  messagingSenderId: "321295924239",
  appId: "1:321295924239:web:7ff69700f14d4ccae6f77a",
  measurementId: "G-ENLMV499N9"


};



firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

const sumbitbtn = document.querySelector('.submit');
let username = document.querySelector('#name');

let useremail = document.querySelector('#email');
let usermsg = document.querySelector('#text');
const db = firestore.collection("contactdata");

sumbitbtn.addEventListener("click", function () {
  console.log("clicked");

  let usernameinput = username.value;
  let useremailinput = useremail.value;
  let usermsginput = usermsg.value;

  db.doc().set({
      name: usernameinput,
      email: useremailinput,
      msg: usermsginput
    })
    .then(function () {
      console.log("data saved");
    })
    .catch(function (error)

      {

        console.log(error)
      });

});