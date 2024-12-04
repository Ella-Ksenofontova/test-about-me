const answers = [];
const questions = ["2. В каком классе я учусь?",
 "3. Какое моё любимое дикое животное?",
 "4. Что из этого - моё хобби?",
 "5. Кем я планирую стать?", 
 "6. Какое из этих блюд я люблю?",
 "7. Какие экзамены на выбор я сдавала в 9 классе?",
 "8. Какая из этих песен мне особенно нравится?", 
 "9. На каких языках я пишу чаще всего?", 
 "10. В какую из этих игр я играла?"
 ];
const variants = [["8", "9", "10", "11"], 
["Тигр", "Волк", "Рысь", "Медведь"], 
["Вязание", "Рисование", "Игра в баскетбол", "Коллекционирование марок"], 
["Художником", "Учителем", "Врачом", "Программистом"],
["Омлет", "Роллы", "Лапшу", "Уху"],
["Физику и информатику", "Химию и биологию", "Историю и литературу", "Биологию и географию"],
["Твои глаза (Лобода)", "Safe and Sound", "Hello (OMFG)", "Coco Jambo"],
["JavaScript и Python", "C# и C++", "Python и C", "Java и Javascript"],
["Mass Effect", "Fallout 3", "Fortnite", "Minecraft"]
];
const rightAnswers = ["2007", 
"11",
"Рысь", 
"Рисование",
"Программистом",
"Роллы", 
"Физику и информатику", 
"Safe and Sound", 
"JavaScript и Python", 
"Minecraft"];

const start_button = document.querySelector(".quiz-start");

start_button.addEventListener("click", OpenInputName);

function OpenInputName() {
	const typeNameTitle = document.createElement("h2");
	typeNameTitle.innerHTML = "Введите ваше имя"
	typeNameTitle.id = "name-input-title"

	const formForInput = document.createElement("form");
	formForInput.classList.add("name-input-form");

	formForInput.onsubmit = function() {
		window.userName = inputName.value;
		typeNameTitle.remove();
		formForInput.remove();
		showFirstQuestion();
		return false;
	};

	const inputName = document.createElement("input");
	inputName.type = "text";
	inputName.id = "inputName";
	inputName.autocomplete = "name";

	const inputButton = document.createElement("input");
	inputButton.type = "submit";
	inputButton.value = "Продолжить";

	document.querySelector(".quiz-wrapper").remove();
	
	document.querySelector("main").append(typeNameTitle);
	document.querySelector("main").append(formForInput);
	formForInput.append(inputName);
	formForInput.append(inputButton);
}

function showFirstQuestion(){
	const question = document.createElement("h2");
	question.id = "question";
	question.innerHTML = "1. В каком году я родилась?";
	document.querySelector("main").append(question);
	const questionForm = document.createElement("form");
	questionForm.id = "question-form";
	questionForm.classList.add("question-form")

	questionForm.onsubmit = function(event) {
		event.preventDefault();
		analizeAnswer();
		showQuestion(2);
	};

	document.querySelector("main").append(questionForm);
	currentVariants = ["2006", "2007", "2008", "2009"];

	appendOptions();

	const submitButton = document.createElement("input");
	submitButton.type = "submit";
	submitButton.id = "submitButton";
	submitButton.value = "Следующий вопрос";
	submitButton.form = questionForm;
	questionForm.append(submitButton);
}

function appendOptions() {
	for (let i = 0; i < 4; i++){
			const variant = document.createElement("input");
			variant.type = "radio";
			variant.value = currentVariants[i];
			variant.form = document.getElementById("question-form");
			variant.id = String(i+1);
			variant.name = "question";

			document.getElementById("question-form").append(variant);
			const textNextToCheckbox = document.createElement("label");
			textNextToCheckbox.htmlFor = variant.id;
			textNextToCheckbox.innerHTML = currentVariants[i];
			textNextToCheckbox.id = "text " + String(i+1)
			document.getElementById("question-form").append(textNextToCheckbox);
			const paragraph = document.createElement("p");
			document.getElementById("question-form").append(paragraph);
	}
}

function analizeAnswer(){
	let answered = false;
	for (let i = 1; i < 5; i++){
		const variant = document.getElementById(String(i));
		if (variant.checked) {
			answers.push(variant.value);
			answered = true;
		}
	}
	if (!answered) answers.push(0);
}	

function showQuestion(questionNumber) {
	const question = document.getElementById("question");
	question.innerHTML = questions[questionNumber - 2];
	const currentVariants = variants[questionNumber - 2];
	for (let i = 1; i < 5; i++){
		const variant = document.getElementById(String(i));
		variant.value = currentVariants[i-1];
		if (variant.checked) variant.checked = 0;
		const textOfVariant = document.getElementById("text " + String(i));
		textOfVariant.innerHTML = currentVariants[i-1];
	}

	const questionForm = document.getElementById("question-form");
	questionForm.onsubmit = function(){
		if (questionNumber < 10){
			if (questionNumber == 9) {
				const submitButton = document.querySelector("input[type='submit']");
				submitButton.value = "К результатам";
			}
			analizeAnswer();
			showQuestion(questionNumber + 1);
		} else {
			analizeAnswer();
			showResults();
		}
		
		return false;
	}
}


function showResults(){
	document.getElementById("question").remove();
	document.getElementById("question-form").remove();

	let correctAnswers = 0;
	const resultsTitle = document.createElement("h1");
	resultsTitle.id = "results";
	resultsTitle.innerHTML = "Итоги";
	document.querySelector("main").append(resultsTitle);

	for (let i = 0; i < 10; i++){
		if(answers[i] == rightAnswers[i]) correctAnswers += 1;
	}

	result = (correctAnswers / 10) * 100
	const resultsMessage = document.createTextNode(`${userName} знает Эллу на ${result} %`);
	document.querySelector("main").append(resultsMessage);

	const rightAnswersTitle = document.createElement("h1");
	rightAnswersTitle.innerHTML = "Правильные ответы";
	
	document.querySelector("main").append(rightAnswersTitle);
	const listOfRightAnswers = document.createElement("ol");
	document.querySelector("main").append(listOfRightAnswers);
	for (let i = 0; i < 10; i++){
		const answer = document.createElement("li");
		answer.innerHTML = rightAnswers[i];
		listOfRightAnswers.append(answer);
	}
}
