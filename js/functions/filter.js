
document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Предотвращаем отправку формы, чтобы не перезагружать страницу
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const urgencySelect = document.getElementById("urgencySelect").value;

    // Вызывайте функцию, которая выполнит поиск и фильтрацию
    filterCards(searchInput, urgencySelect);
});
function filterCards(searchInput, urgencySelect) {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const doctorElement = card.querySelector(".visible p:nth-child(1)");
        const nameElement = card.querySelector(".visible p:nth-child(2)");
        const purposeElement = card.querySelector(".hidden p:nth-child(1)");
        const descriptionElement = card.querySelector(".hidden p:nth-child(2)");
        const urgencyElement = card.querySelector(".hidden p:nth-child(3)");

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
