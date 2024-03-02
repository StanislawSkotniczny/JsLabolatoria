function Oblicz(){

    let value1 = parseFloat(document.getElementById('value1').value) || 0;
    let value2 = parseFloat(document.getElementById('value2').value) || 0;
    let value3 = parseFloat(document.getElementById('value3').value) || 0;
    let value4 = parseFloat(document.getElementById('value4').value) || 0;
    
    const sum = value1 + value2 + value3 + value4;
    const average = sum/4
    const min = Math.min(value1, value2, value3, value4);
    const max = Math.max(value1, value2, value3, value4); 


    document.getElementById('result').innerHTML =`
    
        Suma: ${sum}<br>
        Srednia ${average}<br>
        Min ${min}<br>
        Max ${max}

    `;
}


document.getElementById('value1').addEventListener('input',Oblicz);
document.getElementById('value2').addEventListener('input',Oblicz);
document.getElementById('value3').addEventListener('input',Oblicz);
document.getElementById('value4').addEventListener('input',Oblicz);