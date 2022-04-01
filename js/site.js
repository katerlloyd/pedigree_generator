// Execute when page loads.
window.onload = () => {

	// Populate the generation dropdown with numbers from 3 to 6.
	let selectGen = document.querySelector('select#gen');

	for (let i = 3; i < 7; i++) {
	    let option = document.createElement('option');
	    option.setAttribute('value', `${i}`);
	    option.textContent = i;

	    selectGen.appendChild(option);
	};

	// Initialize the inheritance type.
	let inheritanceType = 'Autosomal Dominant';

	// Update the male/female genotype options and add/remove the carrier icon when the inheritance type is updated.
    const checkInheritanceType = () => {
        if (document.querySelector('input[name="inheritance-type"]:checked').value.includes('Recessive')) {
            const carrierIcon = document.getElementById('carrier');
            carrierIcon.style.display = 'flex';
        } else {
            const carrierIcon = document.getElementById('carrier');
            carrierIcon.style.display = 'none';
        }

        inheritanceType = document.querySelector('input[name="inheritance-type"]:checked').value;

        removeMaleGenotypeList();
        removeFemaleGenotypeList();
        createMaleGenotypeList();
        createFemaleGenotypeList();
        return inheritanceType;
    }

    // Build the autosomal inheritance type radio list selection.
    const createAutosomalInheritanceTypeList = () => {
        const fieldset = document.getElementById('type-selection');

        let list = ['Autosomal Dominant', 'Autosomal Recessive'];

        list.forEach(item => {
            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('id', `${item.toLowerCase().replace(/ /g, '-')}`);
            input.setAttribute('name', 'inheritance-type');
            input.setAttribute('value', `${item}`);
            fieldset.appendChild(input);

            let label = document.createElement('label');
            label.setAttribute('for', `${item.toLowerCase().replace(/ /g, '-')}`);
            label.innerHTML = item;
            fieldset.appendChild(label);
        });

        let legend = document.createElement('legend');
        legend.textContent = 'Inheritance Type';
        fieldset.appendChild(legend);

        fieldset.firstChild.defaultChecked = true;
        checkInheritanceType();
    }

	// Build the sex-linked inheritance type radio list selection.
    const createSexLinkedInheritanceTypeList = () => {
        const fieldset = document.getElementById('type-selection');

        let list = ['X-Linked Dominant', 'X-Linked Recessive', 'Y-Linked'];

        list.forEach(item => {
            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('id', `${item.toLowerCase().replace(item, ' ', '-')}`);
            input.setAttribute('name', 'inheritance-type');
            input.setAttribute('value', `${item}`);
            fieldset.appendChild(input);

            let label = document.createElement('label');
            label.setAttribute('for', `${item.toLowerCase().replace(item, ' ', '-')}`);
            label.innerHTML = item;
            fieldset.appendChild(label);
        });

        let legend = document.createElement('legend');
        legend.textContent = 'Inheritance Type';
        fieldset.appendChild(legend);

        fieldset.firstChild.defaultChecked = true;
        checkInheritanceType();
    }

    // Remove the inheritance type radio list selection.
    const removeInheritanceTypeList = () => {
        const items = document.querySelector('#type-selection');
        items.innerHTML = '';
    }

	// Selection button for displaying the autosomal inheritance type options.
	let autosomalButton = document.getElementById('autosomal-button');
	autosomalButton.addEventListener('click', () => {
		autosomalButton.classList.remove('unselected');
		document.getElementById('sex-linked-button').classList.add('unselected');
		document.querySelector('fieldset#type-selection').style.display = 'flex';

		removeInheritanceTypeList();
		createAutosomalInheritanceTypeList();
	});

	// Selection button for displaying the sex-linked inheritance type options.
	let sexLinkedButton = document.getElementById('sex-linked-button');
    sexLinkedButton.addEventListener('click', () => {
        sexLinkedButton.classList.remove('unselected');
        document.getElementById('autosomal-button').classList.add('unselected');
        document.querySelector('fieldset#type-selection').style.display = 'flex';

		removeInheritanceTypeList();
        createSexLinkedInheritanceTypeList();
    });

    // Update the inheritance type when a selection is changed.
    document.getElementById('type-selection').addEventListener('change', checkInheritanceType);

	// Obtain and sanitize first generation male genotype.
    const getFirstMaleGenotype = () => {
        let firstMaleGenotype = document.querySelector('input[name="male-genotype"]:checked').value;
        firstMaleGenotype = firstMaleGenotype.replace(/\<sup\>/g, '').replace(/\<\/sup\>/g, '');
        return firstMaleGenotype;
    }

	// Obtain and sanitize first generation female genotype.
    const getFirstFemaleGenotype = () => {
        let firstFemaleGenotype = document.querySelector('input[name="female-genotype"]:checked').value;
        firstFemaleGenotype = firstFemaleGenotype.replace(/\<sup\>/g, '').replace(/\<\/sup\>/g, '');
        return firstFemaleGenotype;
    }

	// Build the male genotype radio list selection.
	const createMaleGenotypeList = () => {
        const fieldset = document.getElementById('male-genotype-selection');

        let list;
        if (inheritanceType.includes('Autosomal')) {
            list = ['AA', 'Aa', 'aa'];
        } else {
            list = ['X<sup>A</sup>Y', 'X<sup>a</sup>Y'];
        }

        list.forEach(item => {
            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('id', `male${item}`);
            input.setAttribute('name', 'male-genotype');
            input.setAttribute('value', `${item}`);
            fieldset.appendChild(input);

            let label = document.createElement('label');
            label.setAttribute('for', `male${item}`);
            label.innerHTML = item;
            fieldset.appendChild(label);
        });

        let legend = document.createElement('legend');
        legend.textContent = 'Male';
        fieldset.appendChild(legend);

        fieldset.firstChild.defaultChecked = true;

	}

	// Build the female genotype radio list selection.
	const createFemaleGenotypeList = () => {
        const fieldset = document.getElementById('female-genotype-selection');

        let list;
        if (inheritanceType.includes('Autosomal')) {
            list = ['AA', 'Aa', 'aa'];
        } else {
            list = ['X<sup>A</sup>X<sup>A</sup>', 'X<sup>A</sup>X<sup>a</sup>', 'X<sup>a</sup>X<sup>a</sup>'];
        }

        list.forEach(item => {
            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('id', `female${item}`);
            input.setAttribute('name', 'female-genotype');
            input.setAttribute('value', `${item}`);
            fieldset.appendChild(input);

            let label = document.createElement('label');
            label.setAttribute('for', `female${item}`);
            label.innerHTML = item;
            fieldset.appendChild(label);
        });

        let legend = document.createElement('legend');
        legend.textContent = 'Female';
        fieldset.appendChild(legend);

         fieldset.firstChild.defaultChecked = true;
    }

	// Remove the male genotype radio list selection.
    const removeMaleGenotypeList = () => {
        const items = document.querySelector('#male-genotype-selection');
        if (items) {
            while (items.firstChild) {
                items.removeChild(items.firstChild);
            }
        }
    }

	// Remove the female genotype radio list selection.
    const removeFemaleGenotypeList = () => {
        const items = document.querySelector('#female-genotype-selection');
        if (items) {
            while (items.firstChild) {
                items.removeChild(items.firstChild);
            }
        }
    }

	// Build both of the male/female genotype selection lists.
    createMaleGenotypeList();
    createFemaleGenotypeList();

	// Select the checked male radio button and sanitize input.
	const maleFieldset = document.getElementById('male-genotype-selection').addEventListener('change', () => {
		const maleRadios = document.querySelectorAll('input[name="male-genotype"]');

        maleRadios.forEach(radio => {
            if (radio.checked) {
                maleGenotype = radio.value;
                maleGenotype = maleGenotype.replace(/\<sup\>/g, '').replace(/\<\/sup\>/g, '');
            }
        });
	});

	// Select the checked female radio button and sanitize input.
	const femaleFieldset = document.getElementById('female-genotype-selection').addEventListener('change', () => {
		const femaleRadios = document.querySelectorAll('input[name="female-genotype"]');

        femaleRadios.forEach(radio => {
            if (radio.checked) {
                femaleGenotype = radio.value;
                femaleGenotype = femaleGenotype.replace(/\<sup\>/g, '').replace(/\<\/sup\>/g, '');
            }
        });
	});

	// Set count to ensure that all generations have at least one marriage and child until the last generation.
	let count = 1;

	// Build the pedigree chart.
	const generatePedigreeChart = () => {

		// Create the family object to initialize the pedigree chart.
		const family = new FamilyTree(document.getElementById("tree"), {
		    mouseScroll: FamilyTree.action.scroll,
		    scaleInitial: FamilyTree.match.boundary,
		    enableSearch: false,
		    editForm: {},
		    // Enable the png image download option.
		    menu: {
                png: { text: "Export PNG" }
            },
            nodeMenu: {
                png: { text: "Export PNG" }
            },
            // Initialize the attributes for each individual.
		    nodeBinding: {
		        field_0: "gender",
		        field_1: "genotype",
		        field_2: "affected",
		        field_3: "carrier",
		        field_4: "generation",
		        img_0: "img"
		    },
		    // Initialize the list of individuals.
		    nodes: []
		});

		// Get the id of the last individual in the list.
		const getLastId = () => {
		    let lastIndex = family.config.nodes.length - 1;
		    return family.config.nodes[lastIndex].id;
		}

		// Get the mother id of the individual.
		const getMid = (index) => {
		    return family.config.nodes[index].mid
		}

		// Get the father id of the individual.
		const getFid = (index) => family.config.nodes[index].fid;

		// Get a random genotype for the individual.
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

		// Set the genotype of the individual based on the inheritance type.
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

		// Get the genotype of the individual.
		const getGenotype = (index) => family.config.nodes[index].genotype;

		// Set the gender of the individual based on their genotype.
		const setGender = (index) => {
		    let num = Math.ceil(Math.random() * 2);
		    if (getGenotype(index).includes('Y') || (getGenotype(index).length === 2 && num === 2)) {
		        family.config.nodes[index].gender = 'male';
		    } else {
		        family.config.nodes[index].gender = 'female';
		    }
		}

		// Get the gender of the individual.
		const getGender = (index) => family.config.nodes[index].gender;

		// Determine if the individual expresses the phenotype based on the genotype.
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

		// Get the affected status of the individual.
		const getAffected = (index) => family.config.nodes[index].affected;

		// Determine whether an individual is a carrier of the recessive allele based on the inheritance type.
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

		// Get the carrier status of the individual.
		const getCarrier = (index) => family.config.nodes[index].carrier;

		// Add the SVG rectangle/circle shape to the individual based on their affected and carrier status.
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

		// Set the number of children that each pair can have (0-4).
		const setNumberOfChildren = () => Math.floor(Math.random() * 5);

		// Get the opposite gender of the individual to determine spouse gender.
		const getOppositeGender = (index) => {
		    if (getGender(index) === 'male') {
		        return 'female';
		    } else {
		        return 'male';
		    }
		}

		// Create an individual to pair to the current individual and generate their children.
		const createPair = (index, generation) => {
		    let pairId = index + 1;
		    let individualPair = { id: pairId, mid: null, fid: null, pids: [], genotype: null, gender: null, affected: null, carrier: null, generation: generation };
		    family.config.nodes.push(individualPair);
		    while (getGender(pairId) !== getOppositeGender(index)) {
		        setGenotype(pairId);
		        setGender(pairId);
		    }

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

		    let numberOfChildren = setNumberOfChildren();

		    if (numberOfChildren === 0 && count <= maxGenerations) {
		        numberOfChildren = 1;
		    }

		    createChildren(mid, fid, numberOfChildren, generation);
		}

		// Create an individual and their pair.
		const createIndividual = (mid, fid, generation) => {
		    let currentId = getLastId() + 1;
		    let individual = { id: currentId, mid: mid, fid: fid, pids: [], genotype: null, gender: null, affected: null, carrier: null, generation: generation };
		    family.config.nodes.push(individual);
		    setGenotype(currentId);
		    setGender(currentId);
		    setAffected(currentId);
		    setCarrier(currentId);
		    renderType(currentId);

		    let num = Math.ceil(Math.random() * 4);

		    if (generation < maxGenerations && (count < maxGenerations || num !== 4)) {
		        createPair(currentId, generation);
		    }
		}

		// Set the maximum number of generations that the chart can go to as specified by the user.
		let maxGenerations = selectGen.value;

		// Get the generation number of the individual.
		const getGeneration = (index) => family.config.nodes[index].generation;

		// Create the children of each pair until the max generation is completed.
		const createChildren = (mid, fid, numberOfChildren, currentGeneration) => {
			count++;
		    if (maxGenerations > currentGeneration) {
		        let nextGeneration = currentGeneration + 1;

		        for (let i=0; i < numberOfChildren; i++) {
		            createIndividual(mid, fid, nextGeneration);
		        }
		    }
		    return count;
		}

		// Create the first generation of individuals based on the user input.
		const createFirstGeneration = () => {
		     let maleGenotype = getFirstMaleGenotype();
		     let femaleGenotype = getFirstFemaleGenotype();

		    let firstMale = { id: 0, mid: null, fid: null, pids: [1], genotype: maleGenotype, gender: "male", affected: null, generation: 1 };
		    family.config.nodes.push(firstMale);
		    setAffected(0);
		    setCarrier(0);
		    renderType(0);

		    let firstFemale = { id: 1, mid: null, fid: null, pids: [0], genotype: femaleGenotype, gender: "female", affected: null, generation: 1 };
		    family.config.nodes.push(firstFemale);
		    setAffected(1);
		    setCarrier(1);
		    renderType(1);

		    let selectedNumberOfChildren = document.getElementById('children').value;

		    createChildren(1, 0, selectedNumberOfChildren, getGeneration(0));
		}

		createFirstGeneration();
	}

	// Display the loading icon.
	const showLoadingIcon = () => {
		const box = document.getElementById('box');
		box.style.display = 'block';
	}

	// Hide the loading icon.
	const removeLoadingIcon = () => {
		const box = document.getElementById('box');
	    box.style.display = 'none';
	}

	// Display the pedigree chart.
	const showChart = () => {
		const box = document.getElementById('tree');
		box.style.display = 'block';
	}

	// Hide the pedigree chart.
	const removeChart = () => {
		const box = document.getElementById('tree');
		box.style.display = 'none';
	}

	// Set button to display the loading icon and pedigree chart and reset the chart info.
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