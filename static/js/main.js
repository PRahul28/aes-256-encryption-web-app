const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
    themeBtn.addEventListener("click", 
        function() {
            document.body.classList.toggle("dark-mode");
            if(
                document.body.classList.contains("dark-mode")
            ){
                localStorage.setItem("theme","dark");
                this.innerHTML = "☀️ Light";
            } 
            else{
                localStorage.setItem("theme", "light");
                this.innerHTML = "🌙 Dark";
            }
        }
    );
}


function copyText(textareaId, btn, originalText){
    const text = document.getElementById(textareaId);
    navigator.clipboard.writeText(text.value);
    btn.innerHTML = "✓";
    setTimeout(() => {btn.innerHTML = originalText;}, 1200);
}

        const particlesContainer = document.getElementById('particles-container');
        const particleCount = 1000;
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            resetParticle(particle);
            particlesContainer.appendChild(particle);
            animateParticle(particle);
        }
                    
        function resetParticle(particle) {
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = '0';

            return {x: posX, y: posY};
        }
        
        function animateParticle(particle) {
            const pos = resetParticle(particle);
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 1;

            setTimeout(() => {
                particle.style.transition = `all ${duration}s linear`;
                particle.style.opacity = Math.random() * 0.3 + 0.1;
                const moveX = pos.x + (Math.random() * 20 - 10);
                const moveY = pos.y - Math.random() * 30;
                particle.style.left = `${moveX}%`;
                particle.style.top = `${moveY}%`;
                setTimeout(() => {animateParticle(particle);}, duration * 1000);}, delay * 1000);
        }
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) * 100;
            const mouseY = (e.clientY / window.innerHeight) * 100;
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${mouseX}%`;
            particle.style.top = `${mouseY}%`;
            particle.style.opacity = '0.6';
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.style.transition = 'all 2s ease-out';
                particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
                particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
                particle.style.opacity = '0';
                setTimeout(() => {particle.remove();}, 2000);}, 10);
            const spheres = document.querySelectorAll('.gradient-sphere');
            const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
            spheres.forEach(sphere => {
                const currentTransform = getComputedStyle(sphere).transform;
                sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });



function setupAjaxForm(formId, textAreaId, endpoint, responseField){
    const form = document.getElementById(formId);
    if(!form) return;
    form.addEventListener("submit", async function(e){
        const text = document.getElementById(textAreaId).value.trim();
        if(!text) return;
        e.preventDefault();
        try{
            const formData = new FormData(form);
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if(data.error){
                alert(data.error);
                return;
            }
            document.getElementById(textAreaId).value = data[responseField];
        }
        catch(error){
            console.error(error);
            alert("Something went wrong.");
        }

    });
}


setupAjaxForm(
    "encryptForm",
    "encryptText",
    "/encrypt",
    "ciphertext",
    "enc_key"
);

setupAjaxForm(
    "decryptForm",
    "decryptText",
    "/decrypt",
    "plaintext",
    "dec_key"
);




window.addEventListener("load", () => {
    const encryptText = document.getElementById("encryptText");
    const decryptText = document.getElementById("decryptText");

    if (encryptText) encryptText.value = "";
    if (decryptText) decryptText.value = "";

    const savedTheme = localStorage.getItem("theme");
    const themeBtn = document.getElementById("themeToggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.innerHTML = "☀️ Light";

    } else {
        document.body.classList.remove("dark-mode");
        if (themeBtn) themeBtn.innerHTML = "🌙 Dark";
    }
});


