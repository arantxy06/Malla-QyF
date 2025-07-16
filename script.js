const malla = {
  "1° Semestre": [
    { nombre: "Química General I" },
    { nombre: "Biología Celular" },
    { nombre: "Cálculo Diferencial" },
    { nombre: "Salud Digital" }
  ],
  "2° Semestre": [
    { nombre: "Química General II", prereq: ["Química General I"] },
    { nombre: "Matemática" },
    { nombre: "Física" },
    { nombre: "Antropología Ética" }
  ],
  "3° Semestre": [
    { nombre: "Química Orgánica", prereq: ["Química General II"] },
    { nombre: "Fisicoquímica" },
    { nombre: "Bioestadística" },
    { nombre: "Persona y Sociedad" }
  ]
  // 👉 Continúa agregando los demás semestres y ramos aquí
};

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

