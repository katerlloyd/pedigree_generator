//#region Responsive Navigation Bar
// document.querySelector('.bar-icon').addEventListener('click', () => {
//     document.querySelector('.navigation').classList.toggle('responsive');
// }, false);

// window.onresize = () => {
//     if (window.innerWidth > 675) document.querySelector('.navigation').classList.remove('responsive')
// };
//#endregion

window.onload  = () => {

	let selectGen = document.querySelector('select#gen');

	for (let i = 3; i < 7; i++) {
	    let option = document.createElement('option');
	    option.setAttribute('value', `${i}`);
	    option.textContent = i;

	    selectGen.appendChild(option);
	};

	let inheritanceType = document.getElementById('type').value;

	const checkInheritanceType = () => {
		if (document.getElementById('type').value.includes('Recessive')) {
            const carrierIcon = document.getElementById('carrier');
            carrierIcon.style.display = 'flex';
        } else {
            const carrierIcon = document.getElementById('carrier');
            carrierIcon.style.display = 'none';
        }
        inheritanceType = document.getElementById('type').value;

		removeMaleGenotypeList();
		removeFemaleGenotypeList();
        createMaleGenotypeList();
        createFemaleGenotypeList();
        return inheritanceType;
	}

	const createMaleGenotypeList = () => {
		const ul = document.getElementById('male-genotype-selection');
		let list;
		if (inheritanceType.includes('Autosomal')) {
			list = ['AA', 'Aa', 'aa'];
		} else {
			list = ['X<sup>A</sup>Y', 'X<sup>a</sup>Y'];
		}

		list.forEach(item => {
			const li = document.createElement('li');
			li.innerHTML = item;
			ul.appendChild(li);
		});
	}

	const createFemaleGenotypeList = () => {
        const ul = document.getElementById('female-genotype-selection');
        let list;
        if (inheritanceType.includes('Autosomal')) {
            list = ['AA', 'Aa', 'aa'];
        } else {
            list = ['X<sup>A</sup>X<sup>A</sup>', 'X<sup>A</sup>X<sup>a</sup>', 'X<sup>a</sup>X<sup>a</sup>'];
        }

        list.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            ul.appendChild(li);
        });
    }

    const removeMaleGenotypeList = () => {
        const items = document.querySelector('#male-genotype-selection');
        if (items) {
            while (items.firstChild) {
                items.removeChild(items.firstChild);
            }
        }
    }

    const removeFemaleGenotypeList = () => {
        const items = document.querySelector('#female-genotype-selection');
        if (items) {
            while (items.firstChild) {
                items.removeChild(items.firstChild);
            }
        }
    }

    createMaleGenotypeList();
    createFemaleGenotypeList();

	document.getElementById('type').addEventListener('change', checkInheritanceType);

	const generatePedigreeChart = () => {

		const family = new FamilyTree(document.getElementById("tree"), {
		    mouseScroll: FamilyTree.action.scroll,
		    scaleInitial: FamilyTree.match.boundary,
		    enableSearch: false,
		    editForm: {},
		    menu: {
                png: { text: "Export PNG" }
            },
            nodeMenu: {
                png: { text: "Export PNG" }
            },
		    nodeBinding: {
		        field_0: "gender",
		        field_1: "genotype",
		        field_2: "affected",
		        field_3: "carrier",
		        field_4: "generation",
		        img_0: "img"
		    },
		    nodes: []
		});

		const getLastId = () => {
		    let lastIndex = family.config.nodes.length - 1;
		    return family.config.nodes[lastIndex].id;
		}

		const getMid = (index) => {
		    return family.config.nodes[index].mid
		}

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

		// ADD COMMENTS
		const getGenotype = (index) => family.config.nodes[index].genotype;

		// ADD COMMENTS
		const setGender = (index) => {
		    let num = Math.ceil(Math.random() * 2);
		    if (getGenotype(index).includes('Y') || (getGenotype(index).length === 2 && num === 2)) {
		        family.config.nodes[index].gender = 'male';
		    } else {
		        family.config.nodes[index].gender = 'female';
		    }
		}

		// ADD COMMENTS
		const getGender = (index) => family.config.nodes[index].gender;

		// ADD COMMENTS
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
		            if (getGenotype(index).includes('Y') && getFid(index) !== null) {
		                if (getAffected(getFid(index)) === true) {
		                    family.config.nodes[index].affected = true;
		                }
		            } else if (getGenotype(index).includes('Y') && getFid(index) === null) {
		                let num = Math.ceil(Math.random() * 4);
		                if (num === 4) {
		                    family.config.nodes[index].affected = true;
		                } else {
		                    family.config.nodes[index].affected = false;
		                }
		            } else {
		                family.config.nodes[index].affected = false;
		            }
		            if (index === 0) {
		                family.config.nodes[index].affected = true;
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
		            family.config.nodes[index].img = '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#ffffff" stroke="#000000" rx="7" ry="7"></rect><rect x="20" y="20" height="10" width="10" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
		        } else if (getGender(index) === 'female') {
		            family.config.nodes[index].img = '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#ffffff" stroke="#000000" rx="100" ry="100"></rect><rect x="20" y="20" height="10" width="10" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
		        }
		    } else {
		        if (getAffected(index) && getGender(index) === 'male') {
		            family.config.nodes[index].img = '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#0000000" stroke="#000000" rx="7" ry="7"></rect>';
		        } else if (getAffected(index) && getGender(index) === 'female') {
		            family.config.nodes[index].img = '<rect x="0" y="0" height="50" width="50" stroke-width="2" fill="#000000" stroke="#000000" rx="100" ry="100"></rect>';
		        }
		    }
		}

		const setNumberofChildren = () => Math.floor(Math.random() * 5);
	//	 const setNumberofChildren = () => Math.ceil(Math.random() * 4);

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
		    }

		    // let probability = Math.ceil(Math.random() * 2);
		    // if (inheritanceType === 'Y-Linked' && getGender(pairId) === "male" && probability === 2) {
		    //     family.config.nodes[pairId].affected = true;
		    // } else {
		    //     setAffected(pairId);
		    // }

		    setAffected(pairId);
		    setCarrier(pairId);
		    renderType(pairId);

		    family.config.nodes[index].pids[0] = pairId;
		    family.config.nodes[pairId].pids[0] = index;

		    let mid = pairId;
		    let fid = index;

		    if (getGender(index) === "female") {
		        mid = index;
		        fid = pairId;
		    }

		    let numberOfChildren = setNumberofChildren();

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
		    renderType(currentId);

		    let num = Math.ceil(Math.random() * 4);

		    if (generation !== maxGenerations && num !== 4) {
		        createPair(currentId, generation);
		    }

		    console.log(family.config.nodes);
		}

		let maxGenerations = selectGen.value;

		const getGeneration = (index) => family.config.nodes[index].generation;

		const createChildren = (mid, fid, numberOfChildren, currentGeneration) => {
		    if (maxGenerations > currentGeneration) {
		        let nextGeneration = currentGeneration + 1;
		        for (let i=0; i < numberOfChildren; i++) {
		            createIndividual(mid, fid, nextGeneration);
		        }
		    }
		}

		// ADD COMMENTS
		const createFirstGeneration = () => {
		     let maleGenotype = 'Aa';
		     let femaleGenotype = 'Aa';
//		    let maleGenotype = 'XAY';
//		    let femaleGenotype = 'XAXa';

		    let firstMale = {id: 0, mid: null, fid: null, pids: [1], genotype: maleGenotype, gender: "male", affected: null, generation: 1};
		    family.config.nodes.push(firstMale);
		    setAffected(0);
		    setCarrier(0);
		    renderType(0);

		    let firstFemale = {id: 1, mid: null, fid: null, pids: [0], genotype: femaleGenotype, gender: "female", affected: null, generation: 1};
		    family.config.nodes.push(firstFemale);
		    setAffected(1);
		    setCarrier(1);
		    renderType(1);

		    let selectedNumberOfChildren = document.getElementById('children').value;

		    createChildren(1, 0, selectedNumberOfChildren, getGeneration(0));
		}

		createFirstGeneration();
	}

	// ADD COMMENTS
	const showLoadingIcon = () => {
		const box = document.getElementById('box');
		box.style.display = 'block';
	}

	// ADD COMMENTS
	const removeLoadingIcon = () => {
		const box = document.getElementById('box');
	    box.style.display = 'none';
	}

	// ADD COMMENTS
	const showChart = () => {
		const box = document.getElementById('tree');
		box.style.opacity = '1';
	}

	// ADD COMMENTS
	const removeChart = () => {
		const box = document.getElementById('tree');
		box.style.opacity = '0';
	}

	// ADD COMMENTS
	const generatePedigreeButton = document.getElementById('generate-pedigree');
	generatePedigreeButton.addEventListener('click', () => {
		const principle = document.getElementById('principle');
		principle.style.display = 'none';
		const legend =  document.getElementsByClassName('legend');
		for (let i = 0; i < legend.length; i++) {
          legend[i].style.display = 'flex';
        }
		removeChart();
		showLoadingIcon();
		generatePedigreeChart();
		setTimeout(removeLoadingIcon, 1000);
		setTimeout(showChart, 1000);
		const newPedigreeButton = document.getElementById('new-pedigree');
		newPedigreeButton.addEventListener('click', () => location.reload());
		newPedigreeButton.style.display = 'block';
	});

}

//#region Copyright Year
const date = new Date();
document.getElementById("copyright-year").textContent = date.getFullYear();
//#endregion