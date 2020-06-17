var playing = false;
var score;
var trialsLeft;
var step;
var action; //set interval function
var fruits = ["banana", "a", "b", "c", "d", "e", "f", "berry", "cherry", "chery", "chry", "grap1", "grap2", "kiwi", "kkiwi", "mago2", "mango", "mealon", "papaya", "passion", "pomegranate", "watermealon"];


$(function () {

    //CLICK ON START OR RESET BUTTON
    $("#startReset").click(function () {

        //two ways of syntax for sound
        //document.getElementById("backgroundSound").play();//playing background 
        $("#backgroundSound")[0].play(); //play back sound    

        //ARE WE PLAYING
        if (playing == true) {

            //RELOAD PAGE        
            location.reload();

        } else {

            //Not playing
            playing = true; //game initialized

            //set score to 0
            score = 0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();
            //hide game over box
            $("#gameOver").hide();

            //CHANGE BUTTON TEXT TO "RESET GAME"
            $("#startReset").html("Reset Game");
            //start sending fruits
            startAction();
        }
    });

    $("#fruit1").mouseover(function () {

        score += Math.floor(Math.random() * 5) + 1; //updating random score 
        $("#scorevalue").html(score); //update score

        document.getElementById("slicesound").play(); //playing slice sound

        //stop fruit and hide it
        clearInterval(action);

        //hide fruit 
        $("#fruit1").hide("explode", 500); //slicing into parts

        //send new fruit
        // startAction();
        setTimeout(startAction, 500);

    });

    //funcions

    function addHearts() {
        $('#trialsLeft').empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append(
                '<img src="images/heart.png" class="life">');
        }
    }

    function startAction() {
        //genrerate a fruit        
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({
            'left': Math.round(Math.random() * 800),
            'top': -50
        }); //for random  position of fruitsNote:to subtract container size - pixel of images

        //..a random step
        step = 1 + Math.floor(6 * Math.random()); //change step

        //2.MOVE FRUIT DOWN ONE STEP EVERY 30 sec
        action = setInterval(function () {

            $("#fruit1").css('top', $("#fruit1").position().top + step);
            //IS FRUIT TOO LOW?
            if ($('#fruit1').position().top > $("#fruitContainer").height()) {
                //check if trials left
                if (trialsLeft > 1) {
                    //genrerate a fruit        
                    $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({
                        'left': Math.round(Math.random() * 800),
                        'top': -50
                    }); //for random  position of fruitsNote:to subtract container size - pixel of images

                    //..a random step
                    step = 1 + Math.floor(6 * Math.random()); //change step

                    //reduce no of trials by one
                    //reduce trails left
                    trialsLeft--;
                    //populate trials left
                    addHearts();

                } else { //game over
                    playing = false; //we are not playing anymore
                    $("#startReset").html("Start Game"); //change button to start
                    $("#gameOver").show();
                    $("#gameOver").html('<p>* Game Over *</p><p>Your Score is ' + score + "</p>");
                    $("#trialsLeft").hide();
                }
            }

        }, 10);

        $("#fruit1").mouseover(function () {
            score++;
            $("#scorevalue").html(score); //update score
        });

    }

    //stop dropping fruit
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();

    }

    //generate random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(Math.random() * 22)] + '.jfif');
    }

});

//*******************************           Logic of Fruit Game:     ***********************************************************

//CLICK ON START OR RESET BUTTON
//ARE WE PLAYING
//YES
//RELOAD PAGE
//NO
//SHOW TRIALSLEFT BOX
//CHANGE BUTTON TEXT TO "RESET GAME"
//1.CREATE RANDOM FRUIT
//DEFINE A RANDOM STEP
//2.MOVE FRUIT DOWN ONE STEP EVERY 30 sec
//IS FRUIT TOO LOW?
//NO-->REPEAT STEP 2
//YES--> CHECK ANY TRIALS LEFT ?
//YES-->REPEAT STEP1 AND REMOVE ONE HEART
//NO-->SHOW GAME OVER, MESSAGE CHANGE,BUTTON:START GAME

//SLICE FRUIT
//PLAY SOUND EXPLODE FRUIT
//INCREASE SCORE BY ONE
