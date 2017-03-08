/**
 * Created by sahil.sethi
 */
var NUMBER_OF_COLS = 8,
    NUMBER_OF_ROWS = 8,
    blockSize,
    BLOCK_COLOUR_1 = '#000000',
    BLOCK_COLOUR_2 = '#ffffff',
    HIGHLIGHT_COLOUR = '#f0ec11',
    piecePositions = null,
    PIECE_PAWN = 0,
    PIECE_CASTLE = 1,
    PIECE_ROUKE = 2,
    PIECE_BISHOP = 3,
    PIECE_QUEEN = 4,
    PIECE_KING = 5,
    IN_PLAY = 0,
    TAKEN = 1,
    pieces = null,
    ctx = null,
    defaultPositions = null,
    canvas = null,
    BLACK_TEAM = 0,
    WHITE_TEAM = 1,
    SELECT_LINE_WIDTH = 5,
    currentTurn = WHITE_TEAM,
    selectedPiece = null;


/**
 * Function to draw the chess game
 */
function draw()
{
    var turnIndicator = document.getElementById("turnIndicator");
    canvas = document.getElementById('chess');

    //Check whether the canvas is supported by the browser or not
    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');

        // Calculate the block size
        blockSize = canvas.height / NUMBER_OF_ROWS;

        // Draw the board
        drawBoard();

        //default positions of the pieces
        getDefaultPositions();

        // Draw pieces
        pieces = new Image();
        pieces.src = 'pieces.png';
        pieces.onload = drawPiecesOverTable;

        turnIndicator.innerText = "current turn of team white";

        //adding event over canvas
        canvas.addEventListener('click', board_click, false);


    }
    else
    {
        alert("Canvas not supported!");
    }
}

/*
* Draw chess board
* */
function drawBoard() {
    var iRowCounter;

    for (iRowCounter = 0; iRowCounter < NUMBER_OF_ROWS; iRowCounter++) {
        drawRow(iRowCounter);
    }

    // Draw outline
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0,
        NUMBER_OF_ROWS * blockSize,
        NUMBER_OF_COLS * blockSize);
}

/*
* Draw rows of chess board
* */
function drawRow(iRowCounter) {
    var iBlockCounter;

    // Draw 8 block left to right
    for (iBlockCounter = 0; iBlockCounter < NUMBER_OF_ROWS; iBlockCounter++) {
        drawBlock(iRowCounter, iBlockCounter);
    }
}

/*
* Draw the block of chess board
* */
function drawBlock(iRowCounter, iBlockCounter) {
    // Set the background
    ctx.fillStyle = getBlockColour(iRowCounter, iBlockCounter);

    // Draw rectangle for the background
    ctx.fillRect(iRowCounter * blockSize, iBlockCounter * blockSize,
        blockSize, blockSize);

    ctx.stroke();
}

/*
* get the colour of block
* */
//todo eleminate this function using array
function getBlockColour(iRowCounter, iBlockCounter) {
    var cStartColour;

    // Alternate the block colour
    if (iRowCounter % 2) {
        cStartColour = (iBlockCounter % 2 ? BLOCK_COLOUR_1 : BLOCK_COLOUR_2);
    } else {
        cStartColour = (iBlockCounter % 2 ? BLOCK_COLOUR_2 : BLOCK_COLOUR_1);
    }

    return cStartColour;
}

/*
* get the default position of the pieces on the table at the time of beginning
* */
function getDefaultPositions() {
    defaultPositions = {
        "white":
            [
                {
                    "piece": PIECE_CASTLE,
                    "row": 0,
                    "col": 0,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_ROUKE,
                    "row": 0,
                    "col": 1,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_BISHOP,
                    "row": 0,
                    "col": 2,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_KING,
                    "row": 0,
                    "col": 3,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_QUEEN,
                    "row": 0,
                    "col": 4,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_BISHOP,
                    "row": 0,
                    "col": 5,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_ROUKE,
                    "row": 0,
                    "col": 6,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_CASTLE,
                    "row": 0,
                    "col": 7,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 0,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 1,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 2,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 3,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 4,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 5,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 6,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 1,
                    "col": 7,
                    "status": IN_PLAY
                }
            ],
        "black":
            [
                {
                    "piece": PIECE_CASTLE,
                    "row": 7,
                    "col": 0,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_ROUKE,
                    "row": 7,
                    "col": 1,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_BISHOP,
                    "row": 7,
                    "col": 2,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_KING,
                    "row": 7,
                    "col": 3,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_QUEEN,
                    "row": 7,
                    "col": 4,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_BISHOP,
                    "row": 7,
                    "col": 5,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_ROUKE,
                    "row": 7,
                    "col": 6,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_CASTLE,
                    "row": 7,
                    "col": 7,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 0,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 1,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 2,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 3,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 4,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 5,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 6,
                    "status": IN_PLAY
                },
                {
                    "piece": PIECE_PAWN,
                    "row": 6,
                    "col": 7,
                    "status": IN_PLAY
                }
            ]
    };
}

/*
* Draw the pieces over the table
* */
function drawPiecesOverTable() {
    drawPiecesOfSpecificTeam(defaultPositions.black, true); //for black team
    drawPiecesOfSpecificTeam(defaultPositions.white, false);//for white team
}

/*
*Draw pieces of a specific team
* */
function drawPiecesOfSpecificTeam(teamOfPieces, bBlackTeam) {
    var iPieceCounter;

    // Loop through each piece and draw it on the canvas
    for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) {
        drawPiece(teamOfPieces[iPieceCounter], bBlackTeam);
    }
}

/*
* Draw a particular piece
* */
function drawPiece(curPiece, bBlackTeam) {
    var imageCoords = getImageCoords(curPiece.piece, bBlackTeam);

    // Draw the piece onto the canvas
    ctx.drawImage(pieces,
        imageCoords.x, imageCoords.y,
        blockSize, blockSize,
        curPiece.col * blockSize, curPiece.row * blockSize,
        blockSize, blockSize);
}

/*
*Get the image coordinates which we need to pick from the sprites
* */
function getImageCoords(pieceCode, bBlackTeam) {

    var imageCoords =  {
        "x": pieceCode * blockSize,
        "y": (bBlackTeam ? 0 : blockSize)
    };

    return imageCoords;
}

/*
*Funtion of perform whenever a click event occurd at the board
* */
function board_click(event) {
    var x = event.clientX - canvas.offsetLeft,
        y = event.clientY - canvas.offsetTop,
        clickedBlock = screenToBlock(x, y);

    if (selectedPiece === null) {
        checkIfPieceClicked(clickedBlock);
    } else {
        processMove(clickedBlock);
    }
}

/*
* function to calculate which block is clicked
* */
function screenToBlock(x, y) {
    var block =  {
        "row": Math.floor(y / blockSize),
        "col": Math.floor(x / blockSize)
    };

    return block;
}

/*
* check if piece is clicked of a particular block
* */
function checkIfPieceClicked(clickedBlock) {
    var pieceAtBlock = getPieceAtBlock(clickedBlock);

    if (pieceAtBlock !== null) {
        selectPiece(pieceAtBlock);
    }/*
    else
    {
        alert('you need to select a piece of team ' + (currentTurn === 0 ? "Black" : "White"));
    }*/
}

/*
* get the piece at a particular block location
* */
function getPieceAtBlock(clickedBlock) {

    var team = (currentTurn === BLACK_TEAM ? defaultPositions.black : defaultPositions.white);

    return getPieceAtBlockForTeam(team, clickedBlock);
}

/*
* get a team specific piece
* */
function getPieceAtBlockForTeam(teamOfPieces, clickedBlock) {

    var curPiece = null,
        iPieceCounter = 0,
        pieceAtBlock = null;

    for (iPieceCounter = 0; iPieceCounter < teamOfPieces.length; iPieceCounter++) {

        curPiece = teamOfPieces[iPieceCounter];

        if (curPiece.status === IN_PLAY &&
            curPiece.col === clickedBlock.col &&
            curPiece.row === clickedBlock.row) {
            curPiece.position = iPieceCounter;

            pieceAtBlock = curPiece;
            iPieceCounter = teamOfPieces.length;
        }
    }

    return pieceAtBlock;
}

/*
* Function to highlight the selected piece
* */
function selectPiece(pieceAtBlock) {
    // Draw outline
    ctx.lineWidth = SELECT_LINE_WIDTH;
    ctx.strokeStyle = HIGHLIGHT_COLOUR;
    ctx.strokeRect((pieceAtBlock.col * blockSize) + SELECT_LINE_WIDTH,
        (pieceAtBlock.row * blockSize) + SELECT_LINE_WIDTH,
        blockSize - (SELECT_LINE_WIDTH * 2),
        blockSize - (SELECT_LINE_WIDTH * 2));

    selectedPiece = pieceAtBlock;
}

/*
* function to process the selected move
* */
function processMove(clickedBlock) {
    var pieceAtBlock = getPieceAtBlock(clickedBlock),
        enemyPiece = blockOccupiedByEnemy(clickedBlock),
        turnIndicator = document.getElementById("turnIndicator");

    if (pieceAtBlock !== null) {
        removeSelection(selectedPiece);
        checkIfPieceClicked(clickedBlock);
    }
    else if (canSelectedMoveToBlock(selectedPiece, clickedBlock, enemyPiece) === true) {
        movePiece(clickedBlock, enemyPiece);
        turnIndicator.innerText = currentTurn === BLACK_TEAM ? "current turn of team black" :"current turn of team white";
    }
}

/*
* Provide the information if the moved block is occupied by enemy
* */
function blockOccupiedByEnemy(clickedBlock) {
    var team = (currentTurn === BLACK_TEAM ? defaultPositions.white : defaultPositions.black);

    return getPieceAtBlockForTeam(team, clickedBlock);
}

/*
* Function to remove the selected chip
* */
function removeSelection(selectedPiece) {
    drawBlock(selectedPiece.col, selectedPiece.row);//redraw the block
    drawPiece(selectedPiece, (currentTurn === BLACK_TEAM));// redraw the selected piece over it
}

/*
* Function to check wheather the selected chip can mve to that block or not
* */
function canSelectedMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
    var bCanMove = false;

    switch (selectedPiece.piece) {

        case PIECE_PAWN:

            bCanMove = canPawnMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

            break;

        case PIECE_CASTLE:

            // TODO

            break;

        case PIECE_ROUKE:

            // TODO

            break;

        case PIECE_BISHOP:

            // TODO

            break;

        case PIECE_QUEEN:

            bCanMove = canPawnMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

            break;

        case PIECE_KING:

            bCanMove = canPawnMoveToBlock(selectedPiece, clickedBlock, enemyPiece);

            break;
    }

    return bCanMove;
}

/*
* function to check whether pawn can move the clicked block or not.
* */
function canPawnMoveToBlock(selectedPiece, clickedBlock, enemyPiece) {
    var iRowToMoveTo = (currentTurn === WHITE_TEAM ? selectedPiece.row + 1 : selectedPiece.row - 1),
        bAdjacentEnemy = (clickedBlock.col === selectedPiece.col - 1 ||
            clickedBlock.col === selectedPiece.col + 1) &&
            enemyPiece !== null,
        bNextRowEmpty = (clickedBlock.col === selectedPiece.col &&
        blockOccupied(clickedBlock) === false);

    return clickedBlock.row === iRowToMoveTo &&
        (bNextRowEmpty === true || bAdjacentEnemy === true);
}

/*
* check whether the block is occupied or not.
* */
function blockOccupied(clickedBlock) {
    var pieceAtBlock = getPieceAtBlockForTeam(defaultPositions.black, clickedBlock);

    if (pieceAtBlock === null) {
        pieceAtBlock = getPieceAtBlockForTeam(defaultPositions.white, clickedBlock);
    }

    return (pieceAtBlock !== null);
}

/*
* function to move the block
* */
function movePiece(clickedBlock, enemyPiece) {
    // Clear the block in the original position
    drawBlock(selectedPiece.col, selectedPiece.row);

    var team = (currentTurn === WHITE_TEAM ? defaultPositions.white : defaultPositions.black),
        opposite = (currentTurn !== WHITE_TEAM ? defaultPositions.white : defaultPositions.black);

    team[selectedPiece.position].col = clickedBlock.col;
    team[selectedPiece.position].row = clickedBlock.row;

    if (enemyPiece !== null) {
        // Clear the piece your about to take
        drawBlock(enemyPiece.col, enemyPiece.row);
        opposite[enemyPiece.position].status = TAKEN;
    }

    // Draw the piece in the new position
    drawPiece(selectedPiece, (currentTurn === BLACK_TEAM));

    currentTurn = (currentTurn === WHITE_TEAM ? BLACK_TEAM : WHITE_TEAM);

    selectedPiece = null;
}
