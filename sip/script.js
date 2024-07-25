
const fruits = ["Banana", "Orange", "Apple"];
fruits.push("Lemon"); 
console.log(fruits);
console.log(fruits.at(-2));


//operators


let returnRecieved=restOperator(1,2,3,4,5,6,7);
function restOperator(...fruits){
    console.log(fruits);
}



const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6,7,9];
const numbersCombined = [...numbersOne, ...numbersTwo];
console.log(numbersCombined);


console.log('hello');
console.log('Hi');

  const fetchData=callback=>{
    setTimeout(()=>{
     callback('Done')
    },2000)
  }

  setTimeout(()=>{
    console.log('Timer is done');
    fetchData(text=>{
      console.log(text);
    })
  },2500)


  const fetchDataAsync = async ()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('Done');
        },2000);
    });
};

const main=async()=>{
    //Wait for 2500 milliseconds
    let a=await new Promise((resolve)=>setTimeout(resolve,0));
    console.log(a);
    //Log 'Timer is done'to the console
    console.log('Timer is done');
    //Call fetchDataAsync and wait for the result
    const result=await fetchDataAsync();
    //Log the result to the console
    console.log(result,'result');
}
//Call the main function
main();