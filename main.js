prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 337,
    height: 292,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function take_photo() {
    Webcam.snap(function (hello) {
        document.getElementById("result").innerHTML = "<img src='" + hello + "' id='snapshot'>";
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/upw-JLK49/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model Loaded");
}

function check() {
    image1 = document.getElementById("snapshot");
    classifier.classify(image1, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        document.getElementById("emotion_name_id").innerHTML = results[0].label;
        document.getElementById("emotion_name_id2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speaking();
        
        if(results[0].label == "Happy"){
            document.getElementById("emoji_id").innerHTML = "&#128512;";
        }
        else if(results[0].label == "Angry"){
            document.getElementById("emoji_id").innerHTML = "&#128544;";
        }
        else if(results[0].label == "Crying"){
            document.getElementById("emoji_id").innerHTML = "&#128557;";
        }
        else if(results[0].label == "Shock"){
            document.getElementById("emoji_id").innerHTML = "&#128561";
        }

        if(results[1].label == "Happy"){
            document.getElementById("emoji_id2").innerHTML = "&#128512;";
        }
        else if(results[1].label == "Angry"){
            document.getElementById("emoji_id2").innerHTML = "&#128544;";
        }
        else if(results[1].label == "Crying"){
            document.getElementById("emoji_id2").innerHTML = "&#128557;";
        }
        else if(results[1].label == "Shock"){
            document.getElementById("emoji_id2").innerHTML = "&#128561";
        }
    }

}

function speaking(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "And the second prediction is " + prediction_2;
    utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utter_this); 
}
