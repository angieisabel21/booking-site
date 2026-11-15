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

        let img=document.querySelectorAll(".trip-img");
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

            //Turns the dates into Date objects so trips across months/years count correctly
            //(months start at 0 in JavaScript, so subtract 1)
            let startDate=new Date(yearIn,monthIn-1,dayIn);
            let endDate=new Date(yearOut,monthOut-1,dayOut);

            //Subtracting dates gives milliseconds; divide by the milliseconds in one day
            //Math.round handles the 1-hour shift from daylight saving time
            let days=Math.round((endDate-startDate)/(1000*60*60*24));
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

            //Shows the trip summary with prices and the total (true = trip is confirmed)
            showSummary(true);
        }
    }
);

//=========================================
//Trip summary
//Looks up the full details of each choice in the JSON files
//and shows them with prices and a total
//=========================================

//Loads a JSON file from the data folder
async function loadJson(path)
{
    let response=await fetch(path);
    if(!response.ok)
    {
        throw new Error("Could not load "+path);
    }
    return response.json();
}

//Turns 1200 into "$1,200"
function formatPrice(amount)
{
    return "$"+amount.toLocaleString("en-US");
}

//Builds one row of the summary: what it is, the details, the price and a Change link
function summaryRow(label, details, price, changePage)
{
    return "<tr>"+
        "<th>"+label+"</th>"+
        "<td>"+details+"</td>"+
        "<td class='price'>"+price+"</td>"+
        "<td><a href='"+changePage+"'>Change</a></td>"+
        "</tr>";
}

//confirmed is true after Confirm Trip is clicked, false when the page first opens
async function showSummary(confirmed)
{
    let summary=document.getElementById("trip-summary");

    try
    {
        //Load the data files
        let flights=await loadJson("data/flights.json");
        let hotels=await loadJson("data/hotels.json");
        let packages=await loadJson("data/packages.json");

        //Find each saved choice in the data (undefined if not chosen yet)
        let flight=flights.find(f => f.id===sessionStorage.getItem("flightId"));
        let hotel=hotels.find(h => h.id===sessionStorage.getItem("hotelId"));
        let tripPackage=packages.find(p => p.name===sessionStorage.getItem("package"));
        let destination=sessionStorage.getItem("destination");

        //Number of nights from the saved dates
        let date=getDate();
        let nights=Math.round((new Date(date[3])-new Date(date[2]))/(1000*60*60*24));

        let total=0;
        let rows="";

        //Dates
        rows+=summaryRow("Dates", date[2]+" to "+date[3]+" ("+nights+" nights)", "", "index.html");

        //Destination
        if(destination)
        {
            rows+=summaryRow("Destination", destination, "", "destinations.html");
        }
        else
        {
            rows+=summaryRow("Destination", "Not chosen yet", "", "destinations.html");
        }

        //Flight
        if(flight)
        {
            rows+=summaryRow("Flight", flight.airline+": "+flight.from+" → "+flight.to, formatPrice(flight.price), "flights.html");
            total=total+flight.price;
        }
        else
        {
            rows+=summaryRow("Flight", "Not chosen yet", "", "flights.html");
        }

        //Hotel: price per night times the number of nights
        if(hotel)
        {
            let hotelCost=hotel.pricePerNight*nights;
            rows+=summaryRow("Hotel", hotel.name+" ("+formatPrice(hotel.pricePerNight)+" × "+nights+" nights)", formatPrice(hotelCost), "hotels.html");
            total=total+hotelCost;
        }
        else
        {
            rows+=summaryRow("Hotel", "Not chosen yet", "", "hotels.html");
        }

        //Package
        if(tripPackage)
        {
            rows+=summaryRow("Package", tripPackage.name, formatPrice(tripPackage.pricePerPerson), "packages.html");
            total=total+tripPackage.pricePerPerson;
        }
        else
        {
            rows+=summaryRow("Package", "Not chosen yet", "", "packages.html");
        }

        //Message at the bottom
        let message="";
        if(destination&&flight&&hotel&&tripPackage&&confirmed)
        {
            message="<p class='confirmed'>Your trip is confirmed! Have a great time in "+destination+".</p>";
        }
        else if(destination&&flight&&hotel&&tripPackage)
        {
            message="<p class='ready'>Everything is picked! Click Confirm Trip below to book it.</p>";
        }
        else
        {
            message="<p class='missing'>Pick the items marked \"Not chosen yet\" to finish your booking.</p>";
        }

        summary.innerHTML=
            "<h2>Trip Summary</h2>"+
            "<table>"+rows+
            "<tr class='total'><th>Total</th><td>Per traveler</td><td class='price'>"+formatPrice(total)+"</td><td></td></tr>"+
            "</table>"+
            message;
    }
    catch(error)
    {
        summary.innerHTML="<p class='missing'>Could not load your trip details: "+error.message+"</p>";
    }
}

//=========================================
//When the page opens
//=========================================

//Draws the "Step 6 of 6" progress bar (from steps.js)
showSteps("booking.html");

//If every step is already picked, show the summary right away
if(getDate()[1]&&getDestination()[1]&&getAirline()[1]&&getHotel()[1]&&getPackage()[1])
{
    showSummary(false);
}
