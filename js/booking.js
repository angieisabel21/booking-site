function getDestination()
{
    //Verifies destination is seleceted
    let destination=sessionStorage.getItem("destination");
    if(destination===null)
    {
        return["No Destination",false]
    }
    else return[destination,true]
    
}
function getAirline()
{
    //Verfies airline is selected
    let airline=sessionStorage.getItem("airline");
    if(airline===null)
    {
        return["No Airline",false]
    }
    else return[airline,true]
}
function getHotel()
{
    //Verifies hotel is seleted
    let hotel=sessionStorage.getItem("hotel");
    if(hotel===null)
    {
        return["No Hotel",false]
    }
    else return[hotel,true]
}
function getPackage()
{
    //Verifies package is selected
    let package=sessionStorage.getItem("package");
    if(package===null)
    {
        return["No Package",false]
    }
    else return[package, true]

    
}

function getDate()
{
    //Verify dates
    let checkin=sessionStorage.getItem("checkin");
    let checkout=sessionStorage.getItem("checkout");

    if(checkin===null&&checkout===null)
    {
        return["No Date Selected",false]
    }
    else return["From "+checkin+" To "+checkout, true,checkin,checkout]    
}

//After confirm trip button is pressed the function fires
let button=document.querySelector(".confirm");
button.addEventListener("click",
    function()
    { 
        //Gets data from thew following functions and stores as an array
        //the array is as follows variable[0]=data and variable[1]=true or false  
        let airline=getAirline();
        let destination=getDestination();
        let hotel=getHotel();
        let package=getPackage();
        let date=getDate();

        //Gets table elements
        packageEl=document.getElementById("planValid");
        hotelEl=document.getElementById("hotelValid");
        destinationEl=document.getElementById("destValid");
        airlineEl=document.getElementById("flightValid");

        //Adds style to them
        airlineEl.textContent=airline[0];
        airlineEl.style.textDecorationLine="underline";

        destinationEl.textContent=destination[0];
        destinationEl.style.textDecorationLine="underline";

        hotelEl.textContent=hotel[0];
        hotelEl.style.textDecorationLine="underline";

        packageEl.textContent=package[0];
        packageEl.style.textDecorationLine="underline";

        //Makes imgs hyperlinks
        let location=["destinations.html","flights.html","hotels.html","packages.html"]

        let img=document.querySelectorAll("#img");
        for(let i=0;i<img.length;i++)
        {
            img[i].addEventListener("click",
                function()
                {
                    window.location.href=location[i];
                }
            );
        }



        //Check if the date is chosen
        if(date[1])
        {
            //date[3] and date[2] are the number of days
            let [yearIn,monthIn,dayIn]=date[2].split("-").map(Number);
            let [yearOut,monthOut,dayOut]=date[3].split("-").map(Number);
            let days=dayOut-dayIn;
            let text=" days";
            if(days==1)
            {
                text=" day"
            }
            if(days==0)
            {
                alert("Trip Is 0 days. Are you sure you want to book this trip?");
            }

             //If chosen adds a line to the page saying so
            document.getElementById("dateChosen").innerHTML=date[0]+" <br>Your Trip is: "+days+text+" long";

           
            
        }
        //Checks if the date isn't chosen
        if(!date[1])
        {
            //If the date isn't chosen it alerts the user
            alert("No Date Selected");

            //Sends user to the home page
            window.location.href="index.html"
        }
        else
        {
            //Each if statement highlights what the user hasn't selected
            //Each else if statement highlights what the user has selected

            if(!airline[1]){airlineEl.style.color="red"}
            else if(airline[1]){airlineEl.style.color="green"}

            if(!destination[1]){destinationEl.style.color="red"}
            else if(destination[1]){destinationEl.style.color="green"}

            if(!hotel[1]){hotelEl.style.color="red"}
            else if(hotel[1]){hotelEl.style.color="green"}

            if(!package[1]){packageEl.style.color="red"}
            else if(package[1]){packageEl.style.color="green"}

            //Hides the logo and shows the images plus the users choice
            document.querySelector(".check").style.visibility="visible";
            document.getElementById("logo").style.display="none";
        }
    }
);