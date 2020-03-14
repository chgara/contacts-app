const eraseError = () => {
    const btn = document.querySelectorAll(".error-btn");
    const msg = document.querySelectorAll(".error-msg");

    btn.forEach((boton, currentValue) => {
        boton.addEventListener("click", () => {
            msg[currentValue].classList.add("none");
        });
    });
    const btn2 = document.querySelectorAll(".success-btn");
    const msg2 = document.querySelectorAll(".success-msg");

    btn2.forEach((boton, currentValue) => {
        boton.addEventListener("click", () => {
            msg2[currentValue].classList.add("none");
        });
    });
};
eraseError();
