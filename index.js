$(document).ready(function () {
    $('#add-choice-btn').on('click', function (event) {
        addChoiceBtnClicked(event);
    });

    $('#quiz-title').on('input', function (event) {
        titleChanged(event);
    });

    $('#quiz-content').on('input', function (event) {
        questionChangedInTextArea(event);
    });

    $('#submit-button').on('click', function (event) {
        submitClicked(event);
    });

    $('#export-button').on('click', function (event) {
        exportClicked(event);
    });
});

function makeTitleHTMLWithText(quizTitle) {
    var titleHTML = '<div class="h3 p-3">' + $('#quiz-title').val() + '</div>';
    return titleHTML
};

function titleChanged(event) {
    var titleHTML = makeTitleHTMLWithText($('#quiz-title').val());
    $('#title-box').html(titleHTML);
};



function getURLSearchParams() {
    var params = new URLSearchParams(window.location.search);
    return params;
};

function decodeURL(url) {
    var decodedURL = decodeURI(url);
    return decodedURL;
};

function correctChoiceAndCorrectAnswer(event) {
    var rightDeco = '<div class="col-1 m-auto fw-bold text-success text-center">RIGHT</div>';

    $(element).parent().prepend(rightDeco);
    $(element).removeClass('btn-primary');
    $(element).removeClass('btn-outline-dark');
    $(element).addClass('btn-success text-white');
};

function wrongChoiceAndWrongAnswer(event) {
    var wrongDeco = '<div class="col-1 m-auto fw-bold text-danger text-center">WRONG</div>';

    $(element).parent().prepend(wrongDeco);
    $(element).removeClass('btn-primary');
    $(element).removeClass('btn-outline-primary');
    $(element).addClass('btn-success text-white');
};



function makeEncodedURL(quizTitle, quizContent) {
    var url = 'https://windowcow.github.io/quiz-template/?title=' + quizTitle + '&content=' + quizContent;
    var encodedURL = encodeURI(url);
    console.log(encodedURL);
    return url;
};


function makeQuizChoiceHTMLWithText(quizChoiceText) {
    var rightChoicePattern = /-\[[oO]]\s(.*)\n/g;
    var wrongChoicePattern = /-\[[xX]]\s(.*)\n/g;
    // html fragment
    var preOfCorrect = '<div class="row"><button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="correct" data-toggle="button" aria-pressed="false" autocomplete="off">';
    var postOfCorrect = '</button></div>';
    var preOfWrong = '<div class="row"><button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="wrong" data-toggle="button" aria-pressed="false" autocomplete="off">';
    var postOfWrong = '</button></div>';

    var choicesHTML = quizChoiceText.replace(rightChoicePattern, preOfCorrect + '$1' + postOfCorrect);
    choicesHTML = choicesHTML.replace(wrongChoicePattern, preOfWrong + '$1' + postOfWrong);
    return choicesHTML
};

function updateQuizOutOfHTML(quizTitle, quizChoices) {
    var titleHTML = makeTitleHTMLWithText(quizTitle);
    var choicesHTML = makeQuizChoiceHTMLWithText(quizChoices);
    $('#title-box').html(titleHTML);
    $('#choice-box').html(choicesHTML);
    $('#choice-box button').on('click', function (event) {
        choiceClicked(event);
    });
};


function questionChangedInTextArea(event) {
    var quizContent = $('#quiz-content').val();
    var quizTitle = $('#quiz-title').val();
    updateQuizOutOfHTML(quizTitle, quizContent);
};

function choiceClicked(event) {
    event.preventDefault();
    console.log('choiceClicked');
    event.target.classList.toggle('btn-outline-dark');
    event.target.classList.toggle('btn-primary');
    event.target.classList.toggle('text-white');
    event.target.classList.toggle('checked-as-answer');
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
};

function exportClicked(event) {
    event.preventDefault();
    console.log('exportClicked');
    var quizTitle = $('#quiz-title').val();
    var quizContent = $('#quiz-content').val();
    var url = makeEncodedURL(quizTitle, quizContent);
    $('#export-button').attr('href', url);
};