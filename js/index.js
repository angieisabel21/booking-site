let form=document.querySelector("#search-form");
form.addEventListener("submit",
    function(event)
    {
        event.preventDefault();
        let checkin=document.querySelector("#checkin");
        let checkout=document.querySelector("#checkout");

        try
        {
            sessionStorage.setItem("checkin",checkin.value);
            sessionStorage.setItem("checkout",checkout.value);
        }
        catch(error)
        {
            alert("Could Not Save Date: "+error.message);
        }
    }
);
checkin.min=new Date().toLocaleDateString("en-CA");
checkout.min=new Date().toLocaleDateString("en-CA");