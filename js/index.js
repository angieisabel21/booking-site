let form=document.querySelector("#search-form");

//Html Form Listener
form.addEventListener("submit",
    function(event)
    {
        //Gets Dates ssleceted
        event.preventDefault();
        let checkin=document.querySelector("#checkin");
        let checkout=document.querySelector("#checkout");

        //Sends checkin and checkout dates to session storage
        try
        {
            //Prevents check out date from happening before the checkin
            if(checkout.value<checkin.value)
            {
                sessionStorage.setItem("checkout",checkin.value);
                sessionStorage.setItem("checkin",checkout.value);

                //Quick error explanation
                alert("Checkout was before the Checkin: Dates swapped");
            }
            else
            {
                sessionStorage.setItem("checkin",checkin.value);
                sessionStorage.setItem("checkout",checkout.value);
            }     
        }
        catch(error)
        {
            alert("Could Not Save Date: "+error.message);
        }
    }
);

//Prevents past dates from being selected
checkin.min=new Date().toLocaleDateString("en-CA");
checkout.min=new Date().toLocaleDateString("en-CA");

//Loop to add and eventlistener to each class
let cards=document.querySelectorAll(".card");
for(i=0;i<cards.length;i++)
{
    //If popular destinaiton is cliecked send them to destinations
    cards[i].addEventListener("click", 
        function()
        {
            let date=getDate();
            if(date){window.location.href="destinations.html";}
            else alert("Please Select Date");

            
        }
    );
}

//Copied date verify from booking.js with slight differences
function getDate()
{
    //Verify dates
    let checkin=sessionStorage.getItem("checkin");
    let checkout=sessionStorage.getItem("checkout");

    if(checkin===null&&checkout===null)
    {
        return false
    }
    return true
}