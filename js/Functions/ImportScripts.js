function require(script) {
    $.ajax({
        url: script,
        dataType: "script",
        success: function () {},
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}
