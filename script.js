var list = document.querySelector('.lists');
var box = document.querySelector('.container');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var page = document.querySelector('.page');

var todos = [];
var pageNo = 1;

async function getData(){
  try{
    let res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    let data = res.json();
    return data;
  }
  catch(err){
    console.log("Error occured while fetching data!!", err);
  }
} 


function getRowData(status, title){
  const statusdiv = document.createElement('div');
  const divtext = document.createElement('div');
  const row = document.createElement('div');
  divtext.innerText = title;

  if(status){
    statusdiv.innerText = "✅";
  }
  else statusdiv.innerText = "❌";

  row.appendChild(statusdiv);
  row.appendChild(divtext);

  row.classList.add('titles-tab');
  statusdiv.classList.add('status');
  divtext.classList.add('title');

  return row;
}

function resetTable(){
  var rows = document.querySelectorAll('.titles-tab');
  rows.forEach((row)=>{
    row.remove();
  });
}

function setData(para){
  resetTable();
  para.forEach((par)=>{
    let row = getRowData(par.completed, par.title);
    list.appendChild(row);
  });
}

function setInitData(){
  let initData = todos.slice(0,10);
  setData(initData); 
}

getData().then((data)=>{
  todos = data;
  setInitData();
});

function handleNext(){
  pageNo++;
  if(pageNo > 20){
    pageNo = 20;
  }

  changePageNo();
}

function handlePrev(){
  pageNo--;
  if(pageNo < 1){
    pageNo = 1;
  }
  changePageNo();
}

function changePageNo(){
  let fetchData = todos.slice(pageNo*10-10, pageNo*10);
  setData(fetchData);
  
  let str = `${pageNo*10-9} - ${pageNo*10} of 200`;

  page.innerText = str;
}

prev.addEventListener("click", handlePrev);
next.addEventListener("click", handleNext);

