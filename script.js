const button = document.getElementById('btn-1');
const hydrogen = document.getElementById('mill');
const diesel = document.getElementById('model');
const milleage = document.getElementById('use')
const progress = document.getElementById('progress')
const result = document.getElementById('result')
progress.style.display = 'none'

let inputState = [false, false, false]

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}
const validateinputs = (hydrogenValue, dieselValue, milleageValue) => {

    if (dieselValue === '') {
        setError(diesel, 'diesel is required');

    
    }else if (dieselValue < 0 ) {
        setError(diesel, 'diesel cannot accept a negative input');
    

    }else if (dieselValue === '/^[A-Za-z]+$/') {
    setError(diesel, 'diesel cannot accept an alphabet');
    }
    else {
        setSuccess(diesel)
        inputState[0] = true
    }

    if (hydrogenValue === ''){
        setError(hydrogen, 'hydrogen is required')
        
    }else if (hydrogenValue < 0 ) {
        setError(hydrogen, 'hydrogen cannot accept a negative input');
    

    }else if (hydrogenValue === '/^[A-Za-z]+$/') {
    setError(hydrogen, 'hydrogen cannot accept an alphabet');
    }
    else{
        setSuccess(hydrogen)
        inputState[1] = true
    }
    if (milleageValue === ''){
        setError(milleage, 'milleage is required')

    }
    else if (milleageValue < 0 ) {
        setError(milleage, 'millage cannot accept a negative input');
    

    }else if (milleageValue === '/^[A-Za-z]+$/') {
    setError(milleage, 'millage cannot accept an alphabet');
    }else {
        setSuccess(milleage)
        inputState[2] = true
    }

    if (inputState.includes(false)){
        return false
    } else{
        return true
    }
    
}
const calculate = async () =>{
    const hydrogenValue = hydrogen.value.trim();
    const dieselValue =  diesel.value.trim();
    const milleageValue = milleage.value.trim();
    if (validateinputs(hydrogenValue, dieselValue, milleageValue)){
        const params = {
            method: 'POST',
            body: JSON.stringify({
                diesel: dieselValue,
                hydrogen: hydrogenValue,
                annual: milleageValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{  
            progress.style.display = 'block'
            const response = await fetch('https://micro-energy.onrender.com/api/calc/', params);
            const responseData = await response.json();
            // progress.style.display = 'none'
            result.innerHTML = `Carbon saved is ${responseData.carbonsavings}Kg`
        } catch(err){
            alert(err)
        } finally{
            progress.style.display = 'none'
        }
    } 
    // else{
    //     alert('some fields are empty')
    // }
    
    
}

button.addEventListener('click', calculate);
