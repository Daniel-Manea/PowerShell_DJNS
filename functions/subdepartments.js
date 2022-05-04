$(document).on("ready", function () {
  $("#department").on("change", function () {
    var el = $(this);

    if (el.val() === "") {
      document.getElementById("subdep_container").style.display = "none";
      $("#subdepartment").empty();
      $("#subject").empty();
      document.getElementById("subject_container").style.display = "none";
    } else {
      document.getElementById("subject_container").style.display = "none";
      $("#subdepartment").empty();
      $("#subject").empty();
      document.getElementById("subdep_container").style.display = "block";
    }

    if (el.val() === "DIREKTION") {
      $("#subdepartment").append(
        "<option value=''>...</option>,<option  value=''>Marketing og kommunikation</option>,<option  value=''> It-strategi</option>,<option >Økonomi og personale</option>,<option>It-drift og support</option>,<option>Kantiner Aarhus N, Viby og Tilst</option>,<option >Intern service</option><option >Bygningsafdelingen</option>"
      );
    } else if (el.val() === "UNG") {
      $("#subdepartment").append(
        "<option value=''>...</option>,<option  value=''>Skolekontakt og rekruttering</option>,<option  value=''>Kvalitet og udvikling</option>,<option value=''>Studieservice</option>,<option value='UNG_GYMNASIUM_AARHUS_C'>AARHUS GYMNASIUM AARHUS C</option>,<option value='UNG_GYMNASIUM_TILST'>AARHUS GYMNASIUM TILST</option>,<option value='UNG_GYMNASIUM_SYD'>AARHUS GYMNASIUM SYD</option>,<option value='UNG_EUX'>EUX og Skills Akademiet</option>"
      );
    } else if (el.val() === "ERHV") {
      $("#subdepartment").append(
        "<option value=''>...</option>,<option  value=''>Uddannelses og praktikcenter</option>,<option  value=''>Kvalitet og udvikling</option>,<option value='ERHV_STUDIESERVICE'>Studieservice</option>,<option value='ERHV_BYGGERI'>Skole for byggeri</option>,<option value='ERHV_TEKNIK'>Skole for teknik</option>,<option value='ERHV_GASTRONOMI'>Skole for trends og gastronomi</option>,<option value='ERHV_TRANSPORT'>Skole for transport, medie og service</option>,<option value='ERHV_TEKNOLOGI'>Skole for it og teknologi</option>"
      );
    }
  });

  $("#subdepartment").on("change", function () {
    var el = $(this);
    if (el.val() === "") {
      $("#subject").empty();
      document.getElementById("subject_container").style.display = "none";
    } else {
      $("#subject").empty();
      document.getElementById("subject_container").style.display = "block";
    }

    if (el.val() === "UNG_GYMNASIUM_AARHUS_C") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>AARHUS GYMNASIUM, Aarhus C</option>"
      );
    } else if (el.val() === "UNG_GYMNASIUM_TILST") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>AARHUS GYMNASIUM, Tilst</option>"
      );
    } else if (el.val() === "UNG_GYMNASIUM_SYD") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>AARHUS GYMNASIUM, Skanderborg</option>,<option  value=''>AARHUS GYMNASIUM, Viby</option>"
      );
    } else if (el.val() === "UNG_EUX") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Campus Syd</option>,<option  value=''>Campus Nord</option>"
      );
    }

    if (el.val() === "ERHV_STUDIESERVICE") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Skolehjemmet</option>"
      );
    } else if (el.val() === "ERHV_BYGGERI") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Byggeri og snedkeri</option>"
      );
    } else if (el.val() === "ERHV_TEKNIK") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Metal og teknik</option>"
      );
    } else if (el.val() === "ERHV_GASTRONOMI") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Kantinen, Aarhus C</option>,<option  value=''>Gastronom, bager og konditor</option>"
      );
    } else if (el.val() === "ERHV_TRANSPORT") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Transport og logistik</option>,<option  value=''>Media og design</option>,<option  value=''>Facility services</option>"
      );
    } else if (el.val() === "ERHV_TEKNOLOGI") {
      $("#subject").append(
        "<option  value=''>...</option>,<option  value=''>Mekaniker og elektriker</option>,<option  value=''>IT og elektronik</option>"
      );
    }
  });
});
