let form=document.querySelector("#search-form");
form.addEventListener("submit",
    function(event)
    {
        event.preventDefault();
        let checkin=document.querySelector("#checkin");
        let checkout=document.querySelector("#checkout");

        try
        {
            if(checkout.value<checkin.value)
            {
                sessionStorage.setItem("checkout",checkin.value);
                sessionStorage.setItem("checkin",checkout.value);
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
checkin.min=new Date().toLocaleDateString("en-CA");
checkout.min=new Date().toLocaleDateString("en-CA");