const start_button = document.querySelector(".quiz-start");
let currentOptions = options[0];

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
	question.innerHTML = questions[0];
	document.querySelector("main").append(question);
	const questionForm = document.createElement("form");
	questionForm.id = "question-form";
	questionForm.classList.add("question-form");
	document.querySelector("main").append(questionForm);

	questionForm.onsubmit = function(event) {
		event.preventDefault();
		analizeAnswer();
		showQuestion(2);
	};
	appendOptions();

	const submitButton = document.createElement("input");
	submitButton.type = "submit";
	submitButton.id = "submit-button";
	submitButton.value = "Следующий вопрос";
	submitButton.form = questionForm;
	questionForm.append(submitButton);
}

function appendOptions() {
	const submitButton = document.getElementById("submit-button");

	for (let i = 0; i < currentOptions.length; i++){
			const option = document.createElement("input");
			option.type = "radio";
			option.value = currentOptions[i];
			option.form = document.getElementById("question-form");
			option.id = String(i+1);
			option.name = "question";

			
			const textNextToCheckbox = document.createElement("label");
			textNextToCheckbox.htmlFor = option.id;
			textNextToCheckbox.innerHTML = currentOptions[i];
			textNextToCheckbox.id = "text " + String(i+1);
			if (submitButton) {
				submitButton.before(option);
				submitButton.before(textNextToCheckbox);
			} else {
				document.getElementById("question-form").append(option);
				document.getElementById("question-form").append(textNextToCheckbox);
			}
	}
}

function analizeAnswer(){
	let answered = false;
	for (let i = 1; i <= currentOptions.length; i++){
		const option = document.getElementById(String(i));
		if (option.checked) {
			answers.push(option.value);
			answered = true;
		}
	}
	if (!answered) answers.push(0);
}	

function showQuestion(questionNumber) {
	const question = document.getElementById("question");
	question.innerHTML = questions[questionNumber - 1];
	currentOptions = options[questionNumber - 1];

	const toRemove = document.getElementById("question-form").querySelectorAll("input[type='radio'], label")
	for (let item of toRemove) {
		item.remove();
	}

	appendOptions();

	const questionForm = document.getElementById("question-form");
	questionForm.onsubmit = function(){
		if (questionNumber < questions.length){
			if (questionNumber == questions.length - 1) {
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

	for (let i = 0; i < questions.length; i++){
		if(answers[i] == rightAnswers[i]) correctAnswers += 1;
	}

	result = ((correctAnswers / questions.length) * 100).toFixed(0)
	const resultsMessage = document.createTextNode(`${userName} ${resultMessage} на ${result} %`);
	document.querySelector("main").append(resultsMessage);

	const rightAnswersTitle = document.createElement("h1");
	rightAnswersTitle.innerHTML = "Правильные ответы";
	
	document.querySelector("main").append(rightAnswersTitle);
	const listOfRightAnswers = document.createElement("ol");
	listOfRightAnswers.className = "right-answers";
	document.querySelector("main").append(listOfRightAnswers);
	for (let i = 0; i < 10; i++){
		const answer = document.createElement("li");
		answer.innerHTML = rightAnswers[i];
		listOfRightAnswers.append(answer);
	}

	addLinkToHomePage();
}

function addLinkToHomePage() {
	const linktoHomePage = document.createElement("a");
	linktoHomePage.href = "./index.html"
	linktoHomePage.className = "link-to-home-page";
	linktoHomePage.textContent = "На главную";
	document.querySelector("main").append(linktoHomePage);
}
