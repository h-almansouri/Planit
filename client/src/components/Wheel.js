import React from 'react';
import Card from './Card.js';

class Wheel extends React.Component {

    

    constructor(props) {
        super(props)
    
        this.state = {
            radius: 150,
            cards: [],
            theta: 0.0
        }

        this.temp_theta = 0.0;
        this.anim_id = null;
    }

    componentDidMount() {
        let center_of_wheel = {
            x: parseFloat(this.wheel.style.width) / 2,
            y: parseFloat(this.wheel.style.height) / 2
        }
        let temp_cards = [];

        const servers = this.props.array
        const setGroupId = this.props.setGroupId

        for (let i = 0; i < 8; i++) {
            temp_cards.push(
                <Card radius={this.state.radius} radian_interval={(Math.PI / 4) * i} center={center_of_wheel} key={`card_${i}`} server={servers[i]} setGroupId={setGroupId}/>
            );
        }

        this.setState({ cards: temp_cards });
    }



    handle_scroll = event => {
        clearTimeout(this.anim_id);
        this.wheel.style.transform = `translate(-50%, -50%) rotate(${this.temp_theta + (event.deltaY * 0.5)}deg)`;
        this.temp_theta += (event.deltaY * 0.5);

        this.anim_id = setTimeout(() => {
            this.setState({ theta: this.temp_theta });
        }, 150);
    }

    render() {
        return (
            <div onMouseEnter={() => this.props.blockScroll()} onMouseLeave={() => this.props.allowScroll()} onWheel={this.handle_scroll} ref={ref_id => this.wheel = ref_id} style={styles.wheel}>
                {this.state.cards}
            </div>
        )

    }
}

const styles = {
    wheel: {
        // margin: '0',
        marginTop: '300px',
        marginBottom: '270px',
        padding: '0',
        // top: '50%',
        left: '50%',
        position: 'relative',
        transform: 'translate(-50%, -50%)',
        height: '100px',
        width: '100px',
        backgroundColor: 'red',
        borderRadius: '50px'
    }
}

export default Wheel;