const $wheel = $(".wheel");
const $spinButton = $(".spin-btn");
const $picker = $(".picker");

randomNum = 0;

function spinWheel() {
  //spins wheel randomly
  randomNum += Math.random() * 360 + 2880;
  $wheel.css({ transform: "rotate(" + randomNum + "deg)" });
  TweenMax.fromTo(
    $picker,
    0.1,
    { rotation: 0 },
    { yoyo: true, rotation: -20, repeat: 90 }
  );
}

function randomAnswer() {
  //Selects a random answer from answers array
  const randomSelection = answers[Math.floor(Math.random() * answers.length)];
  let selectedAnswer = storeAnswer.push(randomSelection);
}

// Removes answer from arrays
function removeAnswer() {
  storeAnswer = [];
  newAnswer = [];
}

// Spins wheel on spin wheel button click
$spinButton.on("click", function () {
  spinWheel();
  console.log(randomNum);
  // alert when wheel stops spinning
  if ($(".wheel").css("transform")) {
    console.log("spinning");
  }
  // $wheel.removeAttr('style');
});

//click new puzzle to show a new puzzle
$(".new-btn").on("click", function () {
  $(".guess-tiles-container").empty();
  randomAnswer();
  showAnswer();
});

// Shows the correct amount of tiles for the current puzzle
function showAnswer() {
  //Converts text to a string
  makeString = storeAnswer.toString();
  for (let i = 0; i < makeString.length; i++) {
    //Appends the newly converted string to the board display
    console.log(makeString[i]);
    let answer = makeString[i];
    // newAnswer.push(answer);
    // $('.guess-tiles-container').append('<p class="guess-tiles"> ' + answer + ' </p>');
    $(".guess-tiles-container").append(
      '<p class="guess-tiles"> ' + answer + " </p>"
    );
    removeAnswer();
  }
}

//Solve puzzle on solve button click. Compares prompted answer to string alerts wrong or right.
$(".solve-btn").on("click", function () {
  let guess = prompt("Enter your answer");
  if (guess === makeString) {
    alert("You Win!");
  } else {
    alert("You Lose!");
  }
});

// Guess a letter - temporarily on vowel button, needs to be at end of wheel spin
$(".vowel-btn").on("click", function () {
  let guessLetter = prompt("Guess a consonant");
  let str = makeString;
  let indices = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === guessLetter) {
      indices.push(i + 1);
    }
  }

  console.log("letters appear at " + indices);
  // $('.guess-tiles').html(str.charAt(indices));
  indices.forEach(function (e) {
    setTimeout(() => {
      $(".guess-tiles-container .guess-tiles:nth-child(" + e + ")").addClass(
        "reveal"
      );
    }, e * 200);
  });
});

// var newAnswer = [];
let storeAnswer = [];
let answers = [
  "twentysix",
  "nandos",
  "friday sweets",
  "atlassian",
  "umbraco",
  "java script",
];
