window.addEventListener("load", () => {
    const display = () => {
        const contacts = document.querySelectorAll(".contact-card");
        let delay = 0;
        for (let i = 1; i < contacts.length; i++) {
            contacts[1].classList.add("display");
            contacts[i].animate(
                [
                    // keyframes
                    { transform: "translateX(-500%)" },
                    { transform: "translateX(-450%)" },
                    { transform: "translateX(-400%)" },
                    { transform: "translateX(-350%)" },
                    { transform: "translateX(-300%)" },
                    { transform: "translateX(-250%)" },
                    { transform: "translateX(-200%)" },
                    { transform: "translateX(-150%)" },
                    { transform: "translateX(-100%)" },
                    { transform: "translateX(-50%)" },
                    { transform: "translateX(0%)" }
                ],
                {
                    // timing options
                    duration: 500,
                    delay: (delay += 100)
                }
            ).onfinish = ev => {
                let e = i++;
                contacts[e].classList.add("display");
            };
        }
    };
    const erase = () => {
        const eraseBtn = document.querySelectorAll(".delete-btn");
    };

    display();
    erase();
});
