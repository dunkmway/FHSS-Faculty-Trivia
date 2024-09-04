const fs = require('node:fs/promises');

async function writeFile(path, content) {
  try {
    await fs.writeFile(path, content);
  } catch (err) {
    console.log(err);
  }
}

const DepartmentDirectories = {
    Anthropology: 'https://anthropology.byu.edu/faculty',
    Economics: 'https://economics.byu.edu/faculty',
    Geography: 'https://geography.byu.edu/directory',
    History: 'https://history.byu.edu/directories',
    "Political Science": 'https://politicalscience.byu.edu/directory',
    Psychology: 'https://psychology.byu.edu/department',
    "School of Family Life": 'https://familylife.byu.edu/school-of-family-life-directory',
    "School of Social Work": 'https://socialwork.byu.edu/faculty',
    Sociology: 'https://sociology.byu.edu/current-faculty'
}

function main() {
    for (const department in DepartmentDirectories) {
        fetchImages(DepartmentDirectories[department], department);
    }
}

async function fetchImages(departmentURL, departmentName) {
    const response = await fetch(departmentURL);
    const text = await response.text();
    const imageURL = /<img\s+[^>]*src.*?url=["']?([^"'\s>]+)["']?[^>]*>[\s\S]*?<a\s+[^>]*>(.*?)<\/a>/gm;
    const allMatches = [...text.matchAll(imageURL)];
    const allGroups = allMatches.map(match => `"${match[2]}": "${decodeURIComponent(match[1])}"`);
    const result = '{\n\t' + allGroups.join(',\n\t') + '\n}';
    // console.log(result);
    await writeFile(`./Department_Images/${departmentName}.json`, result)
}

main();
