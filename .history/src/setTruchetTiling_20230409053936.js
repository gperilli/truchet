import { degrees_to_radians } from '/src/utils/trig.js'

export { setTruchetTiling }

// import { pythagorean } from '/src/utils/trig.js'

class TruchetTile {
    constructor(tileWidth, truchetSettings) {
        this.blockContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.blockContainer.style.background = "red";
        this.tileWidth = tileWidth;
        this.strokeWidth = 5;
        this.blockContainer.setAttribute("height", tileWidth);
        this.blockContainer.setAttribute("width", tileWidth);
        this.blockContainer.style.position = "absolute";
        this.tileType = Math.floor(Math.random() * 2);
        this.topLeft;
        this.topRight;
        this.botttomLeft;
        this.bottomRight;

        // this.blockContainer.setAttribute('class', 'truchetBack');
        this.topLeftClass;
        this.topRightClass;
        this.botttomLeftClass;
        this.bottomRightClass;

        
        this.topLeftElement;
        this.topRightElement;
        this.botttomLeftElement;
        this.bottomRightELement;

        this.init()
    }

    init() {

        if (this.tileType == 0) {
            this.createTileA()
        } else {
            this.createTileB()
        }

        return this.blockContainer;
    }

    createTileA()
    {
        this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(180) , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" } ); //border
        this.bottomRight = this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(180) , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
            fillColour: "#FFF" } );
        this.bottomRightClass = 'truchetBottomRight';
        this.bottomRight.setAttribute('class', 'truchetBottomRight');
        this.createPieSlice({ 
            centreX: 0, 
            centreY: 0, 
            startAngleRadians: 0 , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" } ); // border
        this.topLeft = this.createPieSlice({ 
            centreX: 0, 
            centreY: 0, 
            startAngleRadians: 0 , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
            fillColour: "#FFF" } );
        this.topLeftClass = 'truchetTopLeft';
        this.topLeft.setAttribute('class', 'truchetTopLeft');

        this.topRightClass = 'truchetBottomLeftToTopRightBack';
        this.topLeftClass = 'truchetBottomLeftToTopRightBack';
        this.topRight = this.blockContainer;
        this.bottomLeft = this.blockContainer;
        this.blockContainer.setAttribute('class', 'truchetBottomLeftToTopRightBack')
    }

    createTileB()
    {
        this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: 0, 
            startAngleRadians: degrees_to_radians(90), 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" }); // border
        this.topRight = this.createPieSlice({ 
            centreX: this.tileWidth, 
            centreY: 0, 
            startAngleRadians: degrees_to_radians(90), 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
            fillColour: "#FFF" });
        this.topRight.setAttribute('class', 'truchetTopRight');
        this.createPieSlice({ 
            centreX: 0, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(270) , 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) + (this.strokeWidth / 2), 
            fillColour: "#000" });
        this.bottomLeft = this.createPieSlice({ 
            centreX: 0, 
            centreY: this.tileWidth, 
            startAngleRadians: degrees_to_radians(270), 
            sweepAngleRadians: degrees_to_radians(90), 
            radius: (this.tileWidth / 2) - (this.strokeWidth / 2), 
            fillColour: "#FFF" });
        this.bottomLeft.setAttribute('class', 'truchetBottomLeft');

        this.topLeft = this.blockContainer;
        this.bottomRight = this.blockContainer;
        this.blockContainer.setAttribute('class', 'truchetBottomRightToTopLeftBack')
    }

    createPieSlice(settings)
    {
        let d = "";

        const firstCircumferenceX = settings.centreX + settings.radius * Math.cos(settings.startAngleRadians);
        const firstCircumferenceY = settings.centreY + settings.radius * Math.sin(settings.startAngleRadians);
        const secondCircumferenceX = settings.centreX + settings.radius * Math.cos(settings.startAngleRadians + settings.sweepAngleRadians);
        const secondCircumferenceY = settings.centreY + settings.radius * Math.sin(settings.startAngleRadians + settings.sweepAngleRadians);

        // move to centre
        d += "M" + settings.centreX + "," + settings.centreY + " ";
        // line to first edge
        d += "L" + firstCircumferenceX + "," + firstCircumferenceY + " ";
        // arc
        // Radius X, Radius Y, X Axis Rotation, Large Arc Flag, Sweep Flag, End X, End Y
        d += "A" + settings.radius + "," + settings.radius + " 0 0,1 " + secondCircumferenceX + "," + secondCircumferenceY + " ";
        // close path
        d += "Z";

        const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");

        arc.setAttributeNS(null, "d", d);
        arc.setAttributeNS(null, "fill", settings.fillColour);

        this.blockContainer.appendChild(arc);

        return arc;
    }

    setTruchetTileDomElements() {
        let topLeftElements = document.querySelectorAll(this.topLeftClass);
        this.topLeftElement = topLeftElements[topLeftElements.length -1];
        let topRIghtElements = document.querySelectorAll(this.topRightClass);
        this.topRightElement = topRIghtElements[topRightElements.length -1];
        let bottomLeftElements = document.querySelectorAll(this.bottomLeftClass);
        this.botttomLeftElement = bottonLeftElements[bottomLeftElements.length -1];
        let bottomRightElements = document.querySelectorAll(this.bottomRightClass);
        this.bottomRightELement = bottonRIghtElements[bottomRightElements.length -1];
    }
}

function setTruchetTiling(containerSquare, tilingAreaWidthLength, truchetSettings) {
    var tilingArea = containerSquare;
    let truchetRows = truchetSettings["tileDensity"];
    const tileWidth = tilingAreaWidthLength / truchetSettings["tileDensity"];
    

    let tileMatrix = [];
    //let blockCount = -1;
    for (let j = 0; j < truchetRows; j++) {
        tileMatrix[j] = [];

        for (let i = 0; i < truchetRows; i++) {
            tileMatrix[j][i] = new TruchetTile(tileWidth, truchetSettings);
            tileMatrix[j][i].blockContainer.style.top = `${(tileWidth * j)}px`;
            tileMatrix[j][i].blockContainer.style.left = `${(tileWidth * i)}px`;
            
            
            tilingArea.insertAdjacentHTML("beforeend", tileMatrix[j][i].blockContainer.outerHTML);
            tileMatrix[j][i].setTruchetTileDomElements();
        }
    }

    // tileMatrix[5][5].blockContainer.style.background = "yellow";
    console.log(tileMatrix[5][5]);
}

