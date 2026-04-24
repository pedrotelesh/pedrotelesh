(function(){
  const translations = {
    en: {
      "title": "Pedro Teles | Software Developer",
      "meta.description": "Software Developer. Awarded in math olympiads, with strong logical reasoning.",
      "og.title": "Pedro Teles | Software Developer",
      "og.description": "Software Developer. Awarded in math olympiads, with strong logical reasoning.",
      "nav.experience":"Experience",
      "nav.brands":"Brands",
      "nav.projects":"Projects",
      "nav.education":"Education",
      "nav.contact":"Contact",
      "main.title":"Software<br>Developer",
      "resume.button":"Resume",
      "experience.subtitle":"Experience",
      "experience.p1":"Early-career professional interested in development with strong <strong>logical reasoning</strong>. Awarded in <strong>mathematics olympiads</strong>, with analytical performance and dedication.",
      "skeps.role1":"Junior Software Developer",
      "skeps.role2":"Intern",
      "skeps.p":"At Skeps I work on ChatBots on the Blip platform and create scripts in JavaScript and TypeScript.",
      "plus.role":"Back Office Intern",
      "plus.p":"At Plus Promotora I worked on sales auditing using Google Sheets and audio editing with Audacity.",
      "brands.subtitle":"Brands",
      "brands.p":"Companies from <strong>various industries</strong> trust my work; I always aim to deliver solutions of <strong>high quality and impact</strong>.",
      "projects.subtitle":"Projects",
      "project.peter.desc":"Discord ChatBot providing AI commands and used by over 80,000 users!",
      "projects.lang.ai":"AI",
      "education.course.anhanguera":"Software Engineering (BSc)",
      "education.course.origamid":"Front End and UX/UI Design",
      "education.subtitle":"Education",
      "formation.p":"My most recent training was the Front End and UX/UI Design course I took at Origamid. I am also a two-time medalist of the Kangaroo Math Olympiad and plan to study Software Engineering next year.",
      "courses.title":"Intensive Courses",
      "languages.title":"Languages",
      "language.english":"English / Intermediate",
      "course.hours":"23 hours",
      "contact.email":"contact@pedroteles.com.br",
      "education.highschool":"High School",
      "education.elementary":"Elementary School",
      "footer.made":"Made with ❤️ in Belo Horizonte!",
      "footer.copy":"© <span id=\"ano-atual\"></span> Pedro Teles. All rights reserved."
    },
    pt: {
      "title":"Pedro Teles | Desenvolvedor",
      "meta.description":"Desenvolvedor de Software. Premiado em olimpíadas de matemática, com sólido raciocínio lógico.",
      "og.title":"Pedro Teles | Desenvolvedor",
      "og.description":"Desenvolvedor de Software. Premiado em olimpíadas de matemática, com sólido raciocínio lógico.",
      "nav.experience":"Experiência",
      "nav.brands":"Marcas",
      "nav.projects":"Projetos",
      "nav.education":"Formação",
      "nav.contact":"Contato",
      "main.title":"Desenvolvedor<br>de Software",
      "resume.button":"Currículo Virtual",
      "experience.subtitle":"Experiência",
      "experience.p1":"Profissional em início de carreira, com interesse em desenvolvimento e sólido <strong>raciocínio lógico</strong>. Premiado em <strong>olimpíadas de matemática</strong>, com destaque para o desempenho analítico e a dedicação.",
      "skeps.role1":"Desenvolvedor de Software Junior",
      "skeps.role2":"Estagiário",
      "skeps.p":"Na Skeps, trabalho com desenvolvimento de ChatBots na plataforma Blip e criação de scripts em JavaScript e TypeScript.",
      "plus.role":"Estagiário Back Office",
      "plus.p":"Na Plus Promotora, trabalhei com auditoria de vendas utilizando o Google Sheets e edição de áudio com o Audacity.",
      "brands.subtitle":"Marcas",
      "brands.p":"Empresas de <strong>diversos segmentos</strong> confiam no meu trabalho, onde busco sempre entregar soluções de <strong>alta qualidade e impacto</strong>.",
      "projects.subtitle":"Projetos",
      "project.peter.desc":"ChatBot para Discord, trazendo comandos de IA e já utilizado por mais de 80 mil usuários!",
      "projects.lang.ai":"IA",
      "education.course.anhanguera":"Engenharia de Software (Bacharelado)",
      "education.course.origamid":"Front End e UX/UI Design",
      "education.subtitle":"Formação",
      "formation.p":"Minha mais recente formação foi o curso de <b>Front End</b> e <b>UX/UI Design</b> que fiz na Origamid. Além disso, sou <b>bi-medalhista</b> da <b>Olimpíada Canguru de Matemática</b> e pretendo cursar Engenharia de Software no próximo ano.",
      "courses.title":"Cursos Intensivos",
      "languages.title":"Idiomas",
      "language.english":"Inglês / Intermediário",
      "course.hours":"23 horas",
      "contact.email":"contato@pedroteles.com.br",
      "education.highschool":"Ensino Médio",
      "education.elementary":"Ensino Fundamental",
      "footer.made":"Feito com ❤️ em Belo Horizonte!",
      "footer.copy":"© <span id=\"ano-atual\"></span> Pedro Teles. Todos os direitos reservados."
    }
  };

  const resumeLinks = {
    en: 'https://drive.google.com/file/d/1xl0QKpaMBxpc8PShQDLX5xU2AlskHTLA/view',
    pt: 'https://drive.google.com/file/d/1mMBhQNV6upbxcRPiGGeYOP3AC3CQ9uFE/view'
  };

  function applyLanguage(lang){
    if(!translations[lang]) lang='en';
    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
    const yearLabel = (lang === 'pt') ? '"Ano:"' : '"Year:"';
    document.documentElement.style.setProperty('--year-label', yearLabel);
    const resume = document.querySelector('.botao-principal');
    if(resume){
      const link = resumeLinks[lang] || resumeLinks['en'];
      resume.setAttribute('href', link);
    }
    if(translations[lang]['title']) document.title = translations[lang]['title'];
    const metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc && translations[lang]['meta.description']) metaDesc.setAttribute('content', translations[lang]['meta.description']);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if(ogTitle && translations[lang]['og.title']) ogTitle.setAttribute('content', translations[lang]['og.title']);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if(ogDesc && translations[lang]['og.description']) ogDesc.setAttribute('content', translations[lang]['og.description']);

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const text = translations[lang][key];
      if(typeof text !== 'undefined') el.innerHTML = text;
      else if(el.dataset.default) el.innerHTML = el.dataset.default;
    });

    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  const saved = localStorage.getItem('lang') || 'en';

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-i18n]').forEach(el=>{ if(!el.dataset.default) el.dataset.default = el.innerHTML; });
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.addEventListener('click', function(){
        const lang = this.dataset.lang;
        localStorage.setItem('lang', lang);
        applyLanguage(lang);
      });
    });
    applyLanguage(saved);
  });
})();
