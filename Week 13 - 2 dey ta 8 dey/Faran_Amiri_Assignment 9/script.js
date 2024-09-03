document.addEventListener("DOMContentLoaded", function() {
    //this code ensures that your JavaScript code inside the provided function is executed only after the HTML document has been completely loaded, which is useful to ensure that the DOM (Document Object Model) is ready for manipulation.
    const menu = document.getElementById("menu");
    const orders = document.getElementById("orders");

    menu.addEventListener("click", function(event) {
        if (event.target.classList.contains("order-button")) {
            // Check if the clicked element has the class 'order-button
            const menuItem = event.target.closest(".item"); //Find the closest ancestor element with the class 'item
            if (menuItem) {
                // Check if the 'menuItem' variable is not null
                const itemName = menuItem.querySelector("h3").textContent; // Get the text content of the <h3> element inside the 'menuItem
                const prepTime = parseInt(menuItem.dataset.time, 10); // Get the value of the 'data-time' attribute from the 'menuItem' and parse it as an integer
                addOrder(itemName, prepTime); // Call the 'addOrder' function with the extracted item name and preparation time
            }
        }
    });

    // Function to add a new order
    function addOrder(itemName, prepTime) {
        const orderItem = document.createElement("div"); // Create a new <div> element and assign it to the 'orderItem' variable
        orderItem.classList.add("order-item"); // Add the 'order-item' class to the 'orderItem' element
        // Set the inner HTML of the 'orderItem' element.
        orderItem.innerHTML = `        
        <h3></h3>
        <p>Preparation time: <span class="countdown"></span> seconds</p>
        <button class="cancel-button">Cancel</button>
      `;

        // Append the new order to the orders container
        orders.appendChild(orderItem);

        startCountdown(orderItem, prepTime);
    }

    // Function to start the countdown for a specific order
    function startCountdown(orderItem, prepTime) {
        const countdownElement = orderItem.querySelector(".countdown");
        let countdownValue = prepTime;
        //This sets up an interval that executes the provided function every 1000 milliseconds.
        const countdownInterval = setInterval(function() {
            countdownValue--; //This decrements the countdownValue variable by 1 on each interval. This variable likely represents the remaining time in seconds for the countdown.

            if (countdownValue >= 0) {
                countdownElement.textContent = countdownValue;
            } else {
                clearInterval(countdownInterval); //This stops the interval by clearing the interval ID returned by setInterval.
                orderItem.classList.add("ready"); //It adds the 'ready' class to the specified orderItem element. This could be used for styling purposes or to indicate that the order is now ready.
                orderItem.querySelector(".cancel-button").remove(); //It finds the cancel button within the orderItem element and removes it from the DOM.
            }
        }, 1000);

        // Event listener for cancel button
        orderItem.querySelector(".cancel-button").addEventListener("click", function() {
            //This part finds the cancel button inside the orderItem element using the querySelector method.This sets up a click event listener on the cancel button. When the cancel button is clicked, the provided function is executed.
            clearInterval(countdownInterval); //Inside the click event handler, this line stops the countdown interval by clearing the interval ID (countdownInterval).
            orderItem.remove(); //This line removes the entire orderItem element from the DOM. This action effectively cancels the order represented by that specific orderItem.
        });
    }
});