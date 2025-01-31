const texts = document.querySelector(".texts");
const mic_btn = document.querySelector("#mic");
const playback = document.querySelector(".playback");
let can_record = false;
let is_recording = false 

    mic_btn.addEventListener('click', ToggleMic);

    function ToggleMic(){
      fetch('/micClick', {
                method: 'POST'
            })
    };


    document.addEventListener('DOMContentLoaded', function() {
      async function SetupAudio(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        await navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then((result) =>{
                can_record = true;
                
            })
            .catch(err => {
                console.error(err)
            });
    }
    console.log(can_record);

      }
        SetupAudio()
    });


    function ToggleMic(){
    if(!can_record) return;

    is_recording = !is_recording;

    if(is_recording){
        console.log("start");
        mic_btn.classList.add("is-recording");
        recognition.start();
        //speak();
        transcibe();
    }else{
        recognition.stop();
        console.log(content)

        console.log("end");
        mic_btn.classList.remove("is-recording");
        let words = content;
        content = "";
        // chatConvo(words, chain).then(() => convo()); // Call convo again to ask for the next input

    }

    }

    function transcibe(){
  
        recognition.addEventListener("result", (e) => {
            texts.appendChild(p);
            content = Array.from(e.results)
              .map((result) => result[0])
              .map((result) => result.transcript)
              .join("");
            p.innerText = content;
            if (e.results[0].isFinal) {
          
            }
          });
      
    }