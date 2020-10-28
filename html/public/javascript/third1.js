
var firebaseConfig = {
    apiKey: "AIzaSyCj-rGILaqOWJ5ylvmoZ-OcUjBJ4y3cGBw",
    authDomain: "blog-ec9c3.firebaseapp.com",
    databaseURL: "https://blog-ec9c3.firebaseio.com",
    projectId: "blog-ec9c3",
    storageBucket: "blog-ec9c3.appspot.com",
    messagingSenderId: "68118265750",
    appId: "1:68118265750:web:2b2255c051304ec07ae7b7",
    measurementId: "G-QTGC9C1T1F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  
  var name,email,sub,textfield;
  function ready()
  {
      console.log("working");
      name=document.getElementById('name1').value;
      email=document.getElementById('email1').value;
      sub=document.getElementsByClassName('sub').value;
      textfield=document.getElementById('textarea1').value;

  }
  document.getElementById('submit123').onclick=function ()
  {
      ready();
      firebase.database().ref('message/'+name).set
(
          {
              nameofuser:name,
              emailofuser:email,
              subjectuser:sub,
              text:textfield



          }
);
  }