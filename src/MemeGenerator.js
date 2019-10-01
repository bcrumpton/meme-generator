import React, { useState, useEffect } from "react";

function MemeGenerator(props) {
  const [formValues, setFormValues] = useState({
    topText: "",
    bottomText: ""
  });
  const [randomImage, setRandomImage] = useState({
    src: "",
    alt: ""
  });
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // An effect runs, by default, on every render.
    // You can dictate when the effect runs based on the dependency array,
    // which is passed after the effect function as the second argument to
    // useEffect. Any variable in the dependency array tells the component
    // that this useEffect hook should only be called when that variable
    // changes. So if you only want a side effect to run on the first render,
    // (when the component initially mounts), you would pass an empty array.
    // to indicate no dependency change should trigger this effect. This
    // is similar to `componentDidMount`, so in the same way you would call
    // side effects like subscriptions and data fetch requests in
    // componentDidMount, you would call them in useEffect if you're using
    // hooks.
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        setMemes(response.data.memes);
      })

    // If you are calling a subscription function that needs to be cleared,
    // liken a setTimeout, remember you have to clean those up typically in
    // componentWillUnmount in your class components. With hooks, you tell
    // the effect to clean up by returning a function in that same effect.
    // In this instance, we don't need a clean up, but if we did we would just
    // do something like this:
    return () => {
      // window.clearTimeout(...);
    };
  }, []); // <<<< empty dependency array: only fetch on the first render!

  // Let's use a second effect that runs any time the `memes` array changes,
  // that way we can get a random image after the initial fetch is done.
  // This could also come in handy if you had another action elsewhere in
  // the app that fetched from a different source, for example.
  useEffect(() => {
    if (memes && memes.length) {
      swapYoImage();
    }
  }, [memes]); // this effect changes only when the `memes` change!

  function swapYoImage() {
    const randNum = Math.floor(Math.random() * memes.length);
    const src = memes[randNum].url;
    const alt = memes[randNum].name;
    setRandomImage({ src, alt });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    swapYoImage();
  }

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Top Text"
          name="topText"
          value={formValues.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          value={formValues.bottomText}
          onChange={handleChange}
        />
        <button>Generate!</button>
      </form>
      <div className="meme">
        <img src={randomImage.src} alt={randomImage.alt} />
        <h2 className="top">{formValues.topText}</h2>
        <h2 className="bottom">{formValues.bottomText}</h2>
      </div>
    </div>
  );
}

export default MemeGenerator;
