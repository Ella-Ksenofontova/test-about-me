let answers = [];
let questions = ["2. В каком классе я учусь?",
 "3. Какое моё любимое дикое животное?",
 "4. Что из этого - моё хобби?",
 "5. Кем я планирую стать?", 
 "6. Какое из этих блюд я люблю?",
 "7. Какие экзамены на выбор я сдавала в 9 классе?",
 "8. Какая из этих песен мне особенно нравится?", 
 "9. На каких языках я пишу чаще всего?", 
 "10. В какую из этих игр я играла?"
 ];
let variants = [["8", "9", "10", "11"], 
["Тигр", "Волк", "Рысь", "Медведь"], 
["Вязание", "Рисование", "Игра в баскетбол", "Коллекционирование марок"], 
["Художником", "Учителем", "Врачом", "Программистом"],
["Омлет", "Роллы", "Лапшу", "Уху"],
["Физику и информатику", "Химию и биологию", "Историю и литературу", "Биологию и географию"],
["Твои глаза (Лобода)", "Safe and Sound", "Hello (OMFG)", "Coco Jambo"],
["JavaScript и Python", "C# и C++", "Python и C", "Java и Javascript"],
["Mass Effect", "Fallout 3", "Fortnite", "Minecraft"]
];
let rightAnswers = ["2007", 
"10",
"Рысь", 
"Рисование",
"Программистом",
"Роллы", 
"Физику и информатику", 
"Safe and Sound", 
"JavaScript и Python", 
"Minecraft"];

function OpenInputName() {
	let start_button = document.getElementById("start");
	let title = document.getElementById("firstTitle");
	
	start_button.onclick = function(){
			let typeNameTitle = document.createElement("h1");
			typeNameTitle.innerHTML = "Введите ваше имя"
			typeNameTitle.id = "secondTitle"

			let formForInput = document.createElement("form");
			formForInput.onsubmit = function(){
				window.userName = inputName.value;
				typeNameTitle.remove();
				formForInput.remove();
				showFirstQuestion();
				return false;
			};
			formForInput.autocomplete = "off";

			let inputName = document.createElement("input");
			inputName.type = "text";
			inputName.id = "inputName";

			let inputButton = document.createElement("input");
			inputButton.type = "submit";
			inputButton.value = "Продолжить";

			let paragraph = document.createElement("p");
			paragraph.id = "p";

			let center = document.getElementById("center");
			
			title.remove();
			start_button.remove();
			
			center.append(typeNameTitle);
			center.append(paragraph);
			center.append(formForInput);
			formForInput.append(inputName);
			formForInput.append(paragraph);
			formForInput.append(inputButton);
		}
}

document.addEventListener("DOMContentLoaded", OpenInputName);

function showFirstQuestion(){
	let question = document.createElement("h1");
	question.id = "question";
	question.innerHTML = "1. В каком году я родилась?";
	center.append(question);
	let questionForm = document.createElement("form");
	questionForm.id = "questionForm";

	questionForm.onsubmit = function(){
		analizeAnswer();
		showQuestion(2);
		return false;
		
	};

	center.append(questionForm);
	currentVariants = ["2006", "2007", "2008", "2009"];

	for (let i = 0; i < 4; i++){
			let variant = document.createElement("input");
			variant.type = "radio";
			variant.value = currentVariants[i];
			variant.form = questionForm;
			variant.id = String(i+1);

			questionForm.append(variant);
			let textNextToCheckbox = document.createElement("span");
			textNextToCheckbox.innerHTML = `<label for=${variant.id}>${currentVariants[i]}</label>`;
			textNextToCheckbox.id = "text " + String(i+1)
			questionForm.append(textNextToCheckbox);
			let paragraph = document.createElement("p");
			questionForm.append(paragraph);
	}
	let submitButton = document.createElement("input");
	submitButton.type = "submit";
	submitButton.id = "submitButton";
	submitButton.value = "Следующий вопрос";
	submitButton.form = questionForm;
	questionForm.append(submitButton);
}

function analizeAnswer(){
	let answered = false;
	for (let i = 1; i < 5; i++){
		let variant = document.getElementById(String(i));
		if (variant.checked) {
			answers.push(variant.value);
			answered = true;
		}
	}
	if (!answered) answers.push(0);
}	

function showQuestion(questionNumber){
	let question = document.getElementById("question");
	question.innerHTML = questions[questionNumber - 2];
	let currentVariants = variants[questionNumber - 2];
	for (let i = 1; i < 5; i++){
		let variant = document.getElementById(String(i));
		variant.value = currentVariants[i-1];
		if (variant.checked) variant.checked = 0;
		let textOfVariant = document.getElementById("text " + String(i));
		textOfVariant.innerHTML = `<label for=${variant.id}>${currentVariants[i]}</label>`;
	}

	let questionForm = document.getElementById("questionForm");
	questionForm.onsubmit = function(){
		if (questionNumber < 10){
			if (questionNumber == 9) {
				let submitButton = document.querySelector("input[type='submit']");
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
	let center = document.getElementById("center");
	center.remove();
	let correctAnswers = 0
	let resultsTitle = document.createElement("h1");
	resultsTitle.id = "results";
	resultsTitle.innerHTML = "Итоги";
	document.body.append(resultsTitle);

	for (let i = 0; i < 10; i++){
		if(answers[i] == rightAnswers[i]) correctAnswers += 1;
	}

	result = (correctAnswers/10) * 100
	let resultsMessage = document.createTextNode(`${userName} знает Эллу на ${result} %`);
	document.body.append(resultsMessage);

	let rightAnswersTitle = document.createElement("h1");
	rightAnswersTitle.innerHTML = "Правильные ответы";
	
	document.body.append(rightAnswersTitle);
	let listOfRightAnswers = document.createElement("ol");
	document.body.append(listOfRightAnswers);
	for (let i = 0; i < 10; i++){
		let answer = document.createElement("li");
		answer.innerHTML = rightAnswers[i];
		listOfRightAnswers.append(answer);
	}
}
