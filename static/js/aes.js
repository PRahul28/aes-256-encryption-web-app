document
    .querySelector('form[action="/encrypt"]')
    .addEventListener("submit", function(e){
        if(
            document
            .getElementById("enc_key")
            .value.length != 32
        ){
            e.preventDefault();
            alert("AES-256 Key must be exactly 32 characters.");
        }
    });

document
    .querySelector('form[action="/decrypt"]')
    .addEventListener("submit", function(e){
        if(
            document
            .getElementById("dec_key")
            .value.length != 32
        ){
            e.preventDefault();
            alert("AES-256 Key must be exactly 32 characters.");
        }
    });


document
    .getElementById("encryptFile")
    .addEventListener("change", function(){
        if(this.files.length > 0){
            document
            .getElementById("encryptFileName")
            .innerText =
            this.files[0].name;
        }

    });

document
    .getElementById("decryptFile")
    .addEventListener("change", function(){
        if(this.files.length > 0){
            document
            .getElementById("decryptFileName")
            .innerText =
            this.files[0].name;
        }

    });



//for encrypt
const encKey =
document.getElementById("enc_key");

const encCounter =
document.getElementById("encCounter");

encKey.addEventListener("input", ()=>{
    if(encKey.value.length == 32){
        encCounter.innerHTML = "✔";
    }
    else{
        encCounter.innerHTML = `${encKey.value.length}/32 characters`;
    }

});



//for decrypt
const decKey =
document.getElementById("dec_key");

const decCounter =
document.getElementById("decCounter");

decKey.addEventListener("input", ()=>{
   if(decKey.value.length == 32){
        decCounter.innerHTML = "✔";
    }
    else{
        decCounter.innerHTML = `${decKey.value.length}/32 characters`;
    }

});

function generateKey() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let key = "";

    for(let i=0;i<32;i++){
        key += chars[Math.floor(Math.random() * chars.length)];
    }

    const keyInput =
    document.getElementById("enc_key");

    keyInput.value = key;

    document
    .getElementById("encCounter")
    .innerHTML = "✔";
}



