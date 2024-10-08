let answer_key = {};


function generate_quiz(data) {
    let question_div, temp_element;
    let questions_container = document.getElementById("questions_container");

    for (let i = 0; i < data.length; i++) {
 
        question_div = document.createElement("div");
        question_div.id = "q_" + i;
        question_div.classList.add("row", "question_box");

 
        temp_element = document.createElement("p");
        temp_element.classList.add("question");
        temp_element.appendChild(document.createTextNode("Q" + (i + 1) + ". " + data[i]["question"]));
        question_div.appendChild(temp_element);

        let temp_option_element;
        for (let j = 0; j < data[i]["options"].length; j++) {
            temp_option_element = document.createElement("div");
            temp_option_element.classList.add("option");

    
            temp_element = document.createElement("input");
            temp_element.id = "option_" + i + "_" + j;
            temp_element.name = question_div.id;
            temp_element.classList.add("form-check-input");
            temp_element.setAttribute("type", "radio");
            temp_element.setAttribute("value", j);
            temp_option_element.appendChild(temp_element);

    
            temp_element = document.createElement("label");
            temp_element.classList.add("form-check-label");
            temp_element.setAttribute("for", "option_" + i + "_" + j);
            temp_element.appendChild(document.createTextNode(data[i]["options"][j]));
            temp_option_element.appendChild(temp_element);

            question_div.appendChild(temp_option_element);
        }

        // Record answer to answer key
        answer_key[question_div.id] = data[i]["answer"];

        questions_container.appendChild(question_div);
    }
}

// Function to fetch quiz questions using async/await
async function fetchQuizData() {
    try {
        const response = await fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const quiz_data = await response.json();
        generate_quiz(quiz_data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


fetchQuizData();

// Function to calculate score
function calculate_score(event) {
    event.preventDefault();

    let score = 0;
    let quiz_form = document.getElementById("quiz");

    // Loop through each question in the answer key
    for (let questionId in answer_key) {
        if (answer_key.hasOwnProperty(questionId)) {
            let selectedOption = quiz_form.querySelector('input[name="' + questionId + '"]:checked');
            
            // Check if an option is selected
            if (selectedOption) {
                if (parseInt(selectedOption.value) === answer_key[questionId]) {
                    score++;
                }
            }
        }
    }

    // Update the score on the page
    document.getElementById("score").textContent = score;
}


function reset_quiz() {
    // Reset all radio buttons
    let quiz_form = document.getElementById("quiz");
    let radio_buttons = quiz_form.querySelectorAll('input[type="radio"]');
    radio_buttons.forEach(button => {
        button.checked = false;
    });

    // Reset the score
    document.getElementById("score").textContent = '0';
}