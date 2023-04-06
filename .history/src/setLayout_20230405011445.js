import { topLevelContainerSize } from '/src/utils/topLevelContainerSize.js'
import { portraitLandscapeSwitcher } from '/src/utils/portraitLandscapeSwitcher.js'
import { setTruchetTiling } from '/src/setTruchetTiling.js'

export { setTruchetBlockLayout }
export { updateBlockLayout }

let topLevelContainerParams
let containerSquare
let isLandscape
// Main Square
let block;
let topLevelContainerDimensions, topLevelContainerWidth, topLevelContainerHeight, containerSquareWidth, containerXOffset, containerYOffset;

function containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset) {
    containerSquare.style.width = containerSquareWidth + "px";
    containerSquare.style.height = containerSquareWidth + "px";
    containerSquare.style.left = "".concat((containerXOffset * 2), "px");
    containerSquare.style.top = "".concat(containerYOffset, "px");
}

function setTruchetBlockLayout(topLevelContainer, truchetSettings) {

    /////////////////////////////////////////////////////
    // set layout based on screen size
    /////////////////////////////////////////////////////
    // Get top level container size and position
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    topLevelContainerWidth = topLevelContainerDimensions[0]
    topLevelContainerHeight = topLevelContainerDimensions[1]
    
    isLandscape = topLevelContainerWidth > topLevelContainerHeight;
    topLevelContainerParams = portraitLandscapeSwitcher(isLandscape, topLevelContainerWidth, topLevelContainerHeight)
    containerSquareWidth = topLevelContainerParams[0]
    containerXOffset = topLevelContainerParams[1]
    containerYOffset = topLevelContainerParams[2]
    
    // set position and size of main container square
    const containerSquareElement = `<div id="truchetTilingArea" style="position: absolute; overflow: hidden;"></div>`;
    topLevelContainer.insertAdjacentHTML("beforeend", containerSquareElement);
    containerSquare = document.querySelector("#rhombileTilingArea");
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);

    /////////////////////////////////////////////
    // set the truchet tiling
    ////////////////////////////////////////////
    setTruchetTiling(containerSquare, containerSquareWidth, truchetSettings);
    
}


function updateBlockLayout(topLevelContainer, truchetSettings) {

    // get screen size
    topLevelContainerDimensions = topLevelContainerSize(topLevelContainer)
    topLevelContainerWidth = topLevelContainerDimensions[0]
    topLevelContainerHeight = topLevelContainerDimensions[1]

    // Central container
    isLandscape = topLevelContainerWidth > topLevelContainerHeight;
    topLevelContainerParams = portraitLandscapeSwitcher(isLandscape, topLevelContainerWidth, topLevelContainerHeight)
    containerSquareWidth = topLevelContainerParams[0]
    containerXOffset = topLevelContainerParams[1]
    containerYOffset = topLevelContainerParams[2]
    document.querySelector("#rhombileTilingArea").innerHTML = '';
    containerSquarePositioning(containerSquare, containerSquareWidth, containerXOffset, containerYOffset);
    
    // main square
    //paisleyBlock.width = containerSquareWidth
    //paisleyBlock.height = containerSquareWidth

    // update position and size     
    setRhombileTiling(containerSquare, containerSquareWidth, truchetSettings);

}
