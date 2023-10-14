const button = document.getElementById('btn-1');
const hydrogen = document.getElementById('mill');
const diesel = document.getElementById('model');
const milleage = document.getElementById('use')
const progress = document.getElementById('progress')
const result = document.getElementById('result')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const username = document.getElementById('username')
const pass1 = document.getElementById('pass1')
const pass2 = document.getElementById('pass2')
const btn = document.getElementById('btn-2')
const butt = document.getElementById('btn-3')



progress.style.display = 'none'



let inputState = [false, false, false]
let isValid = true;


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

const validate = ( lastValue, firstValue, email, username, pass1) => {


 if (lastValue < 3){
        setError(lname, 'Name must be at least 3 characters.');

    }else{
        setSuccess(lname)
    }

    if (firstValue < 3){
        setError(fname, 'Name must be at least 3 characters.');

    }else{
        setSuccess(fname)
    }

    // if (!username.includes())

    if (!email.includes("@")) {
        setError(email, 'Invalid email address');
    }else{
        setSuccess(email)
    }

    if (password.length < 8) {
       setError(pass1, 'Password must be at least 8 characters');
    }else{
        setSuccess(pass1)
    }
    return isValid;
}


const validateinputs = (hydrogenValue, dieselValue, milleageValue,) => {

   
    

    if (dieselValue === '') {
        setError(diesel, 'Numerical value for diesel is required');

    
    }else if (dieselValue < 0 ) {
        setError(diesel, 'diesel cannot accept a negative input'); 
    

    }else {
        setSuccess(diesel)
        inputState[0] = true
    }

    if (hydrogenValue === ''){
        setError(hydrogen, 'Numerical value for hydrogen is required')
        
    }else if (hydrogenValue < 0 ) {
        setError(hydrogen, 'hydrogen cannot accept a negative input');
    }else{
        setSuccess(hydrogen)
        inputState[1] = true
    }
    if (milleageValue === ''){
        setError(milleage, 'Numerical value for milleage is required')

    }
    else if (milleageValue < 0 ) {
        setError(milleage, 'millage cannot accept a negative input');
    
    }else {
        setSuccess(milleage)
        inputState[2] = true
    }
    console.log(inputState)

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
            result.innerHTML = `Carbon saved is ${responseData.carbonsavings}kg`
           
        } catch(err){
            alert(err)
        } finally{
            progress.style.display = 'none'
            inputState = [false, false, false]
        }
    } 
    // else{
    //     alert('some fields are empty')
    // }
    
    
}

button.addEventListener('click', calculate);
