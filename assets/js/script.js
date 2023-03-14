const timeConversions = {
  "hour-9": "9AM",
  "hour-10": "10AM",
  "hour-11": "11AM",
  "hour-12": "12PM",
  "hour-13": "1PM",
  "hour-14": "2PM",
  "hour-15": "3PM",
  "hour-16": "4PM",
  "hour-17": "5PM"
}

var containerEl = $(".container-fluid");
var schedule;

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $('.container-fluid').on('click', '.saveBtn', function() {
    var buttonEl = $(this);
    schedule[buttonEl.parent().attr('id')] = buttonEl.siblings('.description').val();
    localStorage.setItem("schedule", JSON.stringify(schedule));
  })
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  schedule = JSON.parse(localStorage.getItem("schedule"));
  if (schedule === null) {
    schedule = loadDefault();
  }
  containerEl.empty()
  for (const [key, value] of Object.entries(schedule)) {
    var newTimeBlock = $("<div>").addClass("row time-block past").attr('id',key);
    newTimeBlock.append($("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(timeConversions[key]));
    newTimeBlock.append($("<textarea>").addClass("col-8 col-md-10 description").text(value));
    var newButtonEl = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
    newButtonEl.append($("<i>").addClass("fas fa-save").attr("aria-hidden", "true"));
    newTimeBlock.append(newButtonEl);
    containerEl.append(newTimeBlock);
  }
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var currentHour = dayjs().format("H");
  currentHour = 13
  for (const currentTimeBlock of containerEl.children(".time-block")) {
    var currentEl = $(currentTimeBlock);
    var timeDiff = currentEl.attr('id').split("-")[1] - currentHour;
    if (timeDiff == 0) {
      currentEl.addClass("present");
    } else if (timeDiff > 0) {
      currentEl.addClass("future");
    } else {
      currentEl.addClass("past");
    }
  }
  console.log(schedule);
  // TODO: Add code to display the current date in the header of the page.
  const advancedFormat = window.dayjs_plugin_advancedFormat;
  dayjs.extend(advancedFormat);
  $('#currentDay').text(dayjs().format("dddd, MMMM Do"));
});

var loadDefault = function() {
  return {
    "hour-9": "",
    "hour-10": "",
    "hour-11": "",
    "hour-12": "",
    "hour-13": "",
    "hour-14": "",
    "hour-15": "",
    "hour-16": "",
    "hour-17": ""
  };
}