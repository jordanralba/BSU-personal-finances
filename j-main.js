const EventSetup = {
    incomeAmount: { id: 'income_streams-amount', fn: updateAmmount, args: ['incomeAmount', 'income_streams', incomeRow], },
    accountAmount: { id: 'financial_accounts-amount', fn: updateAmmount, args: ['accountAmount', 'financial_accounts', accountRow], },
    expenseAmount: { id: 'expense_report-amount', fn: updateAmmount, args: ['expenseAmount', 'expense_report', expenseRow], },
    contactAmount: { id: 'emergency_contacts-amount', fn: updateAmmount, args: ['contactAmount', 'emergency_contacts', contactRow], },
    passkeyInput: { id: 'passkey', fn: updateKeyInput, action: 'keyup', },
    passkeyVerify: { id: 'passkey_verify', },
    passkeyError: { id: 'passkey-error', },
    docDownload: { id: 'document_download', fn: updateDocDownload, action: 'click', },
    fileField: { id: 'encrypted_file', fn: updateFileField },
    docDisplays: { className: 'doc-display' },
}

// populate global varables, and add event listeners
for (const key of Object.keys(EventSetup)) {
    const { id, className, fn, action = 'change', args = [] } = EventSetup[key]
    let ele;
    if (id) {
        ele = document.getElementById(id)
    } else if (className) {
        ele = document.getElementsByClassName(className)
    } else console.error('ERROR no fetchable identifier for EventSetup');

    if (!ele) console.error(`ERROR no element found for ${id || className}`);

    if (typeof fn == 'function') ele?.addEventListener(action, (e) => fn(e, ...args)); // if the function and element exists add an Event Listener
    window[key] = ele; // converts variable to global
}

const docDataObject = {};
const fileReader = new FileReader();
const fileFieldLabel = fileField.labels[0];
const finForm = document.forms[0];
finForm.onsubmit = (e) => e.preventDefault();
const operations = crypto.subtle || crypto.webkitSubtle;
const encoderUTF8 = new TextEncoder('utf-8');
const decoderUTF8 = new TextDecoder('utf-8');
const imgReader = new FileReader();

function updateAmmount(e, globalConstString = '', type = '', callback = () => { }) {
    const ref = window[globalConstString];
    const Heads = document.getElementById(`h-${type}`);
    const InputTable = document.getElementById(`${type}`);
    const { firstElementChild: { children } } = InputTable;

    for (x = children.length + 1; x <= ref.value; x++) {
        callback(InputTable);
    }

    for (i = children.length; i > ref.value; i--) {
        for (element of InputTable.children) {
            element.lastChild.remove();
        }
    }

    if (children.length <= 0) {
        Heads.style.opacity = 0;
    } else {
        Heads.style.opacity = 100;
    }
}

function populateNode(attributes = [], children = null, parent = null) {
    attributes.forEach(({ element = 'input', ...atts }, index) => {
        const newNode = document.createElement(element);
        for (const key of Object.keys(atts)) {
            switch (key) {
                case 'text': // let this be a fall-through case
                    newNode[key] = atts[key];
                    break;
                case 'children': populateNode(atts[key], null, newNode);
                    break;
                default: newNode.setAttribute(key, atts[key]);
                    break;
            }
        }

        if (parent) parent.appendChild(newNode);
        else if (children) children[index]?.appendChild(newNode);
        else console.error('ERROR no children or parent provided for populateNode()')
    })
}

function contactRow({ children }) {
    const setAttribute = [
        { type: 'text', class: 'emergency_contact_name-input', },
        { class: 'emergency_contact_relationship-input', },
        { type: 'tel', class: 'emergency_contact_phone-input' },
        { type: 'email', class: 'emergency_contact_email-input' },
    ];
    populateNode(setAttribute, children)
}

function expenseRow({ children }) {
    const setAttribute = [
        { type: 'text', class: 'expense_description-input', },
        {
            element: 'select', class: 'expense_frequency-input',
            children: [
                { element: 'option', value: 1, text: "One-Time", },
                { element: 'option', value: 1, text: "Annual", },
                { element: 'option', value: 2, text: "Semiannually", },
                { element: 'option', value: 4, text: "Quarterly", },
                { element: 'option', value: 12, text: "Monthly", },
                { element: 'option', value: 26, text: "Biweekly", },
                { element: 'option', value: 52, text: "Weekly", },
            ]
        },
        { type: 'number', class: 'expense_amount-input', },
        { type: 'text', class: 'expense_date-input', },
    ]

    populateNode(setAttribute, children)
}

function accountRow({ children }) {
    const setAttribute = [
        { type: 'text', class: 'account_institution-input', },
        { class: 'account_types-input', },
        { type: 'number', class: 'account_numbers-input', },
        { element: 'textarea', class: 'account_purposes-input', },
    ]

    populateNode(setAttribute, children)
}

function incomeRow({ children }) {
    const setAttribute = [
        { type: 'text', class: 'income_resource-input', },
        {
            element: 'select', class: 'income_frequency-input',
            children: [
                { element: 'option', value: 1, text: "Annual", },
                { element: 'option', value: 2, text: "Semiannually", },
                { element: 'option', value: 4, text: "Quarterly", },
                { element: 'option', value: 12, text: "Monthly", },
                { element: 'option', value: 26, text: "Biweekly", },
                { element: 'option', value: 52, text: "Weekly", },
            ]
        },
        { type: 'number', step: 0.01, class: 'income_amounts-input', },
        { element: 'textarea', class: 'income_usage-input', },
    ]

    populateNode(setAttribute, children)
}

function updateKeyInput() {
    let { classList } = fileFieldLabel;
    const { value: passwordString } = passkeyInput;

    if (passwordString.length >= 8) classList.remove('disabled');
    else classList.add('disabled')
}

function updateDocDownload() {
    const { value: targetDoc, options, selectedIndex } = finForm.document_select;
    if (typeof docDataObject[targetDoc] === 'undefined') return; // download Error

    const fileData = Object.values(docDataObject[targetDoc]);

    docDownload.href = fileData[1];
    docDownload.download = options[selectedIndex].innerText;
}

function updateFileField() {
    const { disabled, files } = fileField;
    if (disabled) return;
    if (files.length == 0) {
        console.log('No File');
        fileFieldLabel.innerHTML = 'Upload Save';
        return;
    }

    // check if matches previous password input
    fileFieldLabel.innerHTML = files[0].name;
    fileReader.readAsText(this.files[0]);
    fileField.value = null;
}


function b64ToBlob(b64EncodedData) {
    const contentAsBytes = atob(b64EncodedData);
    const byteNumbers = new Array(contentAsBytes.length);
    for (let i = 0; i < contentAsBytes.length; i++) {
        byteNumbers[i] = contentAsBytes.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
}

finForm.important_documents.addEventListener('change', function (e) {
    const fileType = this.files[0].type;
    const fileSize = this.files[0].size / 1000;
    imgReader.readAsDataURL(this.files[0]);
    const targetDoc = finForm.document_select.value;
    if (!targetDoc) return
    imgReader.onloadend = () => {
        const storObj = {};
        storObj.type = fileType;
        storObj.content = imgReader.result;
        storObj.size = fileSize;
        docDataObject[targetDoc] = storObj;
        updateDocDisplay(storObj);
        finForm.important_documents.value = null;
    }
});

finForm.document_select.addEventListener('change', () => {
    const targetDoc = finForm.document_select.value;
    docDisplays[0].src = '';
    docDisplays[1].data = '';
    if (typeof docDataObject[targetDoc] !== 'undefined') {
        updateDocDisplay(docDataObject[targetDoc]);
    } else {
        docDownload.style.opacity = 0;
        docDownload.style.visibility = "hidden";
    }
});

function updateDocDisplay({ content, type, size } = {}) {
    if (type.includes('svg')) {
        docDisplays[1].data = content;
        docDisplays[1].type = type;
        docDisplays[0].hidden = true;
        docDisplays[1].hidden = false;
    } else if (type.includes('application')) {
        if (size > 2000) {
            const contentAsByteArray = b64ToBlob(content.split(",")[1]);
            const largePDF = new Blob([contentAsByteArray], { type: "application/pdf" })
            docDisplays[1].data = URL.createObjectURL(largePDF);
            URL.revokeObjectURL(largePDF);
        } else {
            docDisplays[1].data = content;
        }
        docDisplays[1].type = type;
        docDisplays[0].hidden = true;
        docDisplays[1].hidden = false;
    } else if (type.includes('image')) {
        docDisplays[0].src = content;
        docDisplays[0].type = type;
        docDisplays[0].hidden = false;
        docDisplays[1].hidden = true;
    }
    docDownload.style.opacity = 100;
    docDownload.style.visibility = "visible";
}

const actionMap = {
    income: handleRowChange,
    account: handleRowChange,
    expense: handleRowChange,
    contact: handleRowChange,
}

const newRow = (target) => actionMap[target]?.(target, 1);
const removeRow = (target) => actionMap[target]?.(target, -1);

function handleRowChange(target, count = 0) {
    const { args: [str, type, fn] } = EventSetup[`${target}Amount`];
    const ref = window[str];
    ref.value = parseInt(ref.value || 0) + count;
    updateAmmount(null, str, type, fn);
}

function calcAnnualIncome(action) {
    const income_amounts = [...document.getElementsByClassName('income_amounts-input')];
    const income_frequency = [...document.getElementsByClassName('income_frequency-input')];
    let savings = 0;

    income_amounts.forEach((incEle, i) => {
        savings += income_frequency[i].value * incEle.value;
    })

    if (action === 'displayUpdate') {
        return savings;
    }

    finForm.annual_income.value = savings.toFixed(2);


}

function calcEmergencyCash(action) {
    const annual_income = calcAnnualIncome("calculate");
    const emergencySavings = (annual_income / 4).toFixed(2);

    if (action !== 'displayUpdate') {
        return emergencySavings;
    }

    finForm.emergency_savings_guess.value = emergencySavings;

}

function calcMonthlySaving() {
    if (finForm.emergency_savings_guess.value > 0) {
        const emergencySavings = (finForm.emergency_savings_guess.value / 4).toFixed(2);
        finForm.monthly_saving_guess.value = (emergencySavings / 12).toFixed(2);
    } else {
        const emergencySavings = calcEmergencyCash('calculate');
        finForm.monthly_saving_guess.value = (emergencySavings / 12).toFixed(2);
    }
    return;
}

function formDisplayUpdate(json) {
    if (typeof json.data !== 'undefined') {
        const data = json.data;

        incomeAmount.value = data.resources.length;
        accountAmount.value = data.institution.length;
        expenseAmount.value = data.expense_description.length;
        contactAmount.value = data.emergency_contact_name.length;

        updateAmmount('', ...EventSetup.incomeAmount.args);
        updateAmmount('', ...EventSetup.accountAmount.args);
        updateAmmount('', ...EventSetup.expenseAmount.args);
        updateAmmount('', ...EventSetup.contactAmount.args);

        const fillPairs = {
            resources: '.income_resource-input',
            frequency: '.income_frequency-input',
            amounts: '.income_amounts-input',
            uses: '.income_usage-input',
            institution: '.account_institution-input',
            account_types: '.account_purposes-input',
            account_numbers: '.account_numbers-input',
            purposes: '.account_types-input',
            expense_description: '.expense_description-input',
            expense_frequency: '.expense_frequency-input',
            expense_amount: '.expense_amount-input',
            expense_date: '.expense_date-input',
            emergency_contact_name: '.emergency_contact_name-input',
            emergency_contact_relationship: '.emergency_contact_relationship-input',
            emergency_contact_phone: '.emergency_contact_phone-input',
            emergency_contact_email: '.emergency_contact_email-input',
        }

        for (const key of Object.keys(data)) {
            switch (key) {
                case 'first_name': // let this be a fall-through case
                case 'last_name':
                case 'uni_id':
                case 'emergency_savings_guess':
                case 'monthly_saving_guess':
                case 'annual_income':
                    finForm[key].value = data[key];
                    break;
                default:
                    if (fillPairs[key]) {
                        const Inputs = document.querySelectorAll(fillPairs[key]);
                        for (const [index, resource] of data[key].entries()) {
                            Inputs[index].value = resource;
                        }
                    } else console.error(`ERROR key pair: ${key} was not found in function formDisplayUpdate()`)
                    break;
            }
        }
    }
    if (typeof json.documents !== 'undefined') {
        const { value: targetDoc } = finForm.document_select;
        for (const [index, obj] of Object.entries(json.documents)) {
            const content = Object.entries(obj)
            console.log(obj)
            console.log(content)
            docDataObject[content[0][0]] = content[0][1];
            console.log(docDataObject);
        }
        if (parseInt(targetDoc) >= 0) {
            updateDocDisplay(docDataObject[parseInt(targetDoc)]);
        }
    }
}

function str2ab(str) {
    try {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    } catch {
        console.error('Error converting from Type String to ArrayBuffer');
    }
}

function ab2str(ab) {
    try {
        console.log(ab);
        let str = '';
        const bufView = new Uint8Array(ab);
        for (let i = 0, bytesLen = bufView.byteLength; i < bytesLen; i++) {
            str += String.fromCharCode(bufView[i]);
        }
        return str;
    } catch {
        console.error('Error converting to Type String from ArrayBuffer')
    }
}

function storeInputs() {
    const storageObj = {
        data: {},
        documents: []
    };
    const remDataSet = {};
    const exceptions = ['data-input'];
    for (const input of document.querySelectorAll("[class*=-input]")) {
        const { parentElement: { id: pid } } = input;
        if (exceptions.includes(input.className)) continue;
        if (input.className === 'form-input') {
            storageObj.data[input.id] = input.value;
        } else if (pid) {
            if (!remDataSet[pid]) remDataSet[pid] = [];
            remDataSet[pid].push(input.value);
        } else console.error(`ERROR no storeInput approach for: ${input.className}`);
    }
    storageObj.data = { ...remDataSet, ...storageObj.data }

    const { options } = finForm.document_select;

    for (const [index, entry] of Object.entries(docDataObject)) {
        console.log(entry)
        console.log(index)
        entry.name = options[parseInt(index) + 1].innerText;
        console.log(entry)
        const tempObj = {}
        tempObj[index] = entry
        storageObj.documents.push(tempObj);

    }

    console.log(storageObj);
    return storageObj;
}

async function newCryptoKey() {
    passkeyError.style.opacity = 0;
    //key material must be 16, 24 or 32 bytes
    const key = passkeyInput.value;
    if (passkeyInput.value !== passkeyVerify.value) {
        passkeyError.firstElementChild.innerHTML = "Passwords don't match.";
        passkeyError.style.opacity = 100;
        return;
    }
    if (7 < key.length) {
        if (key.length < 33) {
            const keyEnc = encoderUTF8.encode(key.padStart(16, key).slice(0, 16));
            const newKey = await operations.importKey(
                'raw',
                keyEnc,
                { name: 'AES-GCM' },
                true,
                ['encrypt', 'decrypt']);
            return newKey;
        } else {
            const keyEnc = encoderUTF8.encode(key.slice(0, 32));
            const newKey = await operations.importKey(
                'raw',
                keyEnc,
                { name: 'AES-GCM' },
                true,
                ['encrypt', 'decrypt']);
            return newKey;
        }
    } else {
        passkeyError.firstElementChild.innerHTML = 'Password must be 8 or more characters';
        passkeyError.style.opacity = 100;
    }
}
async function encryptToString(content, cryptKey) {
    //Randomized initial variables for salting
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await operations.encrypt(
        { name: 'AES-GCM', iv: iv },
        cryptKey,
        content
    );
    const allData = {};
    allData.iv = iv,
        allData.content = await ab2str(encryptedData);
    return JSON.stringify(allData);
}

async function downloadEncryptedFile() {
    const newEncName = document.getElementById('new_encryption');
    const tempObj = {};
    const cryptoKey = await newCryptoKey();
    const link = document.createElement("a");
    const content = storeInputs();
    console.log(content);
    const contentEncoded = encoderUTF8.encode(JSON.stringify(content));
    const encrypted = await encryptToString(contentEncoded, cryptoKey);
    const file = new Blob([encrypted], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    if (newEncName.value.length >= 1) {
        link.download = newEncName.value;
        link.click();
    } else {
        link.download = "finance-tracker.txt";
        link.click();
    }
    URL.revokeObjectURL(link.href);
};

fileReader.onloadend = async function () {
    const fileJSON = JSON.parse(fileReader.result);
    //key material must be 16, 24 or 32 bytes 
    const cryptoKey = await newCryptoKey();
    const iv = new Uint8Array(Object.values(fileJSON.iv));
    const encryptedData = str2ab(fileJSON.content);
    try {
        const decryptedData = await operations.decrypt(
            { name: 'AES-GCM', iv: iv },
            cryptoKey,
            encryptedData
        );
        const decodedData = decoderUTF8.decode(decryptedData);
        console.log(JSON.parse(decodedData))
        formDisplayUpdate(JSON.parse(decodedData));
    } catch {
        fileFieldLabel.innerHTML = "Upload Save"
        console.error("Passkey is Incorrect");
    }
}