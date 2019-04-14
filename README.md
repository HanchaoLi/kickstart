# kickstart
  next.js + semantic-ui-react + solidity
  client side: metamask
  before start server, install metamask first, as client interface
  
  This project build a kickstarter website, which founder can create a campaign for their products, and other people 
  can donate money to their campaign, and this website contains donate management and vote system.
  
  for donate management, each founder can set project information and minimum donate value, after donater donate money,
  the money will transfer to founder's accountant. there is no middle charge, only transfer fee taken by Ethereum platform.
  
  for vote system, if founder want to use some amount of money, they need to post on this website, and donater can vote for 
  founder's action, the founder can only use money after more than half of the donater approve this deal.
  
1. in the root folder, type : npm install --save to install all the dependency need.
2. in the root folder, type : npm run dev to run the server. type localhost:3000 to show the main page.
3. this project is on rinkeby test network right now, so it won't spend actual bitcoin.
