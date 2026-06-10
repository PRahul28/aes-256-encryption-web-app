document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // FILE NAME DISPLAY
    // ===============================
    function setupFileInput(fileInputId, labelId) {

        const fileInput = document.getElementById(fileInputId);
        const label = document.getElementById(labelId);

        if (!fileInput || !label) return;

        fileInput.addEventListener("change", function () {

            if (fileInput.files.length === 0) {
                label.textContent = "Click to browse or drag & drop";
                return;
            }

            if (fileInput.files.length === 1) {
                label.textContent = fileInput.files[0].name;
                return;
            }

            // MULTIPLE FILES
            let names = [];

            for (let i = 0; i < fileInput.files.length; i++) {
                names.push(fileInput.files[i].name);
            }

            label.textContent =
                `${fileInput.files.length} files selected: ` +
                names.slice(0, 3).join(", ") +
                (fileInput.files.length > 3 ? " ..." : "");
        });
    }

    setupFileInput("encryptFile", "encryptFileName");
    setupFileInput("decryptFile", "decryptFileName");


    // ===============================
    // KEY COUNTER (0/32)
    // ===============================

    function setupKeyCounter(inputId, counterId) {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(counterId);

        if (!input || !counter) return;

        input.addEventListener("input", function () {

            let len = input.value.length;

            if (len > 32) len = 32;

            if (len === 32) {
                counter.innerHTML = `32 / 32 characters <span style="color:green; font-weight:bold;">✔</span>`;
            } else {
                counter.textContent = `${len} / 32 characters`;
            }
        });
    }

    setupKeyCounter("enc_key", "encCounter");
    setupKeyCounter("dec_key", "decCounter");

});

function copyToClipboard(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) return;

    navigator.clipboard.writeText(input.value)
        .then(() => {
            const original = button.innerHTML;
            button.innerHTML = "✔️";

            setTimeout(() => {
                button.innerHTML = original;
            }, 1200);

        })
        .catch(() => {
            input.select();
            document.execCommand("copy");
        });
}
function generateKey(inputId) {

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let key = "";

    for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const input = document.getElementById(inputId);
    input.value = key;

    const counterId = inputId === "enc_key" ? "encCounter" : "decCounter";
    const counter = document.getElementById(counterId);

    if (counter) {
        counter.innerHTML = `32 / 32 characters <span style="color:green; font-weight:bold;">✔</span>`;
    }
}