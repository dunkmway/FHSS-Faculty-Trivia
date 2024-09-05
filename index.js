const colors = [
    'o',
    'p',
    'b',
    'm',
    'lo',
    'lp',
    'lb',
    'lm'
];

const parentTypes = [
    'semi',
    'semi',
    'semi',
    'semi',
    'semi',
    'semi',
    'semi',
    'semi',
    'semi',
    'semi',
    'petal',
    'petal',
    'petal',
    'petal',
    'circle',
    'circle',
];

const childTypes = {
    semi: [
        'NW',
        'NE',
        'SE',
        'SW'
    ],
    petal: [
        'neg',
        'pos'
    ],
    circle: [
        'sm'
    ]
}

const totalCells = 200;

const Departments = {
    'Anthropology': fetchJSON('./Department_Images(Complete)/Anthropology.json'),
    'Economics': fetchJSON('./Department_Images(Complete)/Economics.json'),
    'Geography': fetchJSON('./Department_Images(Complete)/Geography.json'),
    'History': fetchJSON('./Department_Images(Complete)/History.json'),
    'Political Science': fetchJSON('./Department_Images(Complete)/Political Science.json'),
    'Psychology': fetchJSON('./Department_Images(Complete)/Psychology.json'),
    'School of Family Life': fetchJSON('./Department_Images(Complete)/School of Family Life.json'),
    'School of Social Work': fetchJSON('./Department_Images(Complete)/School of Social Work.json'),
    'Sociology': fetchJSON('./Department_Images(Complete)/Sociology.json'),
}

async function fetchJSON(path) {
    const result = await fetch(path);
    return await result.json();
}

function renderGrid() {
    // initialize the grid
    const mainGrid = document.querySelector('.main-grid');
    mainGrid.innerHTML = null;

    for (let i = 0; i < totalCells; i++) {
        // create a new sub grid
        const subGrid = document.createElement('div');
        subGrid.classList.add('sub-grid');
        mainGrid.appendChild(subGrid);

        // add in the quadrants
        for (let j = 0; j < 4; j++) {
            const quadrant = createNewQuadrant();
            subGrid.appendChild(quadrant);
        }
    }
}


function createNewQuadrant() {
    const quad = document.createElement('div');
    quad.classList.add('quadrant');

    const randomParent = getRandomArrayValue(parentTypes);
    const randomChild = getRandomArrayValue(childTypes[randomParent]);
    quad.classList.add(`${randomChild}-${randomParent}`);

    const isInverse = Math.random() < 0.5;
    if (isInverse) {
        quad.classList.add('inverse');
    }

    const randomColor = getRandomArrayValue(colors);
    quad.classList.add(randomColor);

    return quad;
}

function getRandomArrayValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function getRandomFaculty() {
    const department = getRandomArrayValue(Object.keys(Departments));
    const name = getRandomArrayValue(Object.keys(await Departments[department]));
    const imageURL = (await Departments[department])[name];

    return [
        name,
        department,
        imageURL
    ]
}

async function renderQuestion() {
    // hide the correct answer
    const answerElement = document.querySelector('h1');
    answerElement.classList.add('hidden');

    // get the choices
    const choices = [
        await getRandomFaculty(),
        await getRandomFaculty(),
        await getRandomFaculty(),
        await getRandomFaculty()
    ]

    // render the choices
    Array.from(document.querySelectorAll('button')).forEach((button, index) => {
        button.textContent = choices[index][0];
    })
    
    // select the correct choice
    const correctChoice = getRandomArrayValue(choices);
    document.querySelector('img').src = correctChoice[2];
    answerElement.textContent = correctChoice[0] + ' - ' + correctChoice[1];
}

function handleClick() {
    const answerElement = document.querySelector('h1');
    if (answerElement.classList.contains('hidden')) {
        answerElement.classList.remove('hidden');
    } else {
        renderGrid();
        renderQuestion();
    }
}




renderGrid();
renderQuestion();

// document.addEventListener('keydown', async (ev) => {
//     if (ev.key == 'Enter') {
//         renderGrid();
//         renderQuestion();
//     }
// });

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleClick)
})