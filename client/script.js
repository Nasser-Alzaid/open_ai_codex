import bot from './assets/bot.svg';
import user from './assets/user.svg';


const form = document.querySelector('form');
const chat_container = document.querySelector('#chat-container');

let loadIntervel;

function loader (element){

    element.textContent = '';

    loadIntervel = setInterval(() => {
      element.textContent += '.';

      if (element.textContent==='....') {
        element.textContent ='';
      }
      }, 300)}

      function typeText(element , text){
        let index = 0;

        let interval = setInterval(() => {
          if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
           }
           
           else
            {
               clearInterval(interval)
            }
    } ,20) }


    function generateUniqeId(){

      const timestamp = Date.now();
      const randomNumber = Math.random();
      const hexadecimalString = randomNumber.toString(16);
      
      return `id-${timestamp}-${hexadecimalString}`;
    }

    function chatStripe(isAI,value,uniqeId) {
      return 
      (
        `
    
       <div class="wapper ${isAI && 'ai'}">
       <div class="chat">
       <div className="profile">
       <img 
       src="${isAI ? bot : user}"
       alt="${isAI ? 'bot' : 'user'}"
       /> 
       </div>

       <div class"massege" id =${uniqeId}>${value}></div>
       
       </div>
       </div> 
        
        
        `

      )
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData(form);

    // users chatstrioe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    form.reset();

      //   bot's chatStripe
      const uniqeId = generateUniqeId();
      chatContainer.innerHTML += chatStripe(true," ", uniqeId); 

      chatContainer.scrollTop = chatContainer.scrollheight;

      const massegeDiv = document.getElementById(uniqeId);

      loader(massegeDiv);


    }

    form.addEventListener('submit',handleSubmit);
    form.addEventListener('keyup',(e) =>{ 
      if (e.keyCode === 13){
        handleSubmit(e);
      }

  
    })