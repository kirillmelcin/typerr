const textField = document.getElementById("text-field");

let index = 0;
let completedText = "";
let unCompletedText = "";
let sentence;
let history = [];

const sentences = [
  "Я находился в том состоянии чувств и души, когда существенность, уступая мечтаниям, сливается с ними в неясных видениях первосония.",
  "По железной дороге ехали из экономии в третьем классе, в вагоне для некурящих.",
  "Несмотря на предсказания, башкирцы не возмущались. Спокойствие царствовало вокруг нашей крепости.",
  "Я слишком был счастлив, чтоб хранить в сердце чувство неприязненное.",
  "Железо можно превратить в газ при температуре 1539 градусов по цельсию.",
  "Переход вещества из твердого в газообразное состояние в химии называется сублимацией.",
  "В квартире директора фабрики все уже было готово к торжеству.",
  "Самыми безопасными странами в мире являются Монако и Сингапур.",
  "Калмыкия, входящая в состав России, является единственной в Европе республикой, где основной религией является буддизм.",
  "Самая старая страна в Европе, а также одна из старейших в мире - Республика Сан-Марино, существующая с начала четвертого века.",
  "Правящий английский монарх является номинальным главой 16 стран, включая саму Великобританию.",
  "В Москве у них дела обернулись с быстротою молнии и с неожиданностью арабских сказок.",
  "Мебель была древнейшая, белая, с красною ветхою полушелковою обивкой.",
  "В составе флоры России насчитывается около 24 тысяч видов растений.",
];

// stat
let isStartedTyping = false;
let countLetters = 0;
let seconds = 0;
let accuracy = 0;
let mistakes = 0;
let speed = 0;

function checkInput(e) {
  if (e.key === sentence[index]) {
    index++;
    countLetters++;
    completedText += e.key;
    unCompletedText = unCompletedText.slice(1);
    isStartedTyping = true;
    textField.innerHTML = `<span class="text-completed">${completedText}</span>${unCompletedText}`;
  } else if (
    e.key !== sentence[index] &&
    e.key !== "Shift" &&
    e.key !== "Control" &&
    e.key !== "Alt"
  ) {

    textField.style.color = "#cb4444";
    setTimeout(() => (textField.style.color = "#6a6a75"), 100);
    if (isStartedTyping === true) {
      mistakes++;
    }
  }

  if (index >= sentence.length) {
    setTimeout(() => generateSentence(), 150);
  }
}

function generateSentence() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  history.forEach((e) => {
    if (e === randomIndex) return generateSentence();
  });
  history.push(randomIndex);
  sentence = sentences[randomIndex];
  textField.innerHTML = sentence;
  unCompletedText = sentence;
  completedText = "";
  index = 0;
}

function statistics() {
  if (isStartedTyping === true) {
    seconds++;
    accuracy = Math.round(((countLetters - mistakes) / countLetters) * 100);
    if (accuracy <= 0) {
      accuracy = "--";
    }
    document.getElementById("accuracy").innerHTML = accuracy;
    speed = Math.round((countLetters / seconds) * 60);
    document.getElementById("speed").innerHTML = speed;
    document.getElementById("time").innerHTML = 60 - seconds;
    if (seconds > 60) endgame();
  } else {
    document.getElementById("accuracy").innerHTML = "--";
    document.getElementById("speed").innerHTML = "--";
    document.getElementById("time").innerHTML = 60;
  }
}

function endgame() {
  const message = `Скорость печати: ${speed} знаков в минуту. \nТочность: ${accuracy}%`;
  alert(message);
  isStartedTyping = false;
  countLetters = 0;
  seconds = 0;
  accuracy = 0;
  mistakes = 0;
  speed = 0;
  statistics();
  generateSentence();
}

setInterval(statistics, 1000);

generateSentence();

addEventListener("keydown", checkInput);
