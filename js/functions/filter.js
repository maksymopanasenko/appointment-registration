document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const urgencySelect = document.getElementById("urgencySelect").value;

    filterCards(searchInput, urgencySelect);
});
function filterCards(searchInput, urgencySelect) {
    const cards = document.querySelectorAll(".col-sm-4");

    cards.forEach(card => {
        const doctorElement = card.querySelector("#doctor");
        const nameElement = card.querySelector("#name");
        const purposeElement = card.querySelector("#reason");
        const descriptionElement = card.querySelector("#description");
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

            
        const isUrgent =
            (!urgencySelect || urgencySelect === "Select the urgency") || 
            (urgencySelect === "3" && urgencyText.includes("urgent")) ||
            (urgencySelect === "4" && urgencyText.includes("priority")) ||
            (urgencySelect === "5" && urgencyText.includes("regular"));

        if (containsSearchTerm && isUrgent) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

export default filterCards;
