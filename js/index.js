// When DOM content loaded, add event listener for start button
window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    // show quizBlock element, hide the start message, start the timer
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    startTimer();
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1,
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the only flag that does not feature either red, white, or blue?',
      o: ['Paraguay', 'Scotland', 'Peru', 'Jamaica'],
      a: 3,
    },
    {
      q: 'Lemurs are only native to one country, which one is it?',
      o: ['Morocco', 'Costa Rica', 'Madagascar', 'Galapagos Islands'],
      a: 2,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  let score = 0;
  const calculateScore = () => {
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        // If correct answer, add green border to li Element
        if (quizItem.a == i) {
          liElement.style.border = '3px solid green';
        }

        // if correct answer selected, add one to the score variable
        if (radioElement.checked && quizItem.a === i) {
          score++;
        }
      }
    });
  };

  // Display score
  function displayScore() {
    const scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = `Score: ${score}`;
  }

  // call the displayQuiz function
  displayQuiz();

  // Submit button event listener
  let quizOver = 0;
  const submitButton = document.getElementById('btnSubmit');
  submitButton.addEventListener('click', () => {
    submitButton.style.display = 'none';
    calculateScore();
    displayScore();
    quizOver = 1;
  });

  // Reset button event listener
  const resetButton = document.getElementById('btnReset');
  resetButton.addEventListener('click', () => {
    location.reload()
  });

  // Timer
  function startTimer() {
    var timeleft = 59;
    var downloadTimer = setInterval(function(){
      if(timeleft < 0){
        clearInterval(downloadTimer);
        submitButton.click();
      } else if (quizOver === 1) {
        clearInterval(downloadTimer);
      } else {
        document.getElementById("time").innerHTML = timeleft + " seconds";
      }
      timeleft -= 1;
    }, 1000)
  };
});