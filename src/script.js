const audio = {
  id: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
  src1: [
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  ],
  src2: [
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  ],
  text1: [
    "Heater 1",
    "Heater 2",
    "Heater 3",
    "Heater 4",
    "Heater 6",
    "Dsc Oh",
    "Kick n Hat",
    "RP4 KICK 1",
    "Cev H2"
  ],
  text2: [
    "Chord 1",
    "Chord 2",
    "Chord 3",
    "Give us a light",
    "Dry Ohh",
    "Bld H1",
    "punchy kick 1",
    "side stick 1",
    "Brk Snr"
  ]
};
const Button = props => {
  return (
    <button
      onClick={props.play}
      id={props.id}
      className="drum-pad"
      accessKey={props.text}
    >
      {props.text}
      <audio id={props.text} className="clip" src={props.src} />
    </button>
  );
};
const Input = props => {
  return (
    <label>
      {props.text + " "}
      {props.type == "range" ? (
        <input
          className="range"
          type="range"
          onClick={props.change}
          min="0"
          max="100"
          step="5"
          value={props.value}
        />
      ) : (
        <input
          className="checkbox-hide"
          type={props.type}
          onClick={props.change}
        />
      )}
      {props.type == "checkbox" && <span className="checkbox" />}
    </label>
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: audio.src1,
      text: audio.text1,
      clip: "",
      turnedOn: true,
      volume: 50,
      h1Style: "drum-kit"
    };
    this.handleSrc = this.handleSrc.bind(this);
    this.play = this.play.bind(this);
    this.kl = this.kl.bind(this);
    this.handleTurn = this.handleTurn.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }
  handleSrc(e) {
    let { src1: src, text1: text } = audio;
    let clip = "Drum Kit";
    if (this.state.src == src) {
      src = audio.src2;
      text = audio.text2;
      clip = "Piano Kit";
    }
    this.setState({
      src: src,
      text: text,
      clip: clip,
      h1Style: clip.toLowerCase().replace(" ", "-")
    });
  }
  play(e) {
    if (e.type == "click") {
      e = e.target.getAttribute("accessKey");
    }
    this.setState({
      clip: this.state.text[audio.id.indexOf(e)]
    });
    let sound = document.querySelector("#" + e);
    if (this.state.turnedOn) {
      sound.play();
      sound.volume = this.state.volume / 100;
      let button = document.querySelector("#" + e).parentNode;
      button.classList.add("clicked");
      setTimeout(function() {
        button.classList.remove("clicked");
      }, 1000);
    }
  }
  kl(e) {
    if (e.key) {
      var a = e.key.toUpperCase();
      if (audio.id.indexOf(a) != -1) {
        this.play(a);
      }
    }
  }
  handleTurn(e) {
    this.setState({
      clip: "",
      turnedOn: !this.state.turnedOn
    });
  }
  changeVolume(e) {
    this.setState({
      volume: e.target.value
    });
  }
  componentDidMount() {
    addEventListener("keydown", this.kl);
  }
  componentWillUnmount() {
    removeEventListener("keydown", this.kl);
  }
  render() {
    let buttons = [];
    for (let i = 0; i < audio.id.length; i++) {
      buttons.push(
        <Button
          play={this.play}
          id={this.state.text[i].replace(/\s/g, "-")}
          src={this.state.src[i]}
          text={audio.id[i]}
          key={audio.id[i]}
        />
      );
    }
    return (
      <div id="drum-machine">
        <h1 className={this.state.h1Style}>Drum machine</h1>
        <div className="drum">{buttons}</div>
        <div id="display">
          <span className={this.state.clip ? "full" : "empty"}>
            {this.state.clip}
          </span>
          <Input type="checkbox" change={this.handleSrc} text="Toggle Kit" />
          <Input
            type="range"
            change={this.changeVolume}
            value={this.state.value}
            text="Volume"
          />
          <Input
            type="checkbox"
            change={this.handleTurn}
            text={this.state.turnedOn ? "On" : "Off"}
          />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
