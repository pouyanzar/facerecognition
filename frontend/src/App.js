import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useState } from "react";
import particlesOptions from "./particlesOptions.json";
import Register from "./components/Register/Register";

function App() {
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  const onInputChange = (event) => {
    setState(event.target.value);
  };
  const onSubmit = () => {
    setImageUrl(state);
    fetch("https://stark-woodland-65536.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch("https://stark-woodland-65536.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => setUser(Object.assign(user, { entries: count })))
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(data));
      })
      .catch((error) =>
        console.log(
          "Error: it seems clarifai server doesn't responding!",
          error
        )
      );
  };
  //The functions below, load particles component on the DOM
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const calculateFaceLocation = (data) => {
    console.log("data:", data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace.bottom_row);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
    console.log(box);
  };
  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setState("");
      setImageUrl("");
      setBox({});
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
    }
    if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };
  return (
    <div className="App">
      {/* adds motion backgroung */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
