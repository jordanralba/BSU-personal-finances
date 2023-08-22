/*
Using either IndexedDB or Cache api 
    ->Create storage model to save clustered datasets for later retrieval
    ->Generate:
        Table - Expense Report, Financial Institutions, Income Streams
        D3 Viz - Estimate Vs Actual Emergency Cash, Saving Needed to Reach Goal
*/ 

const incomeAmount = document.getElementById('income_streams-amount');
const accountAmount = document.getElementById('financial_accounts-amount');
const passkeyInput = document.getElementById('passkey');
const passkeyError = document.getElementById('passkey-error');
const finForm = document.forms[0];
const encoderUTF8 = new TextEncoder('utf-8');
const decoderUTF8 = new TextDecoder('utf-8');
const imgReader = new FileReader();
const docDisplays = document.getElementsByClassName('doc-display');
const docDownload = document.getElementById('document_download');
const docDataObject = {}; 

function handleForm(event) { event.preventDefault(); }
finForm.addEventListener('submit', handleForm);

finForm.document_select.addEventListener('change', ()=>{
    const targetDoc = finForm.document_select.value;
    docDisplays[0].src = '';
    docDisplays[1].data = '';
    if(typeof docDataObject[targetDoc] !== 'undefined'){
        updateDocDisplay(docDataObject[targetDoc]);
    }
    //docDisplay.children[targetDoc].hidden = false;
});

docDownload.addEventListener('click', ()=>{
    const targetDoc = finForm.document_select.value;
    if(typeof docDataObject[targetDoc] !== 'undefined'){
        const docSelect = document.getElementById('document_select');
        const fileData = Object.values(docDataObject[targetDoc]);
        docDownload.href = fileData[1];
        docDownload.download = docSelect.options[docSelect.selectedIndex].innerText;
    }else{
        //download Error
    }
});
function b64ToBlob(b64EncodedData){
    const contentAsBytes = atob(b64EncodedData);
            const byteNumbers = new Array(contentAsBytes.length);
            for (let i = 0; i < contentAsBytes.length; i++) {
                byteNumbers[i] = contentAsBytes.charCodeAt(i);
            }
            return new Uint8Array(byteNumbers);
}
finForm.important_documents.addEventListener('change', function(e){
    const fileType = ""+this.files[0].type;
    const fileSize = this.files[0].size / 1000;
    imgReader.readAsDataURL(this.files[0]);
    const targetDoc = finForm.document_select.value;
    if(targetDoc !== ""){
        imgReader.onloadend = ()=>{ 
            const storObj = {};
            storObj.type = fileType;
            storObj.content = imgReader.result;
            storObj.size = fileSize;
            docDataObject[targetDoc] = storObj;
            updateDocDisplay(storObj);
            finForm.important_documents.value = null; 
        }
    }
});
const temporaryTestingObject = {};
function updateDocDisplay(json = {}){
    if(json.type.includes('svg')){
                docDisplays[1].data = json.content;
                docDisplays[1].type = json.type;
                docDisplays[0].hidden = true;
                docDisplays[1].hidden = false;    
    }else if(json.type.includes('application')){
        if(json.size > 2000){
            const contentAsByteArray = b64ToBlob(json.content.split(",")[1]);
            const largePDF = new Blob([contentAsByteArray], {type: "application/pdf"});
            docDisplays[1].data = URL.createObjectURL(largePDF);
            URL.revokeObjectURL(largePDF);
        }else{
            docDisplays[1].data = json.content;
        }
                docDisplays[1].type = json.type;
                docDisplays[0].hidden = true;
                docDisplays[1].hidden = false;
    }else if(json.type.includes('image')){
        docDisplays[0].src = json.content;
        docDisplays[0].type = json.type;
        docDisplays[0].hidden = false;
        docDisplays[1].hidden = true;
    }
    return;
}




function updateIncomeStreams(){
    const incomeHeads = document.getElementById('h-income_streams');
    const incomeInputTable = document.getElementById('income_streams');
    for(x=incomeInputTable.firstElementChild.children.length+1;x<=incomeAmount.value;x++){
        incomeRow(incomeInputTable);
    }
    for(i=incomeInputTable.firstElementChild.children.length;i > incomeAmount.value;i--){
        for(element of incomeInputTable.children){
            element.lastChild.remove();
        }
    }
    if(incomeInputTable.firstElementChild.children.length <= 0){
        incomeHeads.style.opacity = 0;
    }else{
        incomeHeads.style.opacity = 100;
    }
}
function updateFinancialAccounts(){
    const accountHeads = document.getElementById('h-financial_accounts');
    const accountInputTable = document.getElementById('financial_accounts');
    for(x=accountInputTable.firstElementChild.children.length+1;x<=accountAmount.value;x++){
        accountRow(accountInputTable);
    }
    for(i=accountInputTable.firstElementChild.children.length;i > accountAmount.value;i--){
        for(element of accountInputTable.children){
            element.lastChild.remove();
        }
    }
    if(accountInputTable.firstElementChild.children.length <= 0){
        accountHeads.style.opacity = 0;
    }else{
        accountHeads.style.opacity = 100;
    }
}
incomeAmount.addEventListener('change', (event)=>{
    updateIncomeStreams();
});

function incomeRow(table){
    const inputNode = document.createElement('input');
    const col = table.children[0];
    const col1 = table.children[1];
    const col2 = table.children[2];
    const col3 = table.children[3];
    const optionNode = document.createElement('option');
        const resource = inputNode.cloneNode(true);
            resource.setAttribute('type', 'text');
            resource.setAttribute('class', 'income_resource-input');
            col.appendChild(resource.cloneNode(true));
        const frequency = document.createElement('select');
            frequency.setAttribute('class', 'income_frequency-input');
        const frequencyOpt = optionNode.cloneNode(true);
            frequency.appendChild(frequencyOpt.cloneNode(true));
            frequencyOpt.value = 1;
            frequencyOpt.text = "Annually";
                frequency.appendChild(frequencyOpt.cloneNode(true));
            frequencyOpt.value = 2;
            frequencyOpt.text = "Semiannually";
                frequency.appendChild(frequencyOpt.cloneNode(true));
            frequencyOpt.value = 4;
            frequencyOpt.text = "Quarterly";
                frequency.appendChild(frequencyOpt.cloneNode(true));
            frequencyOpt.value = 12;
            frequencyOpt.text = "Monthly";
                frequency.appendChild(frequencyOpt.cloneNode(true));
            frequencyOpt.value = 26;
            frequencyOpt.text = "Biweekly";
                frequency.appendChild(frequencyOpt.cloneNode(true));
            frequencyOpt.value = 52;
            frequencyOpt.text = "Weekly";
                frequency.appendChild(frequencyOpt.cloneNode(true));
            col1.appendChild(frequency.cloneNode(true));
        const dollar = resource.cloneNode(true);
            dollar.setAttribute('type', 'number');
            dollar.setAttribute('step', '0.01');
            dollar.setAttribute('class', 'income_amounts-input');
            col2.appendChild(dollar.cloneNode(true));
        const percentage = document.createElement('textarea');
            percentage.setAttribute('class', 'income_usage-input')
            col3.appendChild(percentage.cloneNode(true));
    
}
accountAmount.addEventListener('change', (event)=>{
    updateFinancialAccounts();
});

function accountRow(table){
    const inputNode = document.createElement('input');
    const col = table.children[0];
    const col1 = table.children[1];
    const col2 = table.children[2];
    const col3 = table.children[3];
        const institution = inputNode.cloneNode(true);
            institution.setAttribute('type', 'text');
            institution.setAttribute('class', 'account_institution-input');
            col.appendChild(institution.cloneNode(true));
        const account_type = institution.cloneNode(true);
            account_type.setAttribute('class', 'account_types-input');
            col1.appendChild(account_type.cloneNode(true));
        const account_number = account_type.cloneNode(true);
            account_number.setAttribute('type', 'number');
            account_number.setAttribute('class', 'account_numbers-input');
            col2.appendChild(account_number.cloneNode(true));
        const purpose = document.createElement('textarea');
            purpose.setAttribute('class', 'account_purposes-input')
            col3.appendChild(purpose.cloneNode(true));
}

function calcEmergencyCash(){
    const income_amounts = document.getElementsByClassName('income_amounts-input');
    const income_frequency = document.getElementsByClassName('income_frequency-input');
    let savings = 0;
    for(i=0;i<income_amounts.length;i++){
       savings += income_frequency[i].value * income_amounts[i].value;
    }
    const emergencySavings = (savings/4).toFixed(2);
    finForm.emergency_cash_guess.value = emergencySavings;
    return;
}function calcMonthlySaving(){
    const income_amounts = document.getElementsByClassName('income_amounts-input');
    const income_frequency = document.getElementsByClassName('income_frequency-input');
    let savings = 0;
    for(i=0;i<income_amounts.length;i++){
       savings += income_frequency[i].value * income_amounts[i].value;
    }
    console.log(finForm.emergency_cash_guess.value)
    if(parseFloat(finForm.emergency_cash_guess.value) > 0){
        console.log(finForm.emergency_cash_guess.value)
       const emergencySavings = (parseFloat(finForm.emergency_cash_guess.value)/4).toFixed(2);
       finForm.monthly_saving_guess.value = (emergencySavings/12).toFixed(2); 
    }else{
        const emergencySavings = (savings/4).toFixed(2);
        finForm.monthly_saving_guess.value = (emergencySavings/12).toFixed(2);
    }
    
    
    return;
}function calcAnnualIncome(){
    const income_amounts = document.getElementsByClassName('income_amounts-input');
    const income_frequency = document.getElementsByClassName('income_frequency-input');
    let savings = 0;
    for(i=0;i<income_amounts.length;i++){
       savings += income_frequency[i].value * income_amounts[i].value;
    }
    finForm.annual_income.value = savings.toFixed(2);
    return;
}

function formDisplayUpdate(json){
    if(typeof json.data !== 'undefined'){
        const data = json.data[0];
        finForm.first_name.value = data.first_name;
        finForm.last_name.value = data.last_name;
        finForm.uni_id.value = data.uni_id;
        finForm.emergency_cash_guess.value = data.emergency_cash_guess;
        finForm.monthly_saving_guess.value = data.monthly_saving_guess;
        finForm.annual_income.value = data.annual_income;
        incomeAmount.value = data.resources.length;
        updateIncomeStreams();
        const resourceInputs = document.querySelectorAll('.income_resource-input');
        const frequencyInputs = document.querySelectorAll('.income_frequency-input');
        const amountsInputs = document.querySelectorAll('.income_amounts-input');
        const usageInputs = document.querySelectorAll('.income_usage-input');
        for(const [index, resource] of data.resources.entries()){
            resourceInputs[index].value = resource;                        
        }
        for(const [index, resource] of data.frequency.entries()){
            frequencyInputs[index].value = resource;                        
        }
        for(const [index, resource] of data.amounts.entries()){
            amountsInputs[index].value = resource;                        
        }
        for(const [index, resource] of data.uses.entries()){
            usageInputs[index].value = resource;                        
        }
        accountAmount.value = data.institution.length;
        updateFinancialAccounts();
        const institutionInputs = document.querySelectorAll('.account_institution-input');
        const purposesInputs = document.querySelectorAll('.account_purposes-input');
        const numbersInputs = document.querySelectorAll('.account_numbers-input');
        const typesInputs = document.querySelectorAll('.account_types-input');
        for(const [index, resource] of data.institution.entries()){
            institutionInputs[index].value = resource;                        
        }
        for(const [index, resource] of data.account_types.entries()){
            typesInputs[index].value = resource;                        
        }
        for(const [index, resource] of data.account_numbers.entries()){
            numbersInputs[index].value = resource;                        
        }
        for(const [index, resource] of data.purposes.entries()){
            purposesInputs[index].value = resource;                        
        }

    }if(typeof json.documents !== 'undefined'){
        const targetDoc = finForm.document_select.value;
        for(const [index, obj] of Object.entries(json.documents)){
            const content = Object.entries(obj)
            console.log(obj)
            console.log(content)
            docDataObject[content[0][0]] = content[0][1];
            console.log(docDataObject);
        }
        if(parseInt(targetDoc) >= 0){
            updateDocDisplay(docDataObject[parseInt(targetDoc)]);
        }
    }
}

function str2ab(str) {
    try{
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i=0, strLen=str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }catch{
        console.error('Error converting from Type String to ArrayBuffer');
    }
}
function ab2str(ab) {
    try{
        console.log(ab);
        let str = '';
        const bufView = new Uint8Array(ab);
        for(let i=0, bytesLen=bufView.byteLength; i<bytesLen;i++){
            str += String.fromCharCode(bufView[i]);
        }
        return str;
    }catch{
        console.error('Error converting to Type String from ArrayBuffer')
    }
}

function storeInputs(){
    const incomeTable = document.getElementById('income_streams');
    const accountTable = document.getElementById('financial_accounts');
    const storageObj = {data:[{}], documents:[]};
    for(input of finForm.getElementsByClassName('form-input')){
        storageObj.data[0][input.id] = input.value;
    }for(column of incomeTable.children){
        const cacheArr = [];
        for(input of column.children){
            cacheArr.push(input.value);
        }
        storageObj.data[0][column.id] = cacheArr;
    }for(column of accountTable.children){
        const cacheArr = [];
        for(input of column.children){
            cacheArr.push(input.value);
        }
        storageObj.data[0][column.id] = cacheArr;
    }
    const docSelectElement = document.getElementById('document_select');
    for(const [index, entry] of Object.entries(docDataObject)){
        
        console.log(entry)
        console.log(index)
        entry.name = docSelectElement.options[parseInt(index)+1].innerText;
        console.log(entry)
        const tempObj = {}
        tempObj[index] = entry
        storageObj.documents.push(tempObj);
        
    }console.log(storageObj);
    return storageObj;
}
const operations = window.crypto.subtle || window.crypto.webkitSubtle;        

async function newCryptoKey(){
    passkeyError.hidden = true;
    //key material must be 16, 24 or 32 bytes
    const key = passkeyInput.value;
    if(7 < key.length){ 
        if(key.length < 33){
            const keyEnc = encoderUTF8.encode(key.padStart(16, key).slice(0, 16));
            const newKey = await operations.importKey(
                'raw', 
                keyEnc,
                { name: 'AES-GCM' },
                true,
                ['encrypt', 'decrypt']);
                return newKey; 
        }else{
            const keyEnc = encoderUTF8.encode(key.slice(0, 32));
            const newKey = await operations.importKey(
                'raw', 
                keyEnc,
                { name: 'AES-GCM' },
                true,
                ['encrypt', 'decrypt']);
                return newKey;
        }
    }else{
        passkeyError.firstElementChild.innerHTML = 'Must be 8 or more characters';
        passkeyError.hidden = false;
    }
}
async function encryptToString(content, cryptKey){
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
    const content = await storeInputs();
    console.log(content);
    const contentEncoded = encoderUTF8.encode(JSON.stringify(content));
    const encrypted = await encryptToString(contentEncoded, cryptoKey);
    const file = new Blob([encrypted], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
    if(newEncName.value.length > 1){
        link.download = newEncName.value;
        link.click();
    }else{
        link.download = "finance-tracker.txt";
        link.click();
    }
    URL.revokeObjectURL(link.href);       
};

const fileReader = new FileReader();
const fileField = document.getElementById('encrypted_file');
const fileFieldLabel = fileField.labels[0];

fileField.addEventListener('change', function() {
    try{
        //check if matches previous password input
        if(!fileField.disabled){
            fileFieldLabel.innerHTML = fileField.files[0].name;
            fileReader.readAsText(this.files[0]);
            fileField.value = null;
        }
    }catch{
        console.log('No File');
        fileFieldLabel.innerHTML = 'Upload Save';
    }
});

fileReader.onloadend = async function(){  
    const fileJSON = JSON.parse(fileReader.result);
    //key material must be 16, 24 or 32 bytes 
    const cryptoKey = await newCryptoKey();               
    const iv = new Uint8Array(Object.values(fileJSON.iv));
    const encryptedData = await str2ab(fileJSON.content);
    try{  
        const decryptedData = await operations.decrypt(
        { name: 'AES-GCM', iv: iv },
            cryptoKey,
            encryptedData
        );
        const decodedData = decoderUTF8.decode(decryptedData);
        console.log(JSON.parse(decodedData))
        formDisplayUpdate(JSON.parse(decodedData));
    }catch{
        fileFieldLabel.innerHTML = "Upload Save"
        console.error("Passkey is Incorrect");
    }
}

passkeyInput.addEventListener('change', ()=>{
    if(passkeyInput.value.length < 8){
        fileFieldLabel.style.cursor = 'not-allowed';
        fileFieldLabel.style.pointerEvents = 'none';
    }else{
        fileFieldLabel.style.pointerEvents = 'auto';
        fileFieldLabel.style.cursor = 'pointer';
    }
});