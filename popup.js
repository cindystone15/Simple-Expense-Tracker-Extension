let total = 0;  
let entries = [];


document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add');
  const amountInput = document.getElementById('amount');
  const descInput = document.getElementById('desc');
  const totalDisplay = document.getElementById('total');
  const allDataBtn = document.getElementById('allData');
  const divList = document.querySelector(".listHolder");
  const ul = divList.querySelector('ul');

  loadEntries();

  addBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const description = descInput.value.trim();

    if (!isNaN(amount) && description !== '') {
      total += amount;
      totalDisplay.textContent = total.toFixed(2);

      entries.push({description, amount});

      amountInput.value = '';
      descInput.value = '';
      saveEntries(entries);
      updateList();

    }
    else{
      alert("please enter valid description");
    }
  });

  



  function saveEntries(entries){
    chrome.storage.local.set({expenses: entries}) .then(()=>{
        console.log('entries set');
      });
  };

  function loadEntries() {
  chrome.storage.local.get(['expenses'], (result) => {
    if (result.expenses) {
      entries = result.expenses;
      total = entries.reduce((sum, e) => sum + e.amount, 0);
      totalDisplay.textContent = total.toFixed(2);
      updateList();
    } else {
      console.log('No previous entries found.');
    }
  });
}


  function updateList(){
    ul.innerHTML ='';
    entries.forEach((entry, index)=>{
      const li = document.createElement('li');
      li.textContent = `${entry.description}: ${entry.amount.toFixed(2)} PLN`;


      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.style.marginLeft = '10px';
      // delBtn.style.width = '40%';
      // delBtn.style.padding = '5px'; 
      delBtn.addEventListener('click',()=>{
          entries.splice(index, 1);

          total = entries.reduce((sum,e)=> sum +e.amount,0);
          totalDisplay.textContent = total.toFixed(2);

          saveEntries(entries);
          updateList();
      });


      li.appendChild(delBtn);
      ul.appendChild(li);
    });
    
  }


  function toggleDiv(divId){
      const div = document.getElementById(divId);
      div.style.display = (div.style.display === "none" || div.style.display === "") ? "block" : "none"; // remember same same as if else statement
  }

  allDataBtn.addEventListener('click', () =>{
    updateList();
    toggleDiv('listHolder');
  });
});
