prediction_1 = "";
prediction_2 = "";
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
function speak() {
    var synth = window.speechSynthesis;
    prediction_1 = "The 1st prediction is " + prediction_1;
    prediction_2 = "The 2nd prediction is " + prediction_2;
    var utterance = new SpeechSynthesisUtterance(prediction_1 + prediction_2);
    synth.speak(utterance);
}
speak();