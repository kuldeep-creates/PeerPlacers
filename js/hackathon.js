document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".filter-button");
    const cards = document.querySelectorAll(".hackathon-card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter cards
            cards.forEach(card => {
                const venue = card.getAttribute("data-venue");
                if (filter === "all" || filter === venue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});
