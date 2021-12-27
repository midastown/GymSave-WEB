
document.getElementById("exerciseIndex").setAttribute("value", "1");
document.getElementById("addBtn").addEventListener("click", function() {document.getElementById("addBtn").insertAdjacentHTML('beforebegin', '</br><input type="text" name="exercise[]" placeholder="exercise"> <input type="text" name="repetitions[]" placeholder="repetitions">  <input type="text" name="series[]" placeholder="series">');
    var index = document.getElementById("exerciseIndex");
    index.value++;
});

