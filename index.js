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

const columns = 10;
const rows = 8;

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


function main() {
    // initialize the grid
    const mainGrid = document.querySelector('.main-grid');
    mainGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    mainGrid.innerHTML = null;

    const totalCells = columns * rows;
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

async function fetchJSON(path) {
    const result = await fetch(path);
    return await result.json();
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
    const randomDepartment = getRandomArrayValue(Object.keys(Departments));
    const randomFaculty = getRandomArrayValue(Object.keys(await Departments[randomDepartment]));
    const facultyImageURL = (await Departments[randomDepartment])[randomFaculty];

    document.querySelector('img').src = facultyImageURL;
    document.querySelector('h1').textContent = `${randomFaculty} - ${randomDepartment}`;
}

main();
getRandomFaculty();

document.addEventListener('keydown', async (ev) => {
    if (ev.key == 'Enter') {
        main();
        getRandomFaculty();
    }
});