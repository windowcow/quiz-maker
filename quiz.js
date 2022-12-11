$(document).ready(function () {
    $('#add-choice-btn').on('click', function (event) {
        addChoiceBtnClicked(event);
    });

    $('#submit-button').on('click', function (event) {
        submitClicked(event);
    });

    setQuizContents();


});

function setQuizContents() {
    var quizTitle = getTitleFromURLSearchParams();
    var quizContent = getContentFromURLSearchParams();
    updateQuizOutOfHTML(quizTitle, quizContent);

};

function getTitleFromURLSearchParams() {
    var encodedURL = new URL(window.location.href);
    var decodedURL = decodeURI(encodedURL);
    console.log(decodedURL);
    var urlParams = decodedURL.searchParams;
    var title = urlParams.get('title');
    return title;
};

function getContentFromURLSearchParams() {
    var encodedURL = new URL(window.location.href);
    var decodedURL = decodeURI(encodedURL);
    var urlParams = decodedURL.searchParams;
    var content = urlParams.get('content');
    return content;
};

function decodeURL(url) {
    var decodedURL = decodeURI(url);
    return decodedURL;
};


function makeTitleHTMLWithText(quizTitle) {
    var titleHTML = '<div class="h3 p-3">' + quizTitle + '</div>';
    return titleHTML
};

function titleChanged(event) {
    var titleHTML = makeTitleHTMLWithText($('#quiz-title').val());
    $('#title-box').html(titleHTML);
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

function makeEncodedURL(quizTitle, quizContent) {
    var url = 'https://windowcow.github.io/quiz-template/?title=' + quizTitle + '&content=' + quizContent;
    var encodedURL = encodeURI(url);
    console.log(encodedURL);
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

function exportClicked(event) {
    event.preventDefault();
    console.log('exportClicked');
    var quizTitle = $('#quiz-title').val();
    var quizContent = $('#quiz-content').val();
    var url = makeEncodedURL(quizTitle, quizContent);
    $('#export-button').attr('href', url);
}

function makeQuizChoiceHTMLWithText(quizChoiceText) {
    var rightChoicePattern = /-\[[oO]]\s(.*)\n/g;
    var wrongChoicePattern = /-\[[xX]]\s(.*)\n/g;
    // html fragment
    var preOfCorrect = '<button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="correct" data-toggle="button" aria-pressed="false" autocomplete="off">';
    var postOfCorrect = '</button>';
    var preOfWrong = '<button class="mx-auto my-1 w-75 align-self-center btn btn-outline-dark border-5" type="wrong" data-toggle="button" aria-pressed="false" autocomplete="off">';
    var postOfWrong = '</button>';

    var choicesHTML = quizChoiceText.replace(rightChoicePattern, preOfCorrect + '$1' + postOfCorrect);
    choicesHTML = choicesHTML.replace(wrongChoicePattern, preOfWrong + '$1' + postOfWrong);
    return choicesHTML
}

function updateQuizOutOfHTML(quizTitle, quizChoices) {
    var titleHTML = makeTitleHTMLWithText(quizTitle);
    var choicesHTML = makeQuizChoiceHTMLWithText(quizChoices);
    $('#title-box').html(titleHTML);
    $('#choice-box').html(choicesHTML);
    $('#choice-box button').on('click', function (event) {
        choiceClicked(event);
    });
}


function questionChangedInTextArea(event) {
    var quizContent = $('#quiz-content').val();
    var quizTitle = $('#quiz-title').val();
    updateQuizOutOfHTML(quizTitle, quizContent);
};

