import React from "react";
import Image from "./components/Image";
import API from "./utils/API";
import "../src/components/style.css";




class App extends React.Component {
    state = {
        score: 0,
        images:[],
        images_clicked:[],
        searchterm:""
    }

    clickme = (id) => {
        if (this.state.images_clicked.indexOf(id)===-1) {
            //image doesn't exist
            this.setState({
                score:this.state.score + 1,
                images_clicked: [...this.state.images_clicked, id],
                images: this.state.images.sort(() => Math.random() - 0.5)
            })

        } else {
            this.setState({
                score: 0,
                images_clicked: [],
                images: this.state.images.sort( () => Math.random() - 0.5)
            })
        }

    }

    searchGiphy = (event) => {
        let value = event.target.value.trim();
        this.setState({
            searchterm: value
        });
        API.search(this.state.searchterm)
        .then(res=>{
            console.log(res)
            this.setState({
                images: res.data.data,
                search_term: ""
            })
        })

    }
    render() {
        return (
            <div className="main">
                <div className="instructions">Enter a Word to Search the Giphy API</div>
                <div className="score">Score: {this.state.score}</div>
                {/* <div>{this.state.searchterm}</div> */}
                <div className="inputBox">
                    <input className="searchBox" type="text" value={this.state.searchterm} onChange={this.searchGiphy} />
                </div>

                {this.state.images.map( (img) => ( 
                    <Image id={img.id} alt={img.slug} src={img.images.fixed_height_still.url} key={img.id} clickme={this.clickme} /> )
                )}
            </div>
        )
    }
}

export default App;