﻿
var routeURL = location.protocol + "//" + location.host;
$(document).ready(function () {
    $("#appointmentDate").kendoDateTimePicker({
        value: new Date(),
        dateInput: false
    });
    InitializeCalendar();
});
var calendar;
function InitializeCalendar() {
    try {
        var calendarEl = document.getElementById('calendar');
        if (calendarEl != null) {
            calendar = new FullCalendar.Calendar(calendarEl, {
                locale: 'nl',
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                selectable: true,
                weekNumbers: true,
                editable: false,
                select: function (event) {
                    onShowModal(event, null);
                }
            });
            calendar.render();
        }
    }
    catch (e) {
        alert(e);
    }
}
function onShowModal(obj, isEventDeail){
    $("#appointmentInput").modal("show");
}

function onCloseModal() {
    $("#appointmentInput").modal("hide");
}
function onSubmitForm() {
    if (!checkValidation()) return;
    var requestData = {
        Id: parseInt($("id").val()),
        Title: $("#title").val(),
        Description: $("#description").val(),
        StartDate: $("#AppointmentDate").val(),
        Duration: $("#duration").val(),
        DoctorId: $("#doctorId").val(),
        PatientId: $("#patientId").val(),
    };
    $.ajax({
        url: routeURL + "/api/AppointmentAPI/SaveCalendarData",
        type: "POST",
        data: JSON.stringify(requestData),
        contentType: "application/json",
        success: function (response) {
            if (response.status === 1 || response.status === 2) {
                $.notify(response.message, "success");
                onCloseModal();
            } else {
                $.notify(response.message, "error");
            }
        },
        error: function (xhr) {
            $.notify("Error", "Foutje");
        }
    });
}

function checkValidation() {
    var isValid = true;
    if ($("#title").val() === undefined || $("#title").val().trim() === "") {
        isValid = false;
        $("#title").addClass("error");
    } else {
        $("#title").removeClass("error");
    }
    if ($("#appointmentDate").val() === undefined || $("#title").val().trim() === "") {
        isValid = false;
        $("#appointmentDate").addClass("error");
    } else {
        $("#appointmentDate").removeClass("error");
    }
    return isValid
}