document.querySelectorAll(".main-services details").forEach((detail) => {
    detail.addEventListener("click", function (e) {
        // Игнорира клика, ако вече е в <summary>
        if (e.target.tagName.toLowerCase() !== "summary") {
            // Затваря текущия <details>, ако е отворен
            if (detail.open) {
                detail.open = false;
            }
        }
    });
});
