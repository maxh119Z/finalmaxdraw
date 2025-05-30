//max's drawings new website
//old website previously got 2777 views, this website will continue off the previous website's analytics. New data of countries viewership is reset, stored again after may 28, 2025.
//EST: may 28, 2025
//maxhzhang119@gmail.com

const firebaseConfig = {
    apiKey: "AIzaSyAFhA7V3W43vNEjmbLvVYoQPwT9ghBgfrI",
    authDomain: "maxsdrawingssite.firebaseapp.com",
    projectId: "maxsdrawingssite",
    storageBucket: "maxsdrawingssite.firebasestorage.app",
    messagingSenderId: "857291781776",
    appId: "1:857291781776:web:78d249255de3051eadca15",
    measurementId: "G-BSGM41DVS7"
  };

function preloadImages(callback) {
  var imageUrls;
  
  imageUrls = ["images/point2.gif"]
  var loadedImagesCount = 0;
  var totalImages = imageUrls.length;

  function loadImage(url) {
    if (!url) {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages - 1) {
        callback()
      }
      return;
    }
    var img = new Image();
    img.src = url;

    img.onload = function() {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        callback();
      }
    };

    img.onerror = function() {
      console.error("Error loading image: " + url);
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        callback();
      }
    };
  }

  imageUrls.forEach(function(url) {
    loadImage(url);
  });
}

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

window.transitionToPage = function(href, id) {
    document.querySelector('body').style.opacity = 0;
    setTimeout(function() { 
      window.location.href = href;
    }, 200);
};

if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "aboutus.html"){

    document.getElementById("myform").addEventListener("submit", function (e) {
        const user = auth.currentUser;
        console.log(auth.currentUser);

        if (user){

            e.preventDefault();
    
            const form = e.target;
            const formData = new URLSearchParams();
            formData.append("name", form.name.value);
            formData.append("email", form.email.value);
            formData.append("message", form.message.value);
            formData.append("remail", user.email);
            formData.append("rname", user.displayName);
        
            console.log([...formData.entries()]);
        
            fetch("https://script.google.com/macros/s/AKfycbwtzsHfxEcL6sBA0T6GEbm8YT_5DfQAnPL1zMphJlsbrgyqmhQEcc2JXnzA-MbtpaeQPg/exec", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: formData.toString(),
          
            })
            .then(() => {
              
              form.reset();
    
              console.log("Form submitted successfully");
            })
            .catch(error => {
              console.error("Form submission error:", error);
            });
        }
        else{
            e.preventDefault();
            const input = document.getElementById("nameform");
    
            input.value = "Please login to ensure you are a real person.";
            input.classList.add("shakeit");
          
      
            setTimeout(() => {
              input.classList.remove("shakeit");
            }, 500);
        }
        
      });
}
  

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    preloadImages(aftergif);
    function aftergif(){
      if (document.title == "Max's Drawings"){
        const gifDiv = document.createElement('div');
      gifDiv.className = 'gif'; 
      const gifImg = document.createElement('img');
      gifImg.style.transform = 'scaleX(-1)';
      gifImg.src = 'images/point2.gif?t=' + new Date().getTime();
      gifImg.className = 'gifimg';
    
      gifImg.style.border = "none";
      gifDiv.appendChild(gifImg);
      if (isMobile.any() || window.self != window.top){
        gifImg.style.width = "150%";
      }
      document.body.appendChild(gifDiv);

      setTimeout(function() {  
   
          gifImg.remove();
          gifDiv.remove();
 
      }, 2300);

      setTimeout(function(){
        let container = document.getElementById("recent8");
        container.classList.add('shakec');
        setTimeout(function(){container.classList.remove('shakec')},300)
      },1744)

      }
          document.querySelector('body').style.opacity = 1;

    if(isMobile.any() || window.self != window.top){

        const header = document.getElementById("siteheader-content");

        const drop = document.getElementById("dropdiv");
        
        header.classList.add('no-transition');
        header.style.opacity = "0";
        document.getElementById("siteheader-content").style['pointer-events'] = 'none';
        void header.offsetHeight
        header.classList.remove('no-transition');
    
        drop.style.opacity = "1";
        updateUI(auth.currentUser);
    }
    if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == "index.html" || window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == ""){
        const db = firebase.firestore();
        const docRef = db.collection('viewcount').doc('viewcount');

        docRef.update({
              Views: firebase.firestore.FieldValue.increment(1)
        })

        let country;
        fetch("https://ipinfo.io/json?")
        .then(response => response.json())
        .then(data => {
          country = data.country
          console.log(data.country);
        })
        .catch(error => {
          console.error("IPInfo fetch error:", error);
        });

      
        const docRef2 = db.collection('2025MAY_curView2777').doc('countries');
        docRef2.get().then((doc) => {
          
          if (doc.exists) {

            const data = doc.data();
            
            let skip = true;
            Object.keys(data).forEach((key) => {

              if (key==country){
                docRef2.update({[`${country}`]: firebase.firestore.FieldValue.increment(1)})
                skip = false
              }

            });
            if(skip){
              console.log('US does NOT exist in the country map.');

              docRef2.set({
                  [`${country}`]: 0
              }, { merge: true }) 

            }
             
            
            }
        })
        

    }
    }
    
    

});



auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log("Auth state persistence set to LOCAL."))
    .catch(error => console.error("Error setting persistence:", error));

auth.onAuthStateChanged(user => {
      console.log("Auth state changed:", user);
      updateUI(user);
});

function handleAuth() {
    const user = auth.currentUser;

    if (user) {
        auth.signOut().then(() => {
            console.log("User logged out.");
           
        }).catch(error => console.error("Logout Error:", error));
    } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                console.log("User signed in:", result.user);
                saveUserToFirestore(result.user);
            })
            .catch(error => alert(`Error: ${error.message}`));
    }
}

function saveUserToFirestore(user) {
   
    const userRef = db.collection("users").doc(user.uid);

    userRef.set({
        email: user.email,
        name: user.displayName,
        uid: user.uid
    }, { merge: true }) 

}

function updateUI(user) {
    loginButtons = document.querySelectorAll('.login');
    if (user) {
        loginButtons.forEach(buttons=>{buttons.innerHTML = "Logout"})
        
    } else {
      loginButtons.forEach(buttons=>{buttons.innerHTML = "Login"})
       
    }
}



  function toggleMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("dropdown-menu");
  
    toggle.classList.toggle("open");
  
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
  }

  document.body.addEventListener('click', function (event) {

    if (!event.target.closest('.dropdown')) {
      toggleMenu()
    }

    
  });