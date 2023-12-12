const painel = document.getElementById('painel');
const loginForm = document.getElementById('loginForm');
const questionQuantityForm = document.getElementById('questionQuantityForm');

function handleLoginFormSubmit(event) {
   event.preventDefault();
 
   const isLoggedIn = true;
 
   if (isLoggedIn) {
     painel.style.display = 'block';
     document.querySelector('.login-container').style.display = 'none';
   } else {
     alert('Login inválido. Por favor, tente novamente.');
   }
}

loginForm.addEventListener('submit', handleLoginFormSubmit);

function handleQuestionQuantityFormSubmit(event) {
   event.preventDefault();
 
   const questionQuantity = parseInt(document.getElementById('questionQuantity').value);
 
   painel.innerHTML = '<h2>Adicionar Perguntas</h2>';
 
   for (let i = 1; i <= questionQuantity; i++) {
     const form = document.createElement('form');
     form.className = `questionForm${i}`;
     form.innerHTML = `
       <div class="form-group">
         <label for="question${i}">Pergunta ${i}:</label>
         <input type="text" id="question${i}" name="question${i}" required>
       </div>
       <div class="form-group">
         <label for="numberOfOptions${i}">Número de Respostas:</label>
         <input type="number" id="numberOfOptions${i}" name="numberOfOptions${i}" min="1" required>
       </div>
       <div class="options${i}"></div>
       <button type="button" class="addResponseBtn">Adicionar Respostas</button>`;
 
     form.querySelector('.addResponseBtn').addEventListener('click', function(e) {
       e.preventDefault();
 
       const numberOfOptions = parseInt(document.getElementById(`numberOfOptions${i}`).value);
       const optionsContainer = form.querySelector(`.options${i}`);
 
       optionsContainer.innerHTML = '';
 
       for (let j = 1; j <= numberOfOptions; j++) {
         optionsContainer.innerHTML += `
           <div class="form-group">
             <label for="option${i}_${j}">Resposta ${j}:</label>
             <input type="text" id="option${i}_${j}" name="option${i}_${j}" required>
           </div>`;
       }
     });
 
     painel.appendChild(form);
   }
 
   const submitButton = document.createElement('button');
   submitButton.innerText = 'Enviar Respostas';
   submitButton.addEventListener('click', function(e) {
     e.preventDefault();
 
     let allResponses = '';
     let isValid = true;
 
     for (let i = 1; i <= questionQuantity; i++) {
       const responses = document.querySelectorAll(`.questionForm${i} input[type="text"]`);
       
       responses.forEach(response => {
         if (response.value.trim() === '') {
           isValid = false;
           return;
         }
         allResponses += `Pergunta ${i}: ${response.value}\n`;
       });
 
       if (!isValid) break;
     }
 
     if (isValid) {
       alert('Respostas digitadas:\n' + allResponses);
     } else {
       alert('Por favor, preencha todos os campos antes de enviar.');
     }
   });
 
   painel.appendChild(submitButton);
}

questionQuantityForm.addEventListener('submit', handleQuestionQuantityFormSubmit);

painel.style.display = 'none';