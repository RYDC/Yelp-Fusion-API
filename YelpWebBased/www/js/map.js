class Gmap extends HTMLIFrameElement{
    constructor(latitude,longitude,zoom,height,width){
        super();
        this.lat = latitude.toString();
        this.lon = longitude.toString();
        this.zoomv = zoom;
        this.API_KEY = "AIzaSyACAhJEtzavzYcAVGOcompcN3l4syWO-nk"; //API KEY
        //AIzaSyACAhJEtzavzYcAVGOcompcN3l4syWO-nk
        this.setAttribute("src",this.getSrc());
        this.setAttribute("width",width);
        this.setAttribute("height",height);     
           
        
    }
    getSrc(){
        return "https://www.google.com/maps/embed/v1/view?key=" + this.API_KEY + "&center=" + this.lat + "," + this.lon + "&zoom=" + this.zoomv;
    }

}

customElements.define( 'g-map', Gmap, { extends: 'iframe' } );
