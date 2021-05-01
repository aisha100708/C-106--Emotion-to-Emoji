Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach("camera");
function capture() {
    Webcam.snap(function(data_url) {
        document.getElementById("result").innerHTML = "<img id='new_image' src='"+data_url+"'>";
    });
}
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kj2G-fJDo/model.json", model_loaded);
function model_loaded() {
    console.log("Model Loaded!");
}
prediction_1 = "";
prediction_2 = "";
function speak() {
    var synth = window.speechSynthesis;
    prediction_1 = "The 1st prediction is " + prediction_1;
    prediction_2 = "The 2nd prediction is " + prediction_2;
    var utterance = new SpeechSynthesisUtterance(prediction_1 + prediction_2);
    synth.speak(utterance);
}
//speak();
function identify() {
    new_image = document.getElementById("new_image");
    classifier.classify(new_image, getResult);
}
function getResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        document.getElementById("emotion_name1").innerHTML = prediction_1;
        document.getElementById("emotion_name2").innerHTML = prediction_2;
        if (prediction_1 == "Happy") {
            document.getElementById("emotion_symbol1").innerHTML = "&#128512;";
        }
        else if (prediction_1 == "Sad") {
            document.getElementById("emotion_symbol1").innerHTML = "&#128532;";
        }
        else if (prediction_1 == "Angry") {
            document.getElementById("emotion_symbol1").innerHTML = "&#128545;";
        }
        if (prediction_2 == "Happy") {
            document.getElementById("emotion_symbol2").innerHTML = "&#128512;";
        }
        else if (prediction_2 == "Sad") {
            document.getElementById("emotion_symbol2").innerHTML = "&#128532;";
        }
        else if (prediction_2 == "Angry") {
            document.getElementById("emotion_symbol2").innerHTML = "&#128545;";
        }
        speak();        
    }
}