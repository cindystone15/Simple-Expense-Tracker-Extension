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

  function updateList(){
    ul.innerHTML ='';
    entries.forEach(entry=>{
      const li = document.createElement('li');
      li.textContent = `${entry.description}: ${entry.amount.toFixed(2)} PLN`;
      ul.appendChild(li);
    });
  }

  allDataBtn.addEventListener('click', () =>{
    updateList();
  });
});
