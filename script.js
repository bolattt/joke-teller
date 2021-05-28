const key = "73660cd5155e4b738ea1505d094e1af4";
const button = document.getElementById("button");
const audoioElement = document.getElementById("audio");

// Disable / Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "73660cd5155e4b738ea1505d094e1af4",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
  console.log("tell me: ", joke);
}

// Get jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiURL = "https://v2.jokeapi.dev/joke/Any";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // Catch errors here
    console.log(error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audoioElement.addEventListener("ended", toggleButton);
