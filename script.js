const words = [
    "Algorithm", "Artificial Intelligence (AI)", "Bias (Algorithmic Bias)", "Black Box",
    "Data Ethics", "Data Set", "Discrimination", "Ethical AI", "Equity", "Fairness",
    "Inclusive Design", "Intersectionality", "Machine Learning (ML)", "Model Auditing",
    "Representation Bias", "Transparency", "Unintended Consequences", "White Box"
];

const definitions = [
    "A set of rules or instructions given to an AI system to help it learn or solve problems. In the context of bias and equity, how these rules are defined and applied can lead to biased outcomes if not properly managed.",
    "The simulation of human intelligence in machines that are programmed to think and learn. AI can inadvertently perpetuate biases present in the data used to train it.",
    "Systematic and repeatable errors in a computer system that create unfair outcomes, such as privileging one arbitrary group over another. This can be due to biased data, flawed model design, or other factors.",
    "A term used to describe complex AI systems where the decision-making process is not transparent or understandable to humans. This opacity can hide biased outcomes and make it difficult to correct them.",
    "A field of study that focuses on the ethical implications of data collection, usage, and analysis, ensuring that practices are fair and respect individuals' rights and privacy.",
    "A collection of data used to train or test an AI model. If a data set is not representative of the population, it can introduce bias into the AI system.",
    "Unfair or prejudicial treatment of different categories of people, often exacerbated by biased AI systems that reinforce existing societal inequalities.",
    "AI development and deployment practices that prioritize fairness, accountability, and transparency to ensure that AI benefits all users equally and does not perpetuate bias or inequality.",
    "Ensuring fair treatment, opportunities, and outcomes for all individuals. In AI, this means developing systems that do not favor any group over another and actively work to counteract existing biases.",
    "The principle that AI systems should treat all individuals and groups equally, without bias or favoritism. This often involves ensuring diverse and representative data sets and applying rigorous testing for bias.",
    "An approach to designing AI systems that actively considers and addresses the needs of diverse users, aiming to minimize bias and ensure equitable outcomes.",
    "A framework for understanding how various forms of social stratification, such as race, gender, and class, intersect to create unique dynamics of privilege and disadvantage that AI systems must account for to be truly equitable.",
    "A subset of AI where machines learn from data to improve their performance on a task. The quality and representativeness of the data are crucial to preventing biased outcomes.",
    "The process of examining and testing AI models to identify and address biases. This involves looking at the data, the algorithm, and the outcomes to ensure fairness and equity.",
    "Occurs when certain groups are underrepresented or misrepresented in the data used to train AI models, leading to biased predictions and decisions.",
    "The practice of making the workings of AI systems clear and understandable to users. This is essential for identifying and correcting biases.",
    "Outcomes of AI systems that were not anticipated by the designers, often negative and affecting certain groups disproportionately due to inherent biases in the system.",
    "An AI system whose internal workings are visible and understandable to humans, making it easier to detect and correct biases."
];

let score = 0;
let attempts = {};
words.forEach(word => attempts[word] = 0);

const wordsContainer = document.querySelector('.words');
const definitionsContainer = document.querySelector('.definitions');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

// Initialize the game board
function initGame() {
    words.forEach((word, index) => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.textContent = word;
        wordDiv.draggable = true;
        wordDiv.addEventListener('dragstart', handleDragStart);
        wordsContainer.appendChild(wordDiv);

        const defDiv = document.createElement('div');
        defDiv.classList.add('definition');
        defDiv.textContent = definitions[index];
        defDiv.addEventListener('dragover', handleDragOver);
        defDiv.addEventListener('drop', handleDrop);
        definitionsContainer.appendChild(defDiv);
    });
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const word = event.dataTransfer.getData('text/plain');
    const definition = event.target.textContent;
    const wordIndex = words.indexOf(word);
    const defIndex = definitions.indexOf(definition);

    if (wordIndex === defIndex) {
        event.target.remove();
        document.querySelector(`.word:contains("${word}")`).remove();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        messageDisplay.textContent = '';
    } else {
        attempts[word]++;
        if (attempts[word] < 3) {
            messageDisplay.textContent = `Try again! Attempts left for "${word}": ${3 - attempts[word]}`;
        } else {
            messageDisplay.textContent = `No more attempts left for "${word}".`;
        }
    }

    if (score === words.length) {
        messageDisplay.textContent = `Game Over! Your final score is ${score}.`;
    }
}

initGame();
