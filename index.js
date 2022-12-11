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

    $('#submit-button').on('click', function (event) {
        submitClicked(event);
    });
});

function titleChanged(event) {
    var text = '<div class="h3 p-3">' + $('#quiz-title').val() + '</div>';
    $('#title-box').html(text);
};

function correctChoiceAndCorrectAnswer(event) {
    $(element).removeClass('btn-primary');
    $(element).removeClass('btn-outline-dark');
    $(element).addClass('btn-success text-white');
};

function wrongChoiceAndWrongAnswer(event) {
    $(element).removeClass('btn-primary');
    $(element).removeClass('btn-outline-primary');
    $(element).addClass('btn-success text-white');
};

function submitClicked(event) {
    event.preventDefault();
    console.log('submitClicked');
    $('#choice-box button').each(function (index, element) {
        if ($(element).hasClass('checked-as-answer') && $(element).attr('type') == 'correct') {
            correctChoiceAndCorrectAnswer(event);
        }
        else if (!$(element).hasClass('checked-as-answer') && $(element).attr('type') == 'wrong') {
            wrongChoiceAndWrongAnswer(event);
        }
        else {
            $(element).removeClass('btn-primary');
            $(element).addClass('btn-outline-danger');
        }
    });
}

function makeEncodedURL(quizTitle, quizContent) {
    var url = 'https://windowcow.github.io/quiz-template/?title=' + quizTitle + '&content=' + quizContent;
    var encodedURL = encodeURI(url);
    return url;
}



function choiceClicked(event) {
    event.preventDefault();
    console.log('choiceClicked');
    event.target.classList.toggle('btn-outline-dark');
    event.target.classList.toggle('btn-primary');
    event.target.classList.toggle('text-white');
    event.target.classList.toggle('checked-as-answer');
};

function questionChanged(event) {
    // regex pattern
    var rightChoicePattern = /-\[[oO]]\s(.*)\n/g;
    var wrongChoicePattern = /-\[[xX]]\s(.*)\n/g;
    var content = $('#quiz-content').val();

    // html fragment
    var preOfCorrect = '<button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="correct" data-toggle="button" aria-pressed="false" autocomplete="off">';
    var postOfCorrect = '</button>';

    var preOfWrong = '<button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="wrong" data-toggle="button" aria-pressed="false" autocomplete="off">';
    var postOfWrong = '</button>';

    var result = content.replace(rightChoicePattern, preOfCorrect + '$1' + postOfCorrect);
    result = result.replace(wrongChoicePattern, preOfWrong + '$1' + postOfWrong);

    $('#choice-box').html(result);

    $('#choice-box button').on('click', function (event) {
        choiceClicked(event);
    });
};

