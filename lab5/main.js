const asyncAdd = async (a,b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 100)
  })
}

const addAsyncNumbers = async (a, b) => {
  try {
    const result = await asyncAdd(a, b);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}


const addMultipleAsync = async (...numbers) => {
  if (numbers.length === 0) {
    return Promise.resolve(0);
  }
  
  if (!numbers.every(num => typeof num === 'number')) {
    return Promise.reject('Wszystkie argumenty muszą mieć typ number!');
  }
  
  let sum = 0;

  for (const num of numbers) {
    sum = await asyncAdd(sum, num);
  }

  return sum;
};

const measureExecutionTime = async (func, ...args) => {
  const startTime = performance.now();

  const result = await func(...args);

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return { result, executionTime };
};

measureExecutionTime(addAsyncNumbers,5,7).then(({result, executionTime}) =>{
  console.log(`Wynik: ${result}`);           
  console.log(`Czas wykonania: ${executionTime} ms`);  
}).catch(error => {
  console.error(`Błąd: ${error}`);
});

measureExecutionTime(addMultipleAsync, 1, 2, 3, 4, 5).then(({ result, executionTime }) => {
  console.log(`Wynik: ${result}`);           
  console.log(`Czas wykonania: ${executionTime} ms`);  
}).catch(error => {
  console.error(`Błąd: ${error}`);
});
