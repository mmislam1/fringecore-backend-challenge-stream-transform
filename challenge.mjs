// ALL YOUR CODE SHOULD BE HERE
// DO NOT EDIT THE OTHER FILES
import net from "node:net";

const PORT = 3032;
const HOST = '0.0.0.0';

//console.log(secret.length)

// Create a client and connect to the server
const client = new net.Socket();
client.connect(PORT, HOST, () => {
  //console.log('Connected to server');

});



const server = net.createServer();

server.listen(3031,()=>{})
const receiver = new net.Socket();
receiver.connect(3031, HOST, () => {
  //console.log('Connected to server');

});
//variables necessary to keep track
let secret = 'i like big trains and i cant lie';

let match = -1
let secretMatch = 0
let start = 0
let send = 1
let ans = ''
let array = []

function proc() {
  let message = array.shift()           // dequeue


  for (let i = 0; i < message.length; i++) {
    if (message.charAt(i) === secret.charAt(0)) {
      for (let j = 0; j < secret.length; j++) {
        if (i + j > message.length - 1) {
          break
        }
        if (message.charAt(i + j) !== secret.charAt(j)) {
          break
        }
        if (j === secret.length - 1) {
          for (let k = 0; k < 32; k++) {
            if (message.charAt(i + k) !== ' ') {
              message = message.substr(0, i + k) + '-' + message.substr(i + k + 1)

            }

          }
          receiver.write(message)
          
          //console.log('>>>>>>>>>>', message)
          
        }
      }
    }
  }
  if (array.length > 0) {
    proc()
  }

}





let first = 1
// Handle data from the server
client.on('data', async (data) => {
  if (first === 1) {
    client.write('a');
    first = 0

  }


  else {
    let message = await data.toString() //getting only the useful data
    //console.log(message);
    await array.push(message)                    //enqueue
    proc()

  }



})








