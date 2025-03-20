var isTalking = false;
var isPaused = false;

function speak(whatToSay) { 
  var msg = new SpeechSynthesisUtterance();
  msg.text = whatToSay;
  //msg.lang = 'en-US';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 2; //0 to 2
   msg.onend = function(e) {
    document.querySelector('#output').innerText = (event.elapsedTime/1000) + ' Sek';
  };
  isTalking = true;
  speechSynthesis.speak(msg);
  return new Promise((resolve, reject) => {
    msg.onend = () => {resolve()}
  })
}

 function stopReading() { 
  if(!isTalking) return;
  speechSynthesis.cancel();
  isTalking = false;
  isPaused = false;
}

function pauseOrResumeReading(){
  if(!isTalking) return;
  if(isPaused){
    document.querySelector('#output').innerText = "Und weiter";
    speechSynthesis.resume();
  }
  else{
    document.querySelector('#output').innerText = "Pausiert";
    speechSynthesis.pause();
  }
  isPaused = !isPaused;
}

const weekdays = {"Mo": "Montag", "Di": "Dienstag", 
  "Mi": "Mittwoch", "Do": "Donnerstag", "Fr": "Freitag",
  "Sa": "Samstag", "So": "Sonntag"
};
const nWords = ["ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"];

function howMany(i){
  if(i<11) return `${nWords[i-1]}mal`;
  return `${i}-mal`;
};

async function extractDishes(){
  document.getElementById("Dishes").setAttribute("disabled", "disabled");
  document.getElementById("Pause").removeAttribute("disabled");
  isTalking = true;
  isPaused = false;
  let filetext = `{"1": {"dayOfWeek": "Mo", "date": "17.03.2025", "number": "M5", "description": "Maultaschen (vegetarisch)", "amount": "2", "price": "19,00 \u20ac"}, "2": {"dayOfWeek": "Di", "date": "18.03.2025", "number": "M4", "description": "Klassischer Sauerbraten", "amount": "1", "price": "11,80 \u20ac"}, "3": {"dayOfWeek": "Di", "date": "18.03.2025", "number": "M2", "description": "Schweinegulasch", "amount": "1", "price": "10,50 \u20ac"}, "4": {"dayOfWeek": "Mi", "date": "19.03.2025", "number": "M2", "description": "Bratwurst", "amount": "2", "price": "21,00 \u20ac"}, "5": {"dayOfWeek": "Do", "date": "20.03.2025", "number": "M8", "description": "Germkn\u00f6del", "amount": "1", "price": "9,40 \u20ac"}, "6": {"dayOfWeek": "Do", "date": "20.03.2025", "number": "M6", "description": "Deftiger Erbseneintopf", "amount": "1", "price": "9,40 \u20ac"}, "7": {"dayOfWeek": "Fr", "date": "21.03.2025", "number": "M2", "description": "Gekochte Eier", "amount": "2", "price": "21,00 \u20ac"}}`
  var info = JSON.parse(filetext);
  
  for ( let x in info){
    s = info[x]
    let formattedText = `${weekdays[s["dayOfWeek"]]}: ${s["description"]} `+
      ` ${howMany(s["amount"])}.`;
    try{
      if(!isPaused && isTalking){
        await speak(formattedText);
      }
    }
    catch(error){
      console.log(formattedText);
    }
  }
  document.getElementById("Dishes").removeAttribute("disabled");
  document.getElementById("Pause").setAttribute("disabled", "disabled");
}