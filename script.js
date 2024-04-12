$(document).ready(function () {

    $('.bi-exclamation-circle').hide();

    $('#grossIncome').on('input', function () {
        var inputVal = $(this).val();
        var $icon = $('#grossIncomeError');
        if (isNaN(inputVal) || inputVal === '') {
            $icon.show();
        } else {
            $icon.hide();
        }
    });

    $('#extraIncome').on('input', function () {
        var inputVal = $(this).val();
        var $icon = $('#extraIncomeError');
        if (isNaN(inputVal) || inputVal === '') {
            $icon.show();
        } else {
            $icon.hide();
        }
    });

    $('#deductions').on('input', function () {
        var inputVal = $(this).val();
        var $icon = $('#deductionsError');
        if (isNaN(inputVal) || inputVal === '') {
            $icon.show();
        } else {
            $icon.hide();
        }
    });



    $('#taxForm').submit(function (event) {
        event.preventDefault();

        // Retrieve input values
        var grossIncome = parseFloat($('#grossIncome').val());
        var extraIncome = parseFloat($('#extraIncome').val() || 0); // Default to 0 if extraIncome is not provided
        var age = $('#age').val();
        var deductions = parseFloat($('#deductions').val() || 0); // Default to 0 if deductions are not provided

        // Validate inputs
        var isValid = true;
        $('.form-control').each(function () {
            if (!$(this)[0].checkValidity()) {
                $(this).siblings('.error-icon').show();
                isValid = false;
            } else {
                $(this).siblings('.error-icon').hide();
            }
        });

        if (!isValid) return;

        // Perform tax calculation
        var taxableIncome = grossIncome + extraIncome - deductions;
        var tax = 0;
        if (taxableIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (taxableIncome - 800000);
            } else if (age === '>=40&<60') {
                tax = 0.4 * (taxableIncome - 800000);
            } else if (age === '>=60') {
                tax = 0.1 * (taxableIncome - 800000);
            }
        }

        var actualIncome = taxableIncome - tax;
        // Display result with commas for Indian style using toLocaleString
        var formattedTax = actualIncome.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'INR'
        });

        $('#taxCalculator').hide();
        $('#taxResult').show();
        $('#resultText').text(formattedTax);

    });
});
