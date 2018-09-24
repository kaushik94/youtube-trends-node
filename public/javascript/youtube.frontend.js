$('#countrySelector').change(function(e) {
    window.location.href = '?country='+e.target.value;
});