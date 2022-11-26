$(document).ready(function () {
    $('#add-choice-btn').on('click', function (event) {
        addChoiceBtnClicked(event)
    });

});

function addChoiceBtnClicked(event) {
    event.preventDefault();
    console.log('addChoiceBtnClicked');
};