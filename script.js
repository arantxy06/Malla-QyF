
  "1° Semestre": [
    { nombre: "Química General I" },
    { nombre: "Biología Celular" },
    { nombre: "Matemática" },
    { nombre: "Introducción a las Ciencias Farmacéuticas" },
    { nombre: "Integrado de Habilidades Científicas para el Químico Farmacéutico" },
    { nombre: "Antropología" },
  ],
  "2° Semestre": [
    { nombre: "Química General II", prereq: ["Química General I"] },
    { nombre: "Cálculo Diferencial", prereq: ["Matemática"]},
    { nombre: "Física", prereq: ["Matemática"]},
    { nombre: "Bioestadística", prereq: ["Matemática"] },
    { nombre: "Fundamentos del Quehacer Farmacéutico", prereq: ["Integrado de Habilidades Científicas para el Químico Farmacéutico"] },
    { nombre: "Ética", prereq: ["Antropología"] }
  ],
  "3° Semestre": [
    { nombre: "Química Analítica Cualicuantitativa", prereq: ["Química General II"] },
    { nombre: "Química Orgánica", prereq: ["Química General I"] },
    { nombre: "Fisicoquímica", prereq: ["Química General II"] },
    { nombre: "Fisiología Integrada", prereq: ["Biología Celular"] },
    { nombre: "Salud Poblacional"},
    { nombre: "Gestión Personal y Habilidades para la Vida"}
  ],
  "4° Semestre": [
    { nombre: "Análisis Químico Instrumental", prereq: ["Química Analítica Cualicuantitativa"] },
    { nombre: "Química Orgánica Avanzada", prereq: ["Química Orgánica"] },
    { nombre: "Bioquímica General", prereq: ["Química Orgánica"] },
    { nombre: "Fisiopatología", prereq: ["Fisiología Integrada"] },
    { nombre: "Epidemiología", prereq: ["Salud Poblacional"] }
    ],
"5° Semestre": [
    { nombre: "Farmacología I", prereq: ["Fisiopatología"] },
    { nombre: "Salud Digital" },
    { nombre: "Microbiología General", prereq: ["Bioquímica General"] },
    { nombre: "Tecnología Farmacéutica I", prereq: ["Fisicoquímica"] },
    { nombre: "Química Farmacéutica I", prereq: ["Química Orgánica Avanzada"] },
    { nombre: "Persona y Sociedad", prereq: ["Ética"] }
    ],
    "6° Semestre": [
    { nombre: "Farmacología II", prereq: ["Farmacología I"] },
    { nombre: "Bioética" },
    { nombre: "Tecnología Farmacéutica II", prereq: ["Tecnología Farmacéutica I"] },
    { nombre: "Química Farmacéutica II", prereq: ["Química Farmacéutica I"] },
    { nombre: "Práctica I: Rol del Químico Farmacéutico", prereq: ["Farmacología II"] },
    { nombre: "Electivo I: Formación e Identidad" }
    ],
    "7° Semestre": [
    { nombre: "Metodología de la Investigación" },
    { nombre: "Farmacia Clínica y Atención Farmacéutica I", prereq: ["Farmacología II"] },
    { nombre: "Farmacognosia y Fisioterapia", prereq: ["Química Farmacéutica II"] },
    { nombre: "Control y Aseguramiento de la Calidad Farmacéutica" },
    { nombre: "Legislación Farmacéutica", prereq: ["Tecnología Farmacéutica II"] },
    { nombre: "Electivo II: Formación e Identidad" }
    ],
    "8° Semestre": [
    { nombre: "Farmacia Clínica y Atención Farmacéutica II", prereq: ["Farmacia Clínica y Atención Farmacéutica I"] },
    { nombre: "Biofarmacia", prereq: ["Control y Aseguramiento de la Calidad Farmacéutica"] },
    { nombre: "Toxicología", prereq: ["Farmacología II"] },
    { nombre: "Farmacia Asistencial" },
    { nombre: "Práctica II: Farmacia Comunitaria", prereq: ["Legislación Farmacéutica"] }
    ],
    "9° Semestre": [
    { nombre: "Gestión y Marketing Farmacéutico" },
    { nombre: "Farmacovigilancia y Tecnovigilancia" },
    { nombre: "Electivo I" },
    { nombre: "Electivo II" },
    { nombre: "Electivo III" },
    { nombre: "Electivo III: Formación e Identidad" }
    ],
    "10° Semestre": [
    { nombre: "Internado" },
    ],
approvedCourses = JSON.parse(localStorage.getItem('approvedCourses')) || [];

 mallaDiv = document.getElementById('malla');

n renderMalla() {
  mallaDiv.innerHTML = '';
  Object.keys(malla).forEach(semestre => {
 semestreDiv = document.createElement('div');
    semestreDiv.classList.add('semester');
    semestreDiv.innerHTML = `<h2>${semestre}</h2>`;

    malla[semestre].forEach(curso => {
      courseDiv = document.createElement('div');
      courseDiv.classList.add('course');
      courseDiv.textContent = curso.nombre;

      (approvedCourses.includes(curso.nombre)) {
        courseDiv.classList.add('approved');
      }  (curso.prereq && !curso.prereq.every(r => approvedCourses.includes(r))) {
        courseDiv.classList.add('locked');
      }

      courseDiv.addEventListener('click', () => {
         (courseDiv.classList.contains('locked')) return;
        (approvedCourses.includes(curso.nombre)) {
          approvedCourses.splice(approvedCourses.indexOf(curso.nombre), 1);
        }  {
          approvedCourses.push(curso.nombre);
        }
        localStorage.setItem('approvedCourses', JSON.stringify(approvedCourses));
        renderMalla();
      });

      semestreDiv.appendChild(courseDiv);
    });
    mallaDiv.appendChild(semestreDiv);
  });
}

renderMalla();

