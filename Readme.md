# COS10005 - Assignment 2

## Overview

For this assignment, I have created a webpage for "Lager on the Valley" which acts as a booking system for a variety of locations. The website was developed using HTML, CSS, JavaScript, jQuery, and JSON. The website enables users to browse different restaurant locations, receive tailored restaurant recommendations, make reservations, and create an account.

The project implements responsive design, dynamic content loading from a central JSON database, form validation, and jQuery DOM manipulation.

## Design Choices

* Centralised restaurant data into a single JSON database to enable easy management of restaurant details.

## Pages

### Home Page - index.html

* Presents users with details of the Lager on the Valley restaurant chain.

### Restaurant Listing - restaurants.html

* Loads details of restaurants dynamically from a JSON file.
* Each restaurant displays:

  * A name
  * Image
  * Description
  * Cuisine
  * Signature dish
  * Price range
  * Deposit amount

### Recommendation - recommend.html

* Enables users to select different criteria to filter restaurants that meet their requirements, including:

  * Dietary requirements
  * Budget range (can include deposit)
  * Occasion
* Users can select a restaurant, which will take them to the reservation page with the selected restaurant already prefilled.
* The webpage validates that the user has selected either a minimum or maximum budget.

### Reservation - reservation.html

* Can be used to create a reservation for a restaurant.
* All values are checked as valid inputs for:

  * Full name
  * Email address
  * Phone number
  * Restaurant
  * Date and time
  * Number of guests
  * Deposit method

### User Registration - register.html

* Users can create an account.

### Errors

* If a user encounters an error with any of their inputs, a window will open to display the current errors.
* No form can be submitted until all user inputs have been validated.

### Project Structure

assignment2/
-index.html
-restaurants.html
-reservation.html
-recommend.html
-register.html
-bill.html
    Section/
        nav.html
        footer.html
    design/
        css/
            -style.css
            -mobile.css
            -tablet.css
            -desktop.css
        js/
            -jquery-1.9.1.min.js
            -script.js
        images/
    database/
        -restaurants_db.json

## JavaScript validation logic
The website uses JavaScpt and jQuery to check the user input before forms are submitted. 

showErrorModal() is used to display all current errors messages. Each error are stored in 1 location that will then be used in a window popup. 

The validateRecommendations() is used to check that at least 1 budget value has been inputed for on the recommendation page. if an error occurs an error message is displated and recommendations will not be created.

The validateRegister() will be used to check all inputs for the registration form, it will check username, email address, phone number, password, confirm password and gender.

the validateReservation() checks for the requirements for Full Name, Email, Phone Number, Restaurnat selection, Reservation date, Reservation time, Number of guests and deposit method.

We are also able to create dynamic interaction when a user make selection on webpages. this may include:
* Restaurant list loading automatically from JSON file
* Reservation deposit amount changes when a restaurnat is selected
* Voucher or Credit card is selected in depsoit method and will create an input for only 1 or the other options
* the billing email address can automatically transfered from reservation email when user selects "billing email same as Reservation Email: checkbox
## Known issues or limitation
* Registration details are not currently able to be saved to be used for prefill for reservation page
* Recommendation Page doesn't have a window popup for when no restaurants match user criteria, instead only text is displayed at bottom which can be difficult to see.

## Author
Ben Slavin

## References

[1] Alex Svenson (2016). *Pub Village Traditional Brown - Free photo on Pixabay*. [online] Pixabay.com. Available at: https://pixabay.com/photos/pub-village-pub-traditional-1653988/.

[2] Pixabay.com. (2025). *Pixabay*. [online] Available at: https://pixabay.com/photos/bar-local-ireland-irish-pub-pub-209148/.

[3] Givisas (2018). *Dublin Pub Ireland - Free photo on Pixabay*. [online] Pixabay.com. Available at: https://pixabay.com/photos/dublin-pub-ireland-beer-3848404/.

[4] Michelle Maria (2024). *Restaurant Bar Pub - Free photo on Pixabay*. [online] Pixabay.com. Available at: https://pixabay.com/photos/restaurant-bar-pub-liquor-party-9067032/.

[5] StillWZ (2017). *Canton Pub Sunset - Free photo on Pixabay*. [online] Pixabay.com. Available at: https://pixabay.com/photos/canton-pub-sunset-guangzhou-2391789/.

[6] Pixabay.com. (2026). Available at: https://pixabay.com/photos/pub-irish-pub-ireland-facade-5631898/.

[7] Michael Schueller (2017). *England Pub Small - Free photo on Pixabay*. [online] Pixabay.com. Available at: https://pixabay.com/photos/england-pub-small-margate-2704975/.
