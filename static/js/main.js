
const toggleBtn =
document.getElementById("themeToggle");

toggleBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){
        toggleBtn.innerHTML =
        "☀️ Light";
    }
    else{
        toggleBtn.innerHTML =
        "🌙 Dark";
    }
});


function copyText(
    textareaId,
    btn,
    originalText
)
{
    const text =
    document.getElementById(
        textareaId
    );

    navigator.clipboard.writeText(
        text.value
    );

    btn.innerHTML = "✓";

    setTimeout(() => {

        btn.innerHTML =
        originalText;

    }, 1200);
}
