import Line from "./components/Line";
import ThemeButtons from "./components/ThemeButtons";

let children = [{key: 1, time: "00:00:00"}];

const App = () => {

  const childElems = children.map((val) => {
    return (
      <Line id={`line${val.key}`} tsName={`timestamp${val.key}`} time={val.time} entryName={`entry${val.key}`} trashName={`trash${val.key}`} trashClick={() => deleteRow(val.key)} />
    );
  });

// NOTES:
// fix exporting (notes in function)

  return(
    <div id="htmlBody">
      <ThemeButtons id="themeBtn" onClick={toggleTheme} />
      <div id="head">
        <p id="title">eton</p>
        <p id="subtitle">time oriented note-taking.</p>
        <p id="description">Whether you're taking notes on a video, lecture, or other, <b>eton</b> organizes them with time.<br/>
          Press TAB to start and add a new row.
        </p>
      </div>
      <div id="container">
        {childElems}
        <div id="buttons">
          {/* <button id="csvBtn" onClick={createCSV}>Export to .csv</button> */}
          <button id="txtBtn" onClick={createTXT}>Export to .txt</button>
        </div>
      </div>

    </div>
  )
}

let i:number = 0;
let timeSet:number;
const timerStart = new CustomEvent('timerStarted');
const updateBody = new CustomEvent('updateBody');

function msToFormat(ms:number){
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  let hours:string = Math.floor(ms / hour % 24).toString();
  let minutes:string = Math.floor(ms / minute % 60).toString();
  let seconds:string = Math.floor(ms / second % 60).toString();

  return hours.padStart(2, "0") + ':' + minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
}

async function newRow() {
  i += 1;
  let currentTime = msToFormat(Date.now() - timeSet);

  children.push({key: i, time: currentTime})
  console.log(i, `timestamp${i}`, currentTime);
  document.getElementById("htmlBody")!.scrollTop = document.getElementById("container")!.scrollHeight + 200;

  document.dispatchEvent(updateBody);

  return setTimeout(()=>{ document.getElementById(`entry${i}`)?.focus(); }, 1);
}

function deleteRow(index:number) {
  document.getElementById(`line${index}`)!.remove();
}


//                    THEMES


function setTheme(themeName:string) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
  if(themeName === "theme-dark") {
    document.getElementById("nightIcon")!.style.opacity = "1";
    document.getElementById("sunIcon")!.style.opacity = "0";
  } else {
    document.getElementById("nightIcon")!.style.opacity = "0";
    document.getElementById("sunIcon")!.style.opacity = "1";
  }
}

function toggleTheme() {
 if (localStorage.getItem('theme') === 'theme-dark'){
     setTheme('theme-light');
 } else {
     setTheme('theme-dark');
 }
}

// Immediately invoked function to set the theme on initial load
function themeLoad() {
 if (localStorage.getItem('theme') === 'theme-light') {
     setTheme('theme-light');
 } else {
     setTheme('theme-dark');
 }
};
setTimeout(themeLoad, 10);


//                    EXPORTING


function createTXT() {
  let text:string = "";

  for(var k:number = 1; k <= i; k++){  
    if(!document.getElementById(`timestamp${k}`)) continue;

    text += document.getElementById(`timestamp${k}`)?.textContent + "\n";

    if(document.querySelectorAll(`#entry${k} > div`).length > 0){
      let entries = document.querySelectorAll(`#entry${k} > div`);
      entries.forEach(entry => {
        text += entry.innerHTML + "\n";
      });
    } else {
      text += document.getElementById(`entry${k}`)?.innerHTML + "\n";
    }

    text += "\n";
  }

  text = text.replaceAll("<br>", "");
  text = text.replaceAll("&nbsp;", " ");

  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', "eton-txt-download.txt");
  pom.style.display = 'none';
  document.body.appendChild(pom);
  pom.click();
  document.body.removeChild(pom);
}

// function createCSV() {
//   let text:string = "Timestamp,Text Entry\n";

//   for(var k:number = 1; k <= i; k++){ 
//     if(!document.getElementById(`timestamp${k}`)) continue;   
//     text += document.getElementById(`timestamp${k}`)?.textContent + ",";
    
//     let entries = document.querySelectorAll(`#entry${k} > div`);
//     entries.forEach(entry => {
//       text += `"${entry.innerHTML}"` + "\n";
//     });

//     text += "\n";
    
//   }

//   var pom = document.createElement('a');
//   pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//   pom.setAttribute('download', "eton-csv-download.csv");
//   pom.style.display = 'none';
//   document.body.appendChild(pom);
//   pom.click();
//   document.body.removeChild(pom);
// }


//                    EVENTS


document.addEventListener('timerStarted', e => {

  //changing header
  document.getElementById("head")!.style.top = "5em";
  document.getElementById("head")!.style.transform = "translate(-50%, 0%)";
  document.getElementById("subtitle")!.style.opacity = "0";
  document.getElementById("description")!.style.opacity = "0";

  setTimeout(() => {
    document.getElementById("container")!.style.opacity = "1";

    document.getElementById("subtitle")!.style.display = "none";
    document.getElementById("description")!.style.display = "none";
  }, 500);


  document.getElementById("container")!.style.display = "flex";
  document.getElementById("container")!.style.transition = "all 0.5s ease-in-out";

  timeSet = Date.now();
  document.getElementById(`entry1`)!.focus();
  return i += 1;
})

// document.addEventListener('focus', e => {
//   var elemID:string = document.activeElement!.id;
//   console.log(elemID);
//   if(elemID.includes("entry")) return document.getElementById(elemID)!.style.border = "solid 2px var(--secondary-color)";
// })

document.addEventListener("keydown", e => {
  if (e.key === "Tab") {
    e.preventDefault();
    if(i === 0) return document.dispatchEvent(timerStart);
  
    return newRow();
  }
})

export default App;