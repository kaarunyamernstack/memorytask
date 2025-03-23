const hello=document.getElementById("memory");
const messages=document.getElementById("message");
const buttons=document.getElementById("button");

        const cards = [
            '1', '1', '2','2', '3','3','4','4','5','5','6','6'
        ];

        let flippedCards = [];
        let matchedPairs = 0;
     

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function createCardElements() {
            const gameBoard = document.getElementById('game-board');
            gameBoard.innerHTML = '';
            shuffle(cards).forEach(symbol => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.symbol = symbol;
                card.addEventListener('click', handleCardClick);
                gameBoard.appendChild(card);
            });
        }

        function handleCardClick(e) {
            const clickedCard = e.target;
            if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) return;

            clickedCard.classList.add('flipped');
            clickedCard.textContent = clickedCard.dataset.symbol;
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
       

        function checkMatch() {
            const [card1, card2] = flippedCards;
            if (card1.dataset.symbol === card2.dataset.symbol) {
                matchedPairs++;
                flippedCards = [];

                if (matchedPairs === cards.length / 2) {
                   messages.textContent='Congratulations! You found all pairs! ';
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
            }
        }
        

        function restartGame() {
            matchedPairs = 0;
            flippedCards = [];
            createCardElements();
        }

        window.onload = restartGame;
    