'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * delete all children of element
 * @param {HTMLElement} element 
 */
function  removeAllChildren(element) {
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    }

    //make area for result
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = 'result:';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //make area for tweet
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('YourStrongPoint')
        + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #YourStrongPoint';
    tweetDivided.appendChild(anchor);

    //setup widgets.js
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

const answers = [
    '{userName}\'s strong point is voice.',
    '{userName}\'s strong point is enthusiasm.',
    '{userName}\'s strong point is passion.',
    '{userName}\'s strong point is knowledge.',
    '{userName}\'s strong point is ALL OF YOU.'
    '{userName}\'s strong point is kindness.'
];

/**
 * get userName then return result
 * @param {string} userName
 * @return {string} result 
 */
function assessment(userName){
    let sumOfCharCode = 0;
    for (let i=0; i<userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.assert(
    assessment('assso') === 'assso\'s strong point is knowledge.',
    'out'
);

console.assert(
    assessment('assso') === assessment('assso'),
    'out'
);
