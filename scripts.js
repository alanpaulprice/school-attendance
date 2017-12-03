// ===== MODEL =====
let model = {
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
  }
}; // ===== OCTOPUS =====
// ===== ===== ===== ===== =====
// ===== VIEW =====
let view = {
  init: (records) => {

    let table = document.getElementById("table");

    records.forEach((item, ind) => {
      // ===== CREATE ROW =====
      let tableRow = document.createElement("div");
      tableRow.id = "table-student-row-" + ind;
      tableRow.classList.add("table-row");
      table.appendChild(tableRow);

      // ===== CREATE NAME COL =====
      let nameCol = document.createElement("div");
      nameCol.classList.add("name-col");
      nameCol.textContent = item.name;
      tableRow.appendChild(nameCol);

      // ===== CREATE DAYS COL =====
      let daysCol = document.createElement("div");
      daysCol.classList.add("days-col");
      tableRow.appendChild(daysCol);

      // ===== DIV / CHECKBOX =====
      for (let i = 0; i < 12; i++) {
        let div = document.createElement("div");
        daysCol.appendChild(div);

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (item.attendance[i]) {
          checkbox.checked = true;
        }
        div.appendChild(checkbox);
      }

      // ===== CREATE DAYS MISSED COL =====
      let daysMissedCol = document.createElement("div");
      daysMissedCol.classList.add("days-missed-col");
      daysMissedCol.textContent = item.daysMissed;
      tableRow.appendChild(daysMissedCol);

    });
  }
}; // ===== VIEW =====

octopus.init();
