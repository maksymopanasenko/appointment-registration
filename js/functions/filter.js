function filterCards(searchInput, statusSelect, urgencySelect) {
    const cards = document.querySelectorAll(".col-sm-6");

    cards.forEach(card => {
        const doctorElement = card.querySelector("#doctor");
        const nameElement = card.querySelector("#name");
        const purposeElement = card.querySelector("#reason");
        const descriptionElement = card.querySelector("#description");
        const statusElement = card.querySelector(".check-box");
        const urgencyElement = card.querySelector("#urgency");

        const doctor = doctorElement ? doctorElement.textContent.toLowerCase() : "";
        const name = nameElement ? nameElement.textContent.toLowerCase() : "";
        const purpose = purposeElement ? purposeElement.textContent.toLowerCase() : "";
        const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : "";
        const urgencyText = urgencyElement ? urgencyElement.textContent.toLowerCase() : "";

        const containsSearchTerm =
            doctor.includes(searchInput) ||
            name.includes(searchInput) ||
            purpose.includes(searchInput) ||
            description.includes(searchInput);

        const isStatusElementChecked = statusElement ? statusElement.checked : false;
        const isStatus = (!statusSelect || statusSelect === "Select the status") || 
        (statusSelect === "1" && !isStatusElementChecked) ||
        (statusSelect === "2" && isStatusElementChecked);

        const isUrgent =
            (!urgencySelect || urgencySelect === "Select the urgency") ||
            (urgencySelect === "3" && urgencyText.includes("urgent")) ||
            (urgencySelect === "4" && urgencyText.includes("priority")) ||
            (urgencySelect === "5" && urgencyText.includes("regular"));

        if (containsSearchTerm && isStatus && isUrgent) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

export default filterCards;
