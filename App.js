import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Header, Title, Text, Button, Left, Right, Body, Container} from 'native-base';
import * as utils from './utils/';
import metrics from './device/metrics';

const baseFont = 'Avenir';

class Square extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Button
        style={{height: 100, width: 100, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 3, justifyContent: 'center'}}
        onPress={this.props.handleSelection}
        >
        <Text style={{color: 'red', fontSize: 28, fontFamily: baseFont, textAlign: 'center'}}>{this.props.value}</Text>
      </Button>
    )
  }
}

class Board extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      boxes: Array(9).fill(null),
      history: [],
      xIsNext: true
    }
  }

  // Handle restart
  handleBoardRestart = () => {
      this.setState({
          boxes: Array(9).fill(null),
          history: [],
          xIsNext: true
      })
  }

  // Handle click on boxes on the board.
   handleClick = (index) =>{
       // Get current boxes
       const boxes = this.state.boxes.slice()

       // Get current state game
       let history = this.state.history
       // Test
       console.log("The history ", history);

       // Return if winning combo found
       if (utils.findWinner(boxes) || boxes[index]) {
           return
       }
       // Return if board is full
       if(utils.isBoardFull(boxes) === true) {
           return
       }

       // Mark the box either 'x' or 'o'
       boxes[index] = this.state.xIsNext ? 'x' : 'o'

       // Add move to history
       history.push(this.state.xIsNext ? 'x' : 'o')
       // Test update
       console.log("The history ", history);

       // Update component state
       this.setState({
           boxes: boxes,
           history: history,
           xIsNext: !this.state.xIsNext
       })
   }

  // Game setup
  render(){
    const {boxes, history, xIsNext} = this.state;

    // Get winner (if there is any)
    const winner = utils.findWinner(boxes)

    // Check if moves available
    const isFilled = utils.isBoardFull(boxes)

    // Init status message
    let status

        if (winner) {
            // If winner, create winner status
            status = `The winner is: Player ${winner} !!`
        } else if(!winner && isFilled) {
            // Change status to draw
            status = 'Game drawn!'
        } else {
            // Advance player move
            status = `Player ${(xIsNext ? 'x' : 'o')}'s turn.`
        }


    return(
      <View style={styles.container}>

        <View style={styles.headerStyle}>
            <Title style={styles.titleHeader}>The Tic Tac Toe Dojo</Title>
        </View>

        <Header style={styles.subheader}>
          <Left>
            <Title style={styles.subtitleHeader}>{status}</Title>
          </Left>
        </Header>

        <Container style={styles.boardWrapper}>
          <View style={styles.board}>
            <View style={styles.row}>
              <Square value={boxes[0]} handleSelection={() => this.handleClick(0)}
              />
              <Square value={boxes[1]} handleSelection={() => this.handleClick(1)}/>
              <Square value={boxes[2]} handleSelection={() => this.handleClick(2)}/>
            </View>
            <View style={styles.row}>
              <Square value={boxes[3]} handleSelection={() => this.handleClick(3)}/>
              <Square value={boxes[4]} handleSelection={() => this.handleClick(4)}/>
              <Square value={boxes[5]} handleSelection={() => this.handleClick(5)}/>
            </View>
            <View style={styles.row}>
              <Square value={boxes[6]} handleSelection={() => this.handleClick(6)}/>
              <Square value={boxes[7]} handleSelection={() => this.handleClick(7)}/>
              <Square value={boxes[8]} handleSelection={() => this.handleClick(8)}/>
            </View>
          </View>

          <Button style={styles.restartButton} onPress={() => this.handleBoardRestart()}>
            <Text>Start A New Game</Text>
          </Button>
        </Container>
      </View>
    )
  }
}


export default function App() {
  return (
    <View style={styles.container}>
      <Board/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    height: 130,
    width: metrics.DEVICE_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 1
  },
  subheader: {
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 0
  },
  titleHeader: {
    fontFamily: baseFont,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50
  },
  row: {
    flexDirection: 'row'
  },
  subtitleHeader: {
    fontFamily: baseFont,
    fontSize: 24,
    fontWeight: 'bold'
  },
  board: {
    height: 300,
    width: 300,
    backgroundColor: 'lightgray',
    borderColor: 'white',
    borderWidth: 1
  },
  boardWrapper: {
    paddingTop: 75,
    alignItems: 'center'
  },
  restartButton: {
    marginTop: 50,
    justifyContent: 'center'
  }

});
