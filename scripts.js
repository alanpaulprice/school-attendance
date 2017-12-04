// ===== MODEL =====
let model = {
  // Invents random attendance/days missed data for each student
  // included for demonstration purposes
  init: () => {
    model.records.forEach((item) => {
      let checkCount = 0;

      for (let i = 0; i < 12; i++) {
        let state = (Math.random() >= 0.5);
        item.attendance.push(state);

        if (!state) checkCount++;
      }
      item.daysMissed = checkCount;
    });
  },

  records: [{
      name: "Hank",
      attendance: [],
      daysMissed: null
    },
    {
      name: "Joe",
      attendance: [],
      daysMissed: null
    },
    {
      name: "George",
      attendance: [],
      daysMissed: null
    },
    {
      name: "Ted",
      attendance: [],
      daysMissed: null
    },
    {
      name: "Pat",
      attendance: [],
      daysMissed: null
    }
  ]
}; // ===== MODEL =====
// ===== ===== ===== ===== =====
// ===== OCTOPUS =====
let octopus = {
  init: () => {
    model.init();
    view.init(model.records);
  },

  checkboxStateChange: (index, i, checked) => {
    // if a checkbox state was altered, adjusts records accordingly
    let daysMissed = document.getElementById("days-missed-readout-" + index);
    
    if (checked) {
      model.records[index].attendance[i] = true;
      model.records[index].daysMissed--;
      daysMissed.textContent--;
    } else {
      model.records[index].attendance[i] = false;
      model.records[index].daysMissed++;
      daysMissed.textContent++;
    }
  }
}; // ===== OCTOPUS =====
// ===== ===== ===== ===== =====
// ===== VIEW =====
let view = {
  init: (records) => {

    let table = document.getElementById("table");
    // Creates a full row structure for each student
    records.forEach((item, ind) => {
      // ===== CREATE ROW =====
      let tableRow = document.createElement("div");
      tableRow.id = "table-row-student" + ind;
      tableRow.classList.add("table-row");
      table.appendChild(tableRow);

      // ===== CREATE NAME COL =====
      let colName = document.createElement("div");
      colName.classList.add("table-col-name");
      colName.textContent = item.name;
      tableRow.appendChild(colName);

      // ===== CREATE DAYS COL =====
      let colDays = document.createElement("div");
      colDays.classList.add("table-col-days");
      tableRow.appendChild(colDays);

      // ===== DIV / CHECKBOX =====
      for (let i = 0; i < 12; i++) {
        let div = document.createElement("div");
        colDays.appendChild(div);

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");

        if (item.attendance[i]) {
          checkbox.checked = true;
        }

        checkbox.addEventListener("click", () => {
          octopus.checkboxStateChange(ind, i, checkbox.checked);
        });

        div.appendChild(checkbox);
      }

      // ===== CREATE DAYS MISSED COL =====
      let colDaysMissed = document.createElement("div");
      colDaysMissed.id = "days-missed-readout-" + ind;
      colDaysMissed.classList.add("table-col-days-missed");
      colDaysMissed.textContent = item.daysMissed;
      tableRow.appendChild(colDaysMissed);
    });
  }
}; // ===== VIEW =====

octopus.init();
