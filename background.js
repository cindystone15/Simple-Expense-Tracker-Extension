// chrome.runtime.onInstalled.addListener(()=>{
//     chrome.alarms.create('weeklyReset', {periodInMinutes:10080}); //7days
// });

// chrome.alarms.onAlarm.addListener((alarm)=>{
//     if(alarm.name === 'weeklyReset'){
//         chrome.storage.local.get(['expenses'], (result)=>{
//             const expenses = result.expenses || [];
//             const total = expenses.reduce((acc, e)=> acc +parseFloat(e.amount),0);

//             // storing weekly

//             const summary = {
//                 timestamp: new Date().toISOString(),
//                 total
//             };

//             chrome.storage.local.get(['history'], (res)=>{
//                 const history = res.history ||[];
//                 history.push(summary);
//                 chrome.storage.local.set({history, expenses: []});
//                 console.log("Loaded expenses:", expenses);

//             });
//         });

// }
// });