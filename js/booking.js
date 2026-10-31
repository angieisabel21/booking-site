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
function getImage() 
{
    //Todo get image for chosen destination     
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
function checkDates(dateChosen)
{
    //Todo verify dates are open
}


    //Todo verify that destination has been chosen
    //Todo verify that airline has been chosen
    //Todo verify that hotel has been chose//if not ask if they wish to book hotel beofore moving 
    //Todo verify that dateChosen is available

let button=document.querySelector(".confirm");
button.addEventListener("click",
    function()
    {
            
            let airline=getAirline();
            let destination=getDestination();
            let hotel=getHotel();
            let package=getPackage();
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
    });



function addCalendar()
{
    //Todo add Calendar
    //Maybe
}
function giveSummary()
{
    //Todo send to summary of trip page
    //This page should include: packing tips/time of year/events going on/image of selected locaiton/ or whatever feels good
}
