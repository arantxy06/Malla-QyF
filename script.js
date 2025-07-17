
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
const approvedCourses = JSON.parse(localStorage.getItem('approvedCourses')) || [];

const mallaDiv = document.getElementById('malla');

function renderMalla() {
  mallaDiv.innerHTML = '';
  Object.keys(malla).forEach(semestre => {
    const semestreDiv = document.createElement('div');
    semestreDiv.classList.add('semester');
    semestreDiv.innerHTML = `<h2>${semestre}</h2>`;

    malla[semestre].forEach(curso => {
      const courseDiv = document.createElement('div');
      courseDiv.classList.add('course');
      courseDiv.textContent = curso.nombre;

      if (approvedCourses.includes(curso.nombre)) {
        courseDiv.classList.add('approved');
      } else if (curso.prereq && !curso.prereq.every(r => approvedCourses.includes(r))) {
        courseDiv.classList.add('locked');
      }

      courseDiv.addEventListener('click', () => {
        if (courseDiv.classList.contains('locked')) return;
        if (approvedCourses.includes(curso.nombre)) {
          approvedCourses.splice(approvedCourses.indexOf(curso.nombre), 1);
        } else {
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

