function showErrorModal(errMsg) {
    let output =
        "<div id='scrnOverlay'></div>" +
        "<section id='errWin' class='window'><ul>" +
        errMsg +
        "</ul><a href='#' id='errBtn' class='button'>Close</a></section>";

    $("body").after(output);
    $("#scrnOverlay").css("visibility", "visible");

    $("#errWin").show();

    $("#errBtn").click(function () {
        $("#scrnOverlay").remove();
        $("#errWin").remove();
    });
}

function loadJSON() {
    $.getJSON("database/restaurants_db.json", data => {

        let output = "";

        $.each(data, (i, r) => {
            output += `
                <section>
                    <h2>${r.name}</h2>
                    <img src="${r.image}" alt="${r.alt}" style="max-width:400px;">
                    <p><em>${r.image_text}</em></p>
                    <p>${r.description}</p>
                    <ul>
                        <li><b>Cuisine:</b> ${r.cuisine}</li>
                        <li><b>Signature Dish:</b> ${r.signatureDish}</li>
                        <li><b>Price Range:</b> $${r.priceMin}-${r.priceMax} per person</li>
                        <li><b>Deposit:</b> $${r.deposit}</li>
                    </ul>
                </section>
            `;
        });

        if (output === "") {
            output = "<p>No restaurants found. Please contact us for more information.</p>";
        }
        $("#restaurant_list").html(output);
    });
}

function loadRecommendations() {
    $.getJSON("database/restaurants_db.json", (data) => {

        let output = "";

        let minBudget = parseFloat($("#min_budget").val());
        let maxBudget = parseFloat($("#max_budget").val());

        if (isNaN(minBudget)) minBudget = 0;
        if (isNaN(maxBudget)) maxBudget = Infinity;

        let diet = $("#recommend_diet").val();
        let occasion = $("#recommend_occasion").val();
        let includeDeposit = $("#include_deposit").is(":checked");

        $.each(data, (i, r) => {

            let minPrice = parseFloat(r.priceMin);
            let maxPrice = parseFloat(r.priceMax);
            let deposit = parseFloat(r.deposit);

            if (includeDeposit) {
                minPrice += deposit;
                maxPrice += deposit;
            }

            let dietMatch =
                diet === "" || diet === "none" || !r.diet || r.diet.includes(diet);

            let occasionMatch =
                occasion === "" || occasion === "none" || !r.occasion || r.occasion.includes(occasion);

            let budgetMatch =
                minPrice <= maxBudget && maxPrice >= minBudget;

            if (budgetMatch && dietMatch && occasionMatch) {
                output += `
                    <section>
                        <h2>${r.name}</h2>
                        <img src="${r.image}" alt="${r.alt}" style="max-width:300px;">
                        <p>${r.description}</p>
                        <button onclick="selectRestaurant('${r.name}')">Select</button>
                    </section>
                `;
            }
        });

        if (output === "") {
            output = "<p>No restaurants match your criteria.</p>";
        }
        $("#recommend_results").html(output);
    });
}

function validateRecommendations() {
    let minBudget = $("#min_budget").val();
    let maxBudget = $("#max_budget").val();

    let errMsg = "";

    if (minBudget === "" && maxBudget === "") {
        errMsg += "<li>Please enter at least one budget value.</li>";
    }

    if (minBudget !== "" && maxBudget !== "" && parseFloat(minBudget) > parseFloat(maxBudget)) {
        errMsg += "<li>Minimum budget cannot be greater than maximum budget.</li>";
    }

    if (errMsg !== "") {
        showErrorModal(errMsg);
        return false;
    }

    return true;
}

function executeRecommendations() {
    if (validateRecommendations()) {
        loadRecommendations();
    }
}

function validateRegister() {
    var username = $("#register_username").val();
    var email = $("#register_email").val();
    var phone = $("#register_phone").val();
    var pwd1 = $("#register_password").val();
    var pwd2 = $("#register_confirm_password").val();
    var gender = $("#register_gender").val();

    var errMsg = "";
    var result = true;

    var usernamePattern = /^\w+$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^[0-9]{8,15}$/;
    var upperPattern = /[A-Z]/;
    var lowerPattern = /[a-z]/;
    var numberPattern = /[0-9]/;
    var specialPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (username == "") errMsg += "<li>Username is required.</li>";
    if (email == "") errMsg += "<li>Email is required.</li>";
    if (phone == "") errMsg += "<li>Phone number is required.</li>";
    if (pwd1 == "") errMsg += "<li>Password is required.</li>";
    if (pwd2 == "") errMsg += "<li>Confirm password is required.</li>";
    if (gender == "") errMsg += "<li>Gender must be selected.</li>";

    if (username != "") {
        if (username.length < 5) errMsg += "<li>Username must be at least 5 characters.</li>";
        if (!usernamePattern.test(username)) errMsg += "<li>Username can only contain letters, numbers, and underscores.</li>";
    }

    if (email != "" && !emailPattern.test(email)) errMsg += "<li>Invalid email format.</li>";
    if (phone != "" && !phonePattern.test(phone)) errMsg += "<li>Phone must be 8–15 digits only.</li>";

    if (pwd1 != "") {
        if (pwd1.length < 10) errMsg += "<li>Password must be at least 10 characters.</li>";
        if (!upperPattern.test(pwd1)) errMsg += "<li>Password must contain at least one uppercase letter.</li>";
        if (!lowerPattern.test(pwd1)) errMsg += "<li>Password must contain at least one lowercase letter.</li>";
        if (!numberPattern.test(pwd1)) errMsg += "<li>Password must contain at least one number.</li>";
        if (!specialPattern.test(pwd1)) errMsg += "<li>Password must contain at least one special character.</li>";
    }

    if (pwd1 != "" && pwd2 != "" && pwd1 != pwd2) errMsg += "<li>Passwords do not match.</li>";

    if (errMsg != "") {
        showErrorModal(errMsg);
        result = false;
    }

    return result;
}

function loadReservationRestaurants(callback) {
    $.getJSON("database/restaurants_db.json", (data) => {

        let options = "<option value=''>Select Restaurant</option>";

        $.each(data, (i, r) => {
            options += `<option value="${r.name}" data-deposit="${r.deposit}">${r.name}</option>`;
        });

        $("#reserve_restaurant").html(options);

        if (typeof callback === "function") callback();
    });
}

$(document).on("change", "#reserve_restaurant", function () {
    let deposit = $(this).find(":selected").data("deposit");
    if (deposit !== undefined && deposit !== "") {
        $("#reserve_deposit_amount").text("$" + deposit);
    } else {
        $("#reserve_deposit_amount").text("");
    }
});

$(document).on("change", "#reserve_deposit_method", function () {
    let method = $(this).val();
    if (method === "reserve_deposit_voucher") {
        $("#voucher_box").show();
        $("#credit_box").hide();
    } else if (method === "reserve_deposit_credit") {
        $("#credit_box").show();
        $("#voucher_box").hide();
    } else {
        $("#voucher_box, #credit_box").hide();
    }
});

$(document).on("input", "#reserve_email", function () {
    if ($("#reserve_billing_email_same_as").is(":checked")) {
        $("#reserve_billing_email").val($(this).val());
    }
});

$(document).on("change", "#reserve_billing_email_same_as", function () {
    if ($(this).is(":checked")) {
        $("#billing_email_box").hide();
        $("#reserve_billing_email").val($("#reserve_email").val());
    } else {
        $("#billing_email_box").show();
        $("#reserve_billing_email").val("");
    }
});

function validateReservation() {
    let errMsg = "";

    let name = $("#reserve_name").val().trim();
    let email = $("#reserve_email").val().trim();
    let phone = $("#reserve_phone").val().trim();
    let restaurant = $("#reserve_restaurant").val();
    let date = $("#reserve_date").val();
    let time = $("#reserve_time").val();
    let guests = $("#reserve_guests").val();
    let depositMethod = $("#reserve_deposit_method").val();
    let voucher = $("#reserve_deposit_voucher_code").val().trim();
    let card = $("#reserve_deposit_credit_code").val().trim();

    if (name === "") errMsg += "<li>Full name is required.</li>";
    if (email === "") errMsg += "<li>Email is required.</li>";
    if (phone === "") errMsg += "<li>Phone number is required.</li>";
    if (restaurant === "") errMsg += "<li>Restaurant must be selected.</li>";
    if (date === "") errMsg += "<li>Reservation date is required.</li>";
    if (time === "") errMsg += "<li>Reservation time is required.</li>";
    if (guests === "") errMsg += "<li>Number of guests is required.</li>";
    if (depositMethod === "") errMsg += "<li>Deposit method is required.</li>";

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "" && !emailPattern.test(email)) errMsg += "<li>Invalid email format.</li>";

    let phoneDigits = phone.replace(/\D/g, "");
    if (phone !== "" && phoneDigits.length < 10) errMsg += "<li>Phone number must contain at least 10 digits.</li>";

    if (guests !== "" && parseInt(guests) <= 0) errMsg += "<li>Number of guests must be greater than 0.</li>";

    if (date !== "") {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(date) < today) errMsg += "<li>Reservation date cannot be in the past.</li>";
    }

    if (depositMethod === "reserve_deposit_voucher") {
        if (voucher === "") errMsg += "<li>Voucher code is required.</li>";
    } else if (depositMethod === "reserve_deposit_credit") {
        if (card === "") {
            errMsg += "<li>Credit card number is required.</li>";
        } else {
            let digits = card.replace(/\D/g, "");
            if (digits.length !== 16 && digits.length !== 15) {
                errMsg += "<li>Credit card must be 15 or 16 digits.</li>";
            }
        }
    }

    if (errMsg !== "") {
        showErrorModal(errMsg);
        return false;
    }

    return true;
}

$(function () {
    loadJSON();
    loadReservationRestaurants();

    $("#recommend_submit").click(executeRecommendations);
    $("#register_form").submit(validateRegister);
    $("#survey").submit(validateReservation);
});
