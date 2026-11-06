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

    if(sessionStorage.getItem("checkin")===null)
    {
        return["No Date Selected",false]
    }
    if(sessionStorage.getItem("checkout")===null)
    {
        return["No Date Selected",false]
    }
    return["Date Selected", true]    
}

let button=document.querySelector(".confirm");
button.addEventListener("click",
    function()
    {    
        let airline=getAirline();
        let destination=getDestination();
        let hotel=getHotel();
        let package=getPackage();
        let date=getDate();
        if(!date[1])
        {
            alert("No Date Selected");
            window.location.href="index.html"
        }
        else
        {
            if(!airline[1])
            {
                airline=document.getElementById("flightValid");
                airline.textContent="No Flight Selected";
                airline.style.textDecorationLine="underline"
                airline.style.color="red";
            }
            if(!destination[1])
            {
                destination=document.getElementById("destValid");
                destination.textContent="No Destination Selected";
                destination.style.textDecorationLine="underline";
                destination.style.color="red";
            }
            if(!hotel[1])
            {
                hotel=document.getElementById("hotelValid");
                hotel.textContent="No Hotel Selected";
                hotel.style.textDecorationLine="underline";
                hotel.style.color="red";
            }
            if(!package[1])
            {
                package=document.getElementById("planValid");
                package.textContent="No Plan Selected";
                package.style.textDecorationLine="underline";
                package.style.color="red";
            }
        }
    }
);