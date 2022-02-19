//#region Responsive Navigation Bar
// document.querySelector('.bar-icon').addEventListener('click', () => {
//     document.querySelector('.navigation').classList.toggle('responsive');
// }, false);

// window.onresize = () => {
//     if (window.innerWidth > 675) document.querySelector('.navigation').classList.remove('responsive')
// };
//#endregion



// let inheritanceType = 'Autosomal Dominant';
// let inheritanceType = 'Autosomal Recessive';
let inheritanceType = 'X-Linked Dominant';
// let inheritanceType = 'X-Linked Recessive';
// let inheritanceType = 'Y-Linked';

let selectGen = document.querySelector('select#gen');

for (let i = 2; i < 5; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', `${i}`);
    option.textContent = i;

    selectGen.appendChild(option);
};

FamilyTree.templates.tommy_female.html =
    '<foreignobject class="node" x="10" y="10" width="200" height="100">{val}</foreignobject>';
FamilyTree.templates.tommy_male.html =
    '<foreignobject class="node" x="10" y="10" width="200" height="100">{val}</foreignobject>';


const family = new FamilyTree(document.getElementById("tree"), {
    mouseScroll: FamilyTree.action.none,
    scaleInitial: FamilyTree.match.boundary,
    enableSearch: false,
    nodeBinding: {
        field_0: "gender",
        field_1: "genotype",
        field_2: "affected",
        filed_3: "generation",
        html: "html"
    },
    nodes: [
        // { id: 0, mid: null, fid: null, pids: [1], genotype: "XaY", gender: "male", affected: "false", html: '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="2" fill="#ffffff" stroke="#000000" rx="7" ry="7"></rect><rect x="20" y="20" height="10" width="10" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>' },
        // { id: 1, mid: null, fid: null, pids: [0], genotype: "XaXa", gender: "female", affected: "false" }
    ]
});

// console.log(family.config.nodes[3].pids);

const getLastId = () => {
    let lastIndex = family.config.nodes.length - 1;
    return family.config.nodes[lastIndex].id;
}

// const setMid = (index) => {
//     // if (getGender() === 'female') {
//     family.config.nodes[index].mid = 1;
//     // }
// }

const getMid = (index) => {
    return family.config.nodes[index].mid
}

// const setFid = (index) => {
//     // if (getGender() === 'female') {
//     family.config.nodes[index].fid = 2;
//     // }
// }

const getFid = (index) => family.config.nodes[index].fid;

const getRandomGenotype = (gender) => {
    let options = [];
    switch (inheritanceType) {
        case 'Autosomal Dominant':
        case 'Autosomal Recessive':
            options = ['AA', 'Aa', 'aa'];
            let num1 = Math.floor(Math.random() * options.length);
            return options[num1];
        case 'X-Linked Dominant':
        case 'X-Linked Recessive':
        case 'Y-Linked':
            if (gender === "male") {
                options = ['XAY', 'XaY'];
            } else if (gender === "female") {
                options = ['XAXA', 'XAXa', 'XaXa'];
            }
            let num2 = Math.floor(Math.random() * options.length);
            return options[num2];
;
    }
}

const setGenotype = (index) => {
    let num1 = Math.floor(Math.random() * 2);
    let num2 = Math.floor(Math.random() * 2);

    let maleGenotype = '';
    let femaleGenotype = '';

    if (getFid(index) === null) {
        maleGenotype = getRandomGenotype('male');
    } else {
        maleGenotype = family.config.nodes[getFid(index)].genotype;
    }

    if (getMid(index) === null) {
        femaleGenotype = getRandomGenotype('female');
    } else {
        femaleGenotype = family.config.nodes[getMid(index)].genotype;
    }

    if (maleGenotype.length >= 2) {
        maleGenotype = [maleGenotype.slice(0, 2), maleGenotype.slice(2)];
        // console.log(maleGenotype);
    }

    if (femaleGenotype.length >= 2) {
        femaleGenotype = [femaleGenotype.slice(0, 2), femaleGenotype.slice(2)];
        // console.log(femaleGenotype);
    }

    let allele1 = maleGenotype[num1];
    let allele2 = femaleGenotype[num2];

    let genotype = '';

    if (allele2 === 'A' || allele2 === 'XA' || allele1 === 'Y') {
        genotype = allele2 + allele1;
    } else {
        genotype = allele1 + allele2;
    }

    family.config.nodes[index].genotype = genotype;
}

const getGenotype = (index) => family.config.nodes[index].genotype;

const setGender = (index) => {
    let num = Math.ceil(Math.random() * 2);
    if (getGenotype(index).includes('Y') || (getGenotype(index).length === 2 && num === 2)) {
        family.config.nodes[index].gender = 'male';
    } else {
        family.config.nodes[index].gender = 'female';
    }
}

const getGender = (index) => family.config.nodes[index].gender;

const setAffected = (index) => {
    switch (inheritanceType) {
        case 'Autosomal Dominant':
        case 'X-Linked Dominant':
            if (getGenotype(index).includes('A') || getGenotype(index).includes('XA')) {
                family.config.nodes[index].affected = true;
            }
            break;
        case 'Autosomal Recessive':
        case 'X-Linked Recessive':
            if (getGenotype(index).includes('aa') || getGenotype(index).includes('XaXa') || getGenotype(index).includes('XaY')) {
                family.config.nodes[index].affected = true;
            }
            break;
        case 'Y-Linked':
            if (getGenotype(index).includes('Y')) {
                family.config.nodes[index].affected = true;
            }
            break;
    }
}

const getAffected = (index) => family.config.nodes[index].affected;

// const setNumberofChildren = () => Math.floor(Math.random() * 5);
const setNumberofChildren = () => Math.ceil(Math.random() * 4);

// const getPids = (index) => family.config.nodes[index].pids[0];

// const checkPids = (index) => {
    // if (family.config.nodes[index].pids.length !== 0) {
    //     family.config.nodes[getPids(index)].pids[0] = index;
    // } else {
    //     let pairId = getLastId() + 1;
    //     family.config.nodes[index].pids[0] = pairId;
    //     family.config.nodes[pairId].pids[0] = index;
    // }
    // if (family.config.nodes[index].pids[0] === undefined) {
    //     family.config.nodes.forEach(person => {
    //         if (person.pids[0] === index) {
    //             family.config.nodes[index].pids[0] = person.id;
    //             return;
    //         }
    //     });

    //     let pairId = getLastId() + 1;
    //     family.config.nodes[index].pids[0] = pairId;
    //     createIndividual(null, null);
    // }

    // let num = Math.floor(Math.random() * 2);

    // if (num === 2) {
    // let numberOfChildren = setNumberofChildren();
    // createIndividual(null, null);
    // if (getGender(index) === "female") {
    //     let mid = index;
    //     let fid = pairIndex;
    // } else {
    //     let mid = pairIndex;
    //     let fid = index;
    // }
    // createChildren(mid, fid);
    // family.config.nodes[index].pids = [pairIndex];
    // family.config.nodes[pairIndex].pids = [index];
    // } else {
    //     family.config.nodes[index].pids = [];
    // }
// }

const getOppositeGender = (index) => {
    if (getGender(index) === 'male') {
        return 'female';
    } else {
        return 'male';
    }
}

const createPair = (index, generation) => {
    let pairId = index + 1;
    let individualPair = { id: pairId, mid: null, fid: null, pids: [], genotype: null, gender: null, affected: null, generation: generation };
    family.config.nodes.push(individualPair);
    while (getGender(pairId) !== getOppositeGender(index)) {
        setGenotype(pairId);
        setGender(pairId);
        setAffected(pairId);
    }

    family.config.nodes[index].pids[0] = pairId;
    family.config.nodes[pairId].pids[0] = index;

    let mid = pairId;
    let fid = index;

    if (getGender(index) === "female") {
        mid = index;
        fid = pairId;
    }

    let numberOfChildren = setNumberofChildren();
    // let num = Math.ceil(Math.random() * 4);

    // if (generation !== maxGenerations -1 && num === 4) {
    //     numberOfChildren = 0;
    // }

    createChildren(mid, fid, numberOfChildren, generation);
}

const createIndividual = (mid, fid, generation) => {
    console.log(family.config.nodes);
    let currentId = getLastId() + 1;
    let individual = { id: currentId, mid: mid, fid: fid, pids: [], genotype: null, gender: null, affected: null, generation: generation };
    family.config.nodes.push(individual);
    setGenotype(currentId);
    setGender(currentId);
    setAffected(currentId);
    // checkPids(currentId);
    // if (family.config.nodes[currentId].pids[0] === undefined) {
    //     family.config.nodes.forEach(person => {
    //         if (person.pids[0] === currentId) {
    //             family.config.nodes[currentId].pids[0] = person.id;
    //             return;
    //         }
    //     });


    let num = Math.ceil(Math.random() * 4);

    if (generation !== maxGenerations && num !== 4) {
        createPair(currentId, generation);
    }
    // createPair(currentId, generation);
    // }
    console.log(family.config.nodes);
}

let maxGenerations = 4;

const getGeneration = (index) => family.config.nodes[index].generation;

const createChildren = (mid, fid, numberOfChildren, currentGeneration) => {
    if (maxGenerations > currentGeneration) {
        let nextGeneration = currentGeneration + 1;
        for (let i=0; i < numberOfChildren; i++) {
            createIndividual(mid, fid, nextGeneration);
        }
    }
}

const createFirstGeneration = () => {
    // let maleGenotype = 'AA';
    // let femaleGenotype = 'AA';
    let maleGenotype = 'XAXA';
    let femaleGenotype = 'XAY';

    let firstMale = { id: 0, mid: null, fid: null, pids: [1], genotype: maleGenotype, gender: "male", affected: null, generation: 1 };
    family.config.nodes.push(firstMale);
    setAffected(0);

    let firstFemale = { id: 1, mid: null, fid: null, pids: [0], genotype: femaleGenotype, gender: "female", affected: null, generation: 1 };
    family.config.nodes.push(firstFemale);
    setAffected(1);

    createChildren(1, 0, 4, getGeneration(0));

}

createFirstGeneration();

// if (FamilyTree.templates.tommy_male.node.affected) {
//     FamilyTree.templates.tommy_male.node =
//     '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="2" fill="#ffffff" stroke="#000000" rx="7" ry="7"></rect><rect x="20" y="20" height="10" width="10" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
// } else {
//     console.log(family);
//     FamilyTree.templates.tommy_male.node =
//     '<rect x="0" y="0" height="{h}" width="{w}" stroke-width="2" fill="#000000" stroke="#000000" rx="7" ry="7"></rect>';
// }





// const generateFirstGen = () => {
// console.log(family);
// family.nodes[0].push( '{ id: 1, pids: [2], genotype: "XaY", gender: "male" }' );
// family.nodes[1] = { id: 2, pids: [1], genotype: "XaXa", gender: "female" };
// }

// generateFirstGen();

// OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
// OrgChart.templates.myTemplate.size = [200, 200];
// OrgChart.templates.myTemplate.node = '<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#aeaeae"></circle>';


// OrgChart.templates.myTemplate.ripple = {
//     radius: 100,
//     color: "#e6e6e6",
//     rect: null
// };

// OrgChart.templates.myTemplate.field_0 = '<text style="font-size: 24px;" fill="#ffffff" x="100" y="90" text-anchor="middle">{val}</text>';
// OrgChart.templates.myTemplate.field_1 = '<text style="font-size: 16px;" fill="#ffffff" x="100" y="60" text-anchor="middle">{val}</text>';

// OrgChart.templates.myTemplate.img_0 = '<clipPath id="ulaImg"><circle cx="100" cy="150" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="60" y="110"  width="80" height="80"></image>';

// OrgChart.templates.myTemplate.edge = '<path  stroke="#686868" stroke-width="1px" fill="none" edge-id="[{id}][{child-id}]" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>';

// OrgChart.templates.myTemplate.plus =
//     '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect>'
//     + '<line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line>'
//     + '<line x1="18" y1="4" x2="18" y2="32" stroke-width="1" stroke="#aeaeae"></line>';

// OrgChart.templates.myTemplate.minus =
//     '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect>'
//     + '<line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line>';

// OrgChart.templates.myTemplate.expandCollapseSize = 36;

// OrgChart.templates.myTemplate.nodeMenuButton =
//     '<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" data-ctrl-n-menu-id="{id}">'
//     + '<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">'
//     + '</rect>'
//     + '<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
//     + '<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
//     + '<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />'
//     + '</g>';

// OrgChart.templates.myTemplate.menuButton =
//     '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" data-ctrl-menu="">'
//     + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
//     + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
//     + '<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">'
//     + '</div>';

// OrgChart.templates.myTemplate.pointer =
//     '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">'
//     + '<polygon fill="rgb(255, 202, 40)" points="53.004,173.004 53.004,66.996 0,120" />'
//     + '<polygon fill="rgb(255, 202, 40)" points="186.996,66.996 186.996,173.004 240,120" />'
//     + '<polygon fill="rgb(255, 202, 40)" points="66.996,53.004 173.004,53.004 120,0" />'
//     + '<polygon fill="rgb(255, 202, 40)" points="120,240 173.004,186.996 66.996,186.996" />'
//     + '<circle fill="rgb(255, 202, 40)" cx="120" cy="120" r="30" />'
//     + '</g></g>';

// var chart = new OrgChart(document.getElementById("tree"), {
//     mouseScrool: OrgChart.action.none,
//     mode: "dark",
//     template: "myTemplate",
//     enableDragDrop: true,
//     enableSearch: false,
//     nodeMenu: {
//         add: { text: "Add" },
//         edit: { text: "Edit" },
//         remove: { text: "Remove" }
//     },
//     nodeMenu: {
//         svg: { text: "Add" },
//         csv: { text: "Edit" },
//         remove: { text: "Remove" }
//     },
//     menu: {
//         pdf: { text: "Export PDF" },
//         png: { text: "Export PNG" },
//         svg: { text: "Export SVG" },
//         csv: { text: "Export CSV" }
//     },
//     nodeBinding: {
//         field_0: "genotype",
//         field_1: "gender"
//     },
//     nodes: [
//         { id: 1, pids: [2], genotype: "Aa", gender: "male" },
//         { id: 2, pids: [1], genotype: "aa", gender: "female" },

//         { id: 3, mid: 1, fid: 2, genotype: "Aa", gender: "male" },
//         { id: 4, mid: 1, fid: 2, pids: [6], genotype: "aa", gender: "female" },
//         { id: 5, mid: 1, fid: 2, genotype: "Aa", gender: "male" },

//         { id: 6, pids: [4], genotype: "AA", gender: "male" }
//     ]
// });


// let selectChildren = document.querySelector('select#children');
// let initalNumberOfChildren = selectChildren.options[selectChildren.selectedIndex].text;
// console.log(initalNumberOfChildren);


// let numberOfGens = selectGen.options[selectGen.selectedIndex].text;
// console.log(numberOfGens);

//#region Responsive Layout Buttons
// document.querySelector('.selection-spouse').addEventListener('click', () => {
//     document.querySelector('.directory-info').classList.add('grid-layout');
//     document.querySelector('.directory-info').classList.remove('list-layout');
// }, false);

// document.querySelector('.selection-spouse').addEventListener('click', () => {
//     document.querySelector('.directory-info').classList.add('list-layout');
//     document.querySelector('.directory-info').classList.remove('grid-layout');
// }, false);
//#endregion




// ;(() => {
//     let canvas, ctx;

//     let createCarrier = (gender) => {
//         if (gender === 'male') {
//             ctx.beginPath();
//             ctx.strokeStyle = 'black';
//             ctx.fillStyle = 'blue';
//             // ctx.strokeRect(50, 35, 50, 50);
//             ctx.fillRect(50, 35, 50, 50);
//         } 

//         if (gender === 'female') {
//             // filled square X: 125, Y: 35, width/height 50
//             // ctx.save();
//             ctx.beginPath();
//             // ctx.strokeStyle = 'black';
//             // ctx.fillStyle = 'red';
//             // ctx.fillRect(125, 35, 50, 50);
//             // ctx.beginPath()
//             ctx.arc((125+25), (35+25), 25, 0, 2 * Math.PI, false); // full circle
//             ctx.strokeStyle = 'black';
//             ctx.fillStyle = 'red';
//             ctx.fill();
//             ctx.stroke();
//             // ctx.restore();
//         }

//         ctx.beginPath();
//         ctx.moveTo(100, 35+25);
//         ctx.lineTo(125, 35+25);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.moveTo(100+25/2, 35+25);
//         ctx.lineTo(100+25/2, 35+100);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.moveTo(50, 35+100);
//         ctx.lineTo(50+50+25+25+25, 35+100);
//         ctx.stroke();
//     }

//     const init = () => {
//         canvas = document.getElementById('pedigree-canvas');
//         ctx = canvas.getContext('2d');

//         createCarrier('male');
//         createCarrier('female');
//     }

//     document.addEventListener('DOMContentLoaded', init);

//     const download = document.getElementById('download-pedigree');

//     download.addEventListener('click', (e) => {
//         const link = document.createElement('a');
//         link.download = `${inheritanceType.toLowerCase().replace(' ', '-')}-pedigree-chart.png`;
//         link.href = canvas.toDataURL();
//         link.click();
//         link.delete;
//     });
// })()

//#region Copyright Year
const date = new Date();

document.querySelector("#copyright-year").textContent = date.getFullYear();
//#endregion