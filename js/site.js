//#region Responsive Navigation Bar
// document.querySelector('.bar-icon').addEventListener('click', () => {
//     document.querySelector('.navigation').classList.toggle('responsive');
// }, false);

// window.onresize = () => {
//     if (window.innerWidth > 675) document.querySelector('.navigation').classList.remove('responsive')
// };
//#endregion



// let inheritanceType = 'Autosomal Dominant';
let inheritanceType = 'Autosomal Recessive';
// let inheritanceType = 'X-Linked Dominant';
// let inheritanceType = 'X-Linked Recessive';
// let inheritanceType = 'Y-Linked';

let selectGen = document.querySelector('select#gen');

for (let i = 2; i < 5; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', `${i}`);
    option.textContent = i;

    selectGen.appendChild(option);
};

// FamilyTree.templates.tommy_female.field_5 =
//     '<foreignobject class="node" x="10" y="10" width="200" height="100">{val}</foreignobject>';
// FamilyTree.templates.tommy_male.field_5 =
//     '<foreignobject class="node" x="10" y="10" width="200" height="100">{val}</foreignobject>';


const family = new FamilyTree(document.getElementById("tree"), {
    mouseScroll: FamilyTree.action.none,
    scaleInitial: FamilyTree.match.boundary,
    enableSearch: false,
    nodeBinding: {
        field_0: "gender",
        field_1: "genotype",
        field_2: "affected",
        field_3: "carrier",
        field_4: "generation",
        field_5: "html"
    },
    nodes: []
});

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

    if (maleGenotype.length > 2) {
        maleGenotype = [maleGenotype.slice(0, 2), maleGenotype.slice(2)];
    } else {
        maleGenotype = [maleGenotype.slice(0, 1), maleGenotype.slice(1)];
    }

    if (femaleGenotype.length > 2) {
        femaleGenotype = [femaleGenotype.slice(0, 2), femaleGenotype.slice(2)];
    } else {
        femaleGenotype = [femaleGenotype.slice(0, 1), femaleGenotype.slice(1)];
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
            } else {
                family.config.nodes[index].affected = false;
            }
            break;
        case 'Autosomal Recessive':
        case 'X-Linked Recessive':
            if (getGenotype(index).includes('aa') || getGenotype(index).includes('XaXa') || getGenotype(index).includes('XaY')) {
                family.config.nodes[index].affected = true;
            } else {
                family.config.nodes[index].affected = false;
            }
            break;
        case 'Y-Linked':
            if (getGenotype(index).includes('Y')) {
                family.config.nodes[index].affected = true;
            } else {
                family.config.nodes[index].affected = false;
            }
            break;
        default:
            family.config.nodes[index].affected = false;
            break;
    }
}

const getAffected = (index) => family.config.nodes[index].affected;

const setCarrier = (index) => {
    switch (inheritanceType) {
        case 'Autosomal Recessive':
            if (getGenotype(index).includes('Aa')) {
                family.config.nodes[index].carrier = true;
            } else {
                family.config.nodes[index].carrier = false;
            }
            break;
        case 'X-Linked Recessive':
            if (getGenotype(index).includes('XAXa')) {
                family.config.nodes[index].carrier = true;
            } else {
                family.config.nodes[index].carrier = false;
            }
            break;
        case 'Autosomal Dominant':
        case 'X-Linked Dominant':
        case 'Y-Linked':
            family.config.nodes[index].carrier = false;
            break;
        default:
            family.config.nodes[index].affected = false;
            break;
    }
}

const getCarrier = (index) => family.config.nodes[index].carrier;

const renderType = (index) => {
    if (getCarrier(index)) {
        if (getGender(index) === 'male') {
            FamilyTree.templates.tommy_male.node = 
            '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#ffffff" stroke="#000000" rx="7" ry="7"></rect><rect x="20" y="20" height="10" width="10" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
        } else if (getGender(index) === 'female') {
            FamilyTree.templates.tommy_female.node = 
            '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#ffffff" stroke="#000000" rx="100" ry="100"></rect><rect x="20" y="20" height="10" width="10" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
        }
    } else {
        if (getAffected(index) && getGender(index) === 'male') {
            FamilyTree.templates.tommy_male.node = 
            '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#0000000" stroke="#000000" rx="7" ry="7"></rect>';
        } else if (getAffected(index) && getGender(index) === 'female') {
            FamilyTree.templates.tommy_female.node = 
            '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
        }
    }
}

// const setNumberofChildren = () => Math.floor(Math.random() * 5);
const setNumberofChildren = () => Math.ceil(Math.random() * 3);

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
    let individualPair = { id: pairId, mid: null, fid: null, pids: [], genotype: null, gender: null, affected: null, carrier: null, generation: generation };
    family.config.nodes.push(individualPair);
    while (getGender(pairId) !== getOppositeGender(index)) {
        setGenotype(pairId);
        setGender(pairId);
        setAffected(pairId);
        setCarrier(pairId);
        // renderType(pairId);
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
    let individual = { id: currentId, mid: mid, fid: fid, pids: [], genotype: null, gender: null, affected: null, carrier: null, generation: generation };
    family.config.nodes.push(individual);
    setGenotype(currentId);
    setGender(currentId);
    setAffected(currentId);
    setCarrier(currentId);
    // renderType(currentId);

    let num = Math.ceil(Math.random() * 4);

    if (generation !== maxGenerations && num !== 4) {
        createPair(currentId, generation);
    }

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
    let maleGenotype = 'Aa';
    let femaleGenotype = 'Aa';
    // let maleGenotype = 'XAXa';
    // let femaleGenotype = 'XaY';

    let firstMale = {id: 0, mid: null, fid: null, pids: [1], genotype: maleGenotype, gender: "male", affected: null, generation: 1};
    family.config.nodes.push(firstMale);
    setAffected(0);
    setCarrier(0);
    // renderType(0);

    let firstFemale = {id: 1, mid: null, fid: null, pids: [0], genotype: femaleGenotype, gender: "female", affected: null, generation: 1};
    family.config.nodes.push(firstFemale);
    setAffected(1);
    setCarrier(1);
    // renderType(1);

    createChildren(1, 0, 4, getGeneration(0));

}

createFirstGeneration();

//#region Copyright Year
const date = new Date();

document.querySelector("#copyright-year").textContent = date.getFullYear();
//#endregion