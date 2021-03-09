var header = document.querySelector("header");
var prevScrollPos = window.pageYoffset;
window.onscroll = function(){
    var currentScrollPos = window.pageYOffset;
        if(prevScrollPos> currentScrollPos){
            header.style.top = "0";
        }else{
            header.style.top = "-80px"
        }
        prevScrollPos = currentScrollPos;
}


var loginModalBtn= document.querySelector("header .btn-login");
var navloginModalBtn= document.querySelector(".my-nav .btn-login");
var loginModalBg = document.querySelector(".login-modal-bg");
var signupModalBg = document.querySelector(".signup-modal-bg");
var checoutModalBg =document.querySelector(".secure-checkout-bg");
var openCheckoutModal = document.querySelector(".sign-up-btn");

navloginModalBtn.addEventListener("click",function(){
    loginModalBg.style.display = "block";
});

loginModalBtn.addEventListener("click",function(){
    loginModalBg.style.display = "block";
});

window.addEventListener("click", function(e){
    if(e.target == loginModalBg){
        loginModalBg.style.display = "none";
    }
})

window.addEventListener("click", function(e){
    if(e.target == signupModalBg){
        signupModalBg.style.display = "none";
    }
})

// var signupModalBtn= document.querySelector(".btn-signup");
// var signupModalBg = document.querySelector(".signup-modal-bg")

// signupModalBtn.addEventListener("click",function(){
//     signupModalBg.style.display = "block";
// });

// window.addEventListener("click", function(e){
//     if(e.target == signupModalBg){
//         signupModalBg.style.display = "none";
//     }
// })

// openCheckoutModal.addEventListener("click", function(){
//     checoutModalBg.style.display= "block";
// });

// window.addEventListener("click", function(e){
//     if(e.target == checoutModalBg){
//         checoutModalBg.style.display = "none";
//     }
// })

var newAccount = document.querySelector(".login-modal-bg .signup");

newAccount.addEventListener("click", function(){
    signupModalBg.style.display = "block";
    loginModalBg.style.display = "none";
    
});

var accessLogin =document.querySelector(".signup-modal-bg .login");

accessLogin.addEventListener("click", function(){
    loginModalBg.style.display = "block";
    signupModalBg.style.display = "none";
})

var resetBtn = document.querySelector(".login-modal .reset a")
var resetPassBg = document.querySelector(".reset-pass-bg")

resetBtn.addEventListener("click", function(){
    resetPassBg.style.display = "block";
})

var setResetCode = document.querySelector(".second-modal .set-reset-code a")
var setNewpassBg = document.querySelector(".set-newpass-bg")

setResetCode.addEventListener("click", function(){
    setNewpassBg.style.display = "block";
    resetPassBg.style.display = "none";
})

var getResetCode = document.querySelector(".second-modal .get-reset-code a")

getResetCode.addEventListener("click", function(){
    resetPassBg.style.display = "block";
    setNewpassBg.style.display = "none";
})

window.addEventListener("click", function(e){
    if(e.target == resetPassBg){
        resetPassBg.style.display = "none";
    }
})

window.addEventListener("click", function(e){
    if(e.target == setNewpassBg){
        setNewpassBg.style.display = "none";
    }
})

var hamburger = document.querySelector(".btn-container");
var navBar = document.querySelector(".my-nav")
function openNav() {
    hamburger.classList.toggle("change");
    navBar.classList.toggle("open-nav-modal");
}