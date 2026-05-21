const subjectsData = [
    { name: "Operation", code: "OR", coefficient: 2, type: "exam_td" },
    { name: "MPD", code: "MPD", coefficient: 2, type: "exam_td" },
    { name: "Four et chaudières", code: "FC", coefficient: 2, type: "exam_td" },
    { name: "thrmo", code: "TH", coefficient: 2, type: "exam_td" },
    { name: "stat", code: "ST", coefficient: 3, type: "exam_tp_td" },
    { name: "environment", code: "EN", coefficient: 1, type: "exam" },
    { name: "simulation", code: "SM", coefficient: 2, type: "exam_tp" },
    { name: "elaboration", code: "EL", coefficient: 1, type: "exam" },
    { name: "entreprenariat", code: "ER", coefficient: 1, type: "exam" },
    { name: "stage", code: "SG", coefficient: 1, type: "exam" },
    { name: "TP GC", code: "TPGC", coefficient: 1, type: "exam" }
];

const container = document.getElementById("subjects-container");

subjectsData.forEach(sub => {
    const div = document.createElement("div");
    div.className = "subject";

    div.innerHTML = `
        <div class="subject-title">
            ${sub.name}
            <span class="coefficient">المعامل ${sub.coefficient}</span>
        </div>
        <div class="input-group">
            ${sub.type.includes("exam") ? `
            <div class="input-field">
                <label>Exam</label>
                <input type="number" id="${sub.code}-exam" min="0" max="20">
            </div>` : ""}

            ${sub.type.includes("tp") ?`
            <div class="input-field">
                <label>TP</label>
                <input type="number" id="${sub.code}-tp" min="0" max="20">
            </div>` : ""}

            ${sub.type.includes("td") ? `
            <div class="input-field">
                <label>TD</label>
                <input type="number" id="${sub.code}-td" min="0" max="20">
            </div>` : ""}
        </div>

        <div class="subject-average" id="${sub.code}-average">
            معدل المادة: 0.00
        </div>
    `;

    container.appendChild(div);
});

function calculateAverage() {
    let total = 0;
    let coeffSum = 0;

    subjectsData.forEach(sub => {
        const exam = document.getElementById(`${sub.code}-exam`);
        const tp   = document.getElementById(`${sub.code}-tp`);
        const td   = document.getElementById(`${sub.code}-td`);

        const e = exam ? parseFloat(exam.value) || 0 : 0;
        const t = tp ? parseFloat(tp.value) || 0 : 0;
        const d = td ? parseFloat(td.value) || 0 : 0;

        let avg = 0;
        if (sub.type === "exam") avg = e;
        if (sub.type === "exam_td") avg = 0.6 * e + 0.4 * d;
        if (sub.type === "exam_tp") avg = 0.6 * e + 0.4 * t;
        if (sub.type === "exam_tp_td") avg = 0.6 * e + 0.2 * t + 0.2 * d;

        document.getElementById(`${sub.code}-average`).textContent =
            `معدل المادة: ${avg.toFixed(2)}`;

        total += avg * sub.coefficient;
        coeffSum += sub.coefficient;
    });

    if (coeffSum > 0) {
        document.getElementById("final-average").textContent =
            (total / coeffSum).toFixed(2);

        document.getElementById("result").style.display = "block";
    }
}

document.addEventListener("input", calculateAverage);