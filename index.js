$(document).ready(function () {
    $('#add-choice-btn').on('click', function (event) {
        addChoiceBtnClicked(event)
    });
    $('#question').on('input', function (event) {
        questionChanged(event)
    });
});

function addChoiceBtnClicked(event) {
    event.preventDefault();
    console.log('addChoiceBtnClicked');
};



function questionChanged(event) {
    var rightChoicePattern = /-\[[oO]]\s(.*)\n/;
    var wrongChoicePattern = /-\[[xX]]\s(.*)\n/;
    console.log('questionChanged');
}