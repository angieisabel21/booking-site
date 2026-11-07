function getDestination()
{
    //Todo get chosen destination
    return["No Destination",false]
}
function getAirline()
{
    //Todo get chosen airline
    return["No Airline",false]
}
function getHotel()
{
    //Todo get chosen hotel
    return["No Hotel",false]
}
function getPackage()
{
    return["No Package",false]
}

function getDate()
{
    //Todo verify dates are open
    let checkin=sessionStorage.getItem("checkin");
    let checkout=sessionStorage.getItem("checkout");

    if(checkin===null&&checkout===null)
    {
        return["No Date Selected",false]
    }
    return["From "+checkin+" To "+checkout, true]    
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
        let days=date[3]-date[2];

        //Test values
        /* 
        airline[1]=true;
        airline[0]="Delta";

        hotel[1]=true;
        hotel[0]="Grand Hotel";

        package[1]=true;
        package[0]="Ultra Delux"

        destination[1]=true;
        destination[0]="Mexico"
        */



        //Check if the date is chosen
        if(date[1])
        {
            //If chosen adds a line to the page saying so
            document.getElementById("dateChosen").innerHTML=date[0];
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