# Function Frontend

This Solidity program is a simple "Function Frontend" program that demonstrates the 2-3 functions that shows the values of how those functions in frontend work.

## Description

This project aims to integrate the program with MetaMask and enable front-end manipulation through various functionalities. I have implemented features to increase or decrease the deposit or withdrawal amount and introduced a method named setTransacCount(). This method manipulates the transactionHistory variable by adding all transactions to it. Additionally, a button has been incorporated to verify the signer upon clicking.


### Executing program

After cloning the github, you will want to do the following to get the code running on your computer.

  1. Inside the project directory, in the terminal type: npm i
  2. Open two additional terminals in your VS code
  3. In the second terminal type: npx hardhat node
  4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
  5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. Typically at http://localhost:3000/



## Authors

Art Eli Aluri B. Bautista
202010553@fit.edu.ph

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
