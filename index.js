$(document).ready(function () {
    $('#add-choice-btn').on('click', function (event) {
        addChoiceBtnClicked(event);
    });

    $('#quiz-title').on('input', function (event) {
        titleChanged(event);
    });

    $('#quiz-content').on('input', function (event) {
        questionChanged(event);
    });
});

function addChoiceBtnClicked(event) {
    event.preventDefault();
    console.log('addChoiceBtnClicked');
};

function titleChanged(event) {
    var text = '<div class="h3">' + $('#quiz-title').val() + '</div>';
    $('#title-box').html(text);
    console.log('titleChanged');
};

function questionChanged(event) {
    var rightChoicePattern = /-\[[oO]]\s(.*)\n/g;
    var wrongChoicePattern = /-\[[xX]]\s(.*)\n/g;
    var content = $('#quiz-content').val();

    var preOfCorrect = '<button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="correct">';
    var postOfCorrect = '</button>';

    var preOfWrong = '<button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="wrong">';
    var postOfWrong = '</button>';
    var result = content.replace(rightChoicePattern, preOfCorrect + '$1' + postOfCorrect);
    result = result.replace(wrongChoicePattern, preOfWrong + '$1' + postOfWrong);

    $('#choice-box').html(result);

    console.log('questionChanged');
    console.log(result);
};