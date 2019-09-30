import React, {Component} from 'react';

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        console.log(memes)
        this.setState({
          allMemeImgs: memes
        })
      })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  
  handleSubmit(event) {
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMemeImg = this.state.allMemeImgs[randNum].url
    const randMemeAlt = this.state.allMemeImgs[randNum].name
    this.setState({
      randomImg: randMemeImg,
      randomAlt: randMemeAlt
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Top Text"
            name="topText"
            value={this.state.topText} 
            onChange={this.handleChange}
          />
          <input 
            type="text" 
            placeholder="Bottom Text"
            name="bottomText" 
            value={this.state.bottomText} 
            onChange={this.handleChange}
          />
          <button>Generate!</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt={this.state.randomAlt}/>
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator