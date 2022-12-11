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

    $('#refresh-button').on('click', function (event) {
        refreshClicked(event);
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


function refreshClicked(event) {
    event.preventDefault();
    console.log('refreshClicked');
    $('#submit-button').prop('disabled', false);
    questionChangedInTextArea(event);
};


function makeEncodedURL(quizTitle, quizContent) {
    var url = 'https://windowcow.github.io/quiz-template/?title=' + quizTitle + '&content=' + quizContent;
    var encodedURL = encodeURI(url);
    console.log(encodedURL);
    return encodedURL;
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

function correctChoiceAndCorrectAnswer(element) {
    var rightDeco = '<div class="col-1 m-auto fw-bold text-success text-center">RIGHT</div>';

    $(element).parent().prepend(rightDeco);
    $(element).removeClass('btn-primary');
    $(element).removeClass('btn-outline-dark');
    $(element).addClass('btn-success text-white');
};

function wrongChoiceAndWrongAnswer(element) {
    var rightDeco = '<div class="col-1 m-auto fw-bold text-success text-center">RIGHT</div>';

    $(element).parent().prepend(rightDeco);
    $(element).removeClass('btn-primary');
    $(element).removeClass('btn-outline-dark');
    $(element).addClass('btn-danger text-white');
};

function submitClicked(event) {
    event.preventDefault();
    console.log('submitClicked');

    $('#choice-box button').each(function (index, element) {
        if ($(element).hasClass('checked-as-answer') && $(element).attr('type') == 'correct') {
            correctChoiceAndCorrectAnswer(element);
            element.disabled = true;
            event.target.disabled = true;

        }
        else if (!$(element).hasClass('checked-as-answer') && $(element).attr('type') == 'wrong') {
            wrongChoiceAndWrongAnswer(element);
            element.disabled = true;
            event.target.disabled = true;
        }
        else {
            var wrongDeco = '<div class="col-1 m-auto fw-bold text-danger text-center">WRONG</div>';
            $(element).parent().prepend(wrongDeco);
            $(element).removeClass('btn-primary');
            $(element).removeClass('btn-outline-primary');
            $(element).toggle('text-white');
            $(element).addClass('btn-outline-danger');
            $(element).append('-> THIS IS A WRONG CHOICE');
            element.disabled = true;
            event.target.disabled = true;

        }
    });
};

function exportClicked(event) {
    event.preventDefault();
    console.log('exportClicked');
    var quizTitle = $('#quiz-title').val();
    var quizContent = $('#quiz-content').val();
    var url = makeEncodedURL(quizTitle, quizContent);
    console.log(url);

    $('#dummy').val(url);
    $('#dummy').select();
    document.execCommand('copy');
    alert('Link Copied as iframe!');
};