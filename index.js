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

    var preOfCorrect = '<button class="m-0 btn input-group"><div class="input-group"><div class="form-control border border-3 border-success" type="correct">';
    var postOfCorrect = '</div></div></button>';

    var preOfWrong = '<button class="m-0 btn input-group"><div class="input-group"><div class="form-control border border-3 border-success" type="wrong">';
    var postOfWrong = '</div></div></button>';

    var result = content.replace(rightChoicePattern, preOfCorrect + '$1' + postOfCorrect);
    result = result.replace(wrongChoicePattern, preOfWrong + '$1' + postOfWrong);

    $('#choice-box').html(result);

    console.log('questionChanged');
    console.log(result);
};