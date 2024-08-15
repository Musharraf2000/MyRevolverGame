if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }

 // Get the button and audio element
 const playButton = document.getElementById('playButton'); //Html Button
 const audio1 = document.getElementById('empty'); //Empty sound
 const audio2 = document.getElementById('shoot'); //Shoot sound
 const min = 0; //Minimum number of bullets
 const max = 5; //Maximum Number of bullets
 const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; //random number between 0 and 5
 let CurrentNum = 0; //current num when app starts is 0
 let left = document.getElementById('cowb1'); //cowboy on left
 let right = document.getElementById('cowb2'); //cowboy on right
 playButton.addEventListener('click', shoot); //when play button is clicked shoot method is called
 let bulletcount = 6; //number of bullets

 const zerosArray = []; //empty array
 for (let i = 0; i < 6; i++) { 
     if (i == randomNumber){
         zerosArray.push(1); //push 5 '0's and 1 '1's into the array
     }else{
         zerosArray.push(0)
     }  
 }


 initialize();

 function flipRevolver(){
    let revolverImage = document.getElementById('revolverImage');
    if(revolverImage.getAttribute("src") == "./images/Revolver.png"){
        revolverImage.setAttribute("src","./images/Revolver_flipped.png");  //Revolver flip
    }else{
        revolverImage.setAttribute("src","./images/Revolver.png")
    }
 }



function initialize(){
   // let pl1 = prompt("Player 1?");
    //let pl2 = prompt("Player 2?");
    renderBullets(bulletcount);
 }

function shoot(){
  if(CurrentNum >= 6){
      return;
  }else{
     // p1.innerText = CurrentNum+1;
  if(zerosArray[CurrentNum] == 1){
      audio2.currentTime = 0; // Reset audio to the beginning
      audio2.play();
      CurrentNum++;
      bulletcount--;
      renderBullets(bulletcount);
      if (revolverImage.src.includes('Revolver.png')) {
        right.src = './images/Dead_cowboyright.png'
    } else {
        left.src = './images/Dead_cowboyleft.png';
    }
 
      return;
  }else{
      audio1.currentTime = 0;
      audio1.play();
     CurrentNum++;
  }
  }
 

 flipRevolver();
 bulletcount--;
 renderBullets(bulletcount);
 

}

function renderBullets(numBullets) {
    const bulletContainer = document.getElementById('bulletContainer'); //referes to the container in html page
    bulletContainer.innerHTML = ''; // Clear any existing bullets

    //Limit of bullets is 6
    for (let i = 0; i < Math.min(numBullets, 6); i++) {
        const bulletDiv = document.createElement('div'); //empty div
        bulletDiv.className = 'flex justify-center items-center'; //makes sure the div is in center

        const bulletImg = document.createElement('img'); //create empty image tag
        bulletImg.src = './images/Bullet.png'; //add image src
        bulletImg.alt = `Image ${i + 1}`; //add image alt
        bulletImg.className = 'w-1/4'; //add image class name

        bulletDiv.appendChild(bulletImg);// add new image to the existing div
        bulletContainer.appendChild(bulletDiv); // add new div to the bullet container
    }
}