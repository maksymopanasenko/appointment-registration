function draggAndDropp(selector) {
    $(selector).sortable({
        containment: "window",
        helper: "clone",
        cursor: "grab",
        tolerance: 'pointer'
    });
}

export default draggAndDropp;