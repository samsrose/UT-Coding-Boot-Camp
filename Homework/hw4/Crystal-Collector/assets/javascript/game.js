/****************************************************************************
 ****************************************************************************
    
    Create an object of Crystal Collector game
    
*****************************************************************************
*****************************************************************************/
var game;

var CrystalCollectorGame = function() {
    /************************************************************************
        
        Private variables
        
    *************************************************************************/
    // Variables for the game
    var numWins = 0, numLosses = 0;

    // Variables for the user
    var targetSum, currentSum;
    var numCrystals = 4, crystalValues = new Array(numCrystals);
    

    /************************************************************************
        
        Start a new game
        
    *************************************************************************/
    this.startNewGame = function() {
        // Choose a random sum between 19 and 120
        targetSum = Math.floor(102 * Math.random()) + 19;

        // Reset current sum
        currentSum = 0;

        // Assign a value between 1 and 12 to each crystal
        for (var i = 0; i < numCrystals; i++) {
            crystalValues[i] = Math.floor(12 * Math.random()) + 1;
        }

        // Display messages
        this.displayNumWins();
        this.displayNumLosses();
        this.displayTargetSum();
        this.displayCurrentSum();
    }

    
    /************************************************************************
        
        Display methods
        
    *************************************************************************/
    this.displayNumWins = function() {
        $("#numWins").text(numWins);
    }

    this.displayNumLosses = function() {
        $("#numLosses").text(numLosses);        
    }

    this.displayTargetSum = function() {
        $("#targetSum").text(targetSum);
    }

    this.displayCurrentSum = function() {
        $("#currentSum").text(currentSum);
    }


    /************************************************************************
        
        Get methods
        
    *************************************************************************/
    this.getCrystalValues = function() {
        return crystalValues;
    }


    /************************************************************************
        
        Set (update) methods
        
    *************************************************************************/
    this.updateNumWins = function(changeBy) {
        numWins += changeBy;
    }

    this.updateNumLosses = function(changeBy) {
        numLosses += changeBy;
    }

    this.updateCurrentSum = function(changeBy) {
        currentSum += changeBy;
    }


    /************************************************************************
        
        Query methods
        
    *************************************************************************/
    this.checkCurrentSum = function() {
        if (currentSum < targetSum) {
            // Still good to go
            return 0;

        } else if (currentSum === targetSum) {
            // Win condition
            return 1;

        } else {
            // Loss condition
            return -1;

        }
    }
}



/****************************************************************************
 ****************************************************************************
    
    Start a new game when the page loads for the first time
    
*****************************************************************************
*****************************************************************************/
$(document).ready(function() {
    game = new CrystalCollectorGame();

    game.startNewGame();

    
    /************************************************************************
        
        Respond to user's actions
        
    *************************************************************************/
    $.each(game.getCrystalValues(), function(index, value) {
//        console.log("Crystal " + (index + 1) + ": " + value);

        var elementTag = ".crystal:nth-child(" + (index + 1) + ")";

        $(elementTag).on("click", function() {
            game.updateCurrentSum(value);

            game.displayCurrentSum();

            switch (game.checkCurrentSum()) {
                // If the user reached the target sum
                case 1:
                    game.updateNumWins(1);

                    $("#outputMessage").html("Congratulations!<br>Press any key to continue.");
                    $("#lightBox").css({"animation-name"  : "slide_down",
                                        "background-color": "var(--color-mint-green)"});
                    $("#lightBox strong").css({"color": "#fff896"});
                    displayLightBox(true);
                    
                    game.startNewGame();

                    break;

                // If the user went over the target sum
                case -1:
                    game.updateNumLosses(1);

                    $("#outputMessage").html("Sorry, try again!<br>Press any key to continue.");
                    $("#lightBox").css({"animation-name"  : "shake",
                                        "background-color": "#c81a4c"});
                    $("#lightBox strong").css({"color": "#beffad"});
                    displayLightBox(true);
                    
                    game.startNewGame();

                    break;

            }
        });
    });

    $("#lightBox_background, #lightBox").on("click", function() {
        displayLightBox(false);
    });
});


function displayLightBox(lightBoxOn) {
//    game.updateKeyEnabled(!lightBoxOn);

    if (lightBoxOn) {
        $("#lightBox_background").css({"display": "block"});
        $("#lightBox").css({"display": "block"});

    } else {
        $("#lightBox_background").css({"display": "none"});
        $("#lightBox").css({"display": "none"});

    }
}