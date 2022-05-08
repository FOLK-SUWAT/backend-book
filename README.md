# backend-book
1. Connect database File : config/config.js
2. run command : npx sequelize-cli db:migrate
3. run command : cd Project and run npm run dev

Api 2 structure

Api User 
  api public router
 /register
 /login
 
 api private router with token key , token have after login then after login token key expires in 2h
 /update
 /delete
 
 Api Book 
  api public router
  /   index return json data book with status show book = status = 0 
  
  api private router with token key , token have after login then after login token key expires in 2h
  /registerbook
  /update        // update bookname , price ,details
  /updatescore   // check user vote
  /updatestatus //update show book or hide
  /delete   //delete book have check email user and productemail
  
  
