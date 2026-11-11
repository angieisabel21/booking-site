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

        //date[3] and date[2] are the number of days
        let [yearIn,monthIn,dayIn]=date[2].split("-").map(Number);
        let [yearOut,monthOut,dayOut]=date[3].split("-").map(Number);
        let days=dayOut-dayIn;

        //Check if the date is chosen
        if(date[1])
        {
            //If chosen adds a line to the page saying so
            document.getElementById("dateChosen").innerHTML=date[0]+" <br>Your Trip is: "+days+" days long";
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

            if(!airline[1])
            {
                airlineEl=document.getElementById("flightValid");
                airlineEl.textContent=airline[0];
                airlineEl.style.textDecorationLine="underline"
                airlineEl.style.color="red";
            }
            else if(airline[1])
            {
                airlineEl=document.getElementById("flightValid");
                airlineEl.textContent=airline[0];
                airlineEl.style.textDecorationLine="underline"
                airlineEl.style.color="green";
            }
            

            if(!destination[1])
            {
                destinationEl=document.getElementById("destValid");
                destinationEl.textContent=destination[0];
                destinationEl.style.textDecorationLine="underline";
                destinationEl.style.color="red";
            }
            else if(destination[1])
            {
                destinationEl=document.getElementById("destValid");
                destinationEl.textContent=destination[0];
                destinationEl.style.textDecorationLine="underline";
                destinationEl.style.color="green";
            }

            if(!hotel[1])
            {
                hotelEl=document.getElementById("hotelValid");
                hotelEl.textContent=hotel[0];
                hotelEl.style.textDecorationLine="underline";
                hotelEl.style.color="red";
            }
            else if(hotel[1])
            {
                hotelEl=document.getElementById("hotelValid");
                hotelEl.textContent=hotel[0];
                hotelEl.style.textDecorationLine="underline";
                hotelEl.style.color="green";
            }

            if(!package[1])
            {
                packageEl=document.getElementById("planValid");
                packageEl.textContent=package[0];
                packageEl.style.textDecorationLine="underline";
                packageEl.style.color="red";
            }

            else if(package[1])
            {
                packageEl=document.getElementById("planValid");
                packageEl.textContent=package[0];
                packageEl.style.textDecorationLine="underline";
                packageEl.style.color="green";
            }

            //Hides the logo and shows the images plus the users choice
            document.querySelector(".check").style.visibility="visible";
            document.getElementById("logo").style.display="none";
        }
    }
);