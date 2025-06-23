export type Course = {
  id: string;
  name: string;
  level: "Doctorate" | "Master's" | "Diploma";
};

export const COURSES: Course[] = [
  // Graduate School – Doctorate
  { id: "PhD_Com", name: "Doctor of Philosophy in Communication", level: "Doctorate" },
  { id: "PhD_Econ", name: "Doctor of Philosophy in Economics", level: "Doctorate" },
  { id: "PhD_ELS", name: "Doctor of Philosophy in English Language Studies", level: "Doctorate" },
  { id: "PhD_Fil", name: "Doctor of Philosophy in Filipino", level: "Doctorate" },
  { id: "PhD_Psy", name: "Doctor of Philosophy in Psychology", level: "Doctorate" },

  // Graduate School – Master's
  { id: "MAS", name: "Master in Applied Statistics", level: "Master's" },
  { id: "MAC", name: "Master of Arts in Communication", level: "Master's" },
  { id: "MAELS", name: "Master of Arts in English Language Studies", level: "Master's" },
  { id: "MAF", name: "Master of Arts in Filipino", level: "Master's" },
  { id: "MAPhilS", name: "Master of Arts in Philippine Studies", level: "Master's" },
  { id: "MAPhilo", name: "Master of Arts in Philosophy", level: "Master's" },
  { id: "MAP", name: "Master of Arts in Psychology", level: "Master's" },
  { id: "MASocio", name: "Master of Arts in Sociology", level: "Master's" },
  { id: "MSBio", name: "Master of Science in Biology", level: "Master's" },
  { id: "MSCE", name: "Master of Science in Civil Engineering", level: "Master's" },
  { id: "MSCpE", name: "Master of Science in Computer Engineering", level: "Master's" },
  { id: "MSEcon", name: "Master of Science in Economics", level: "Master's" },
  { id: "MSEcE", name: "Master of Science in Electronics Engineering", level: "Master's" },
  { id: "MSIE", name: "Master of Science in Industrial Engineering", level: "Master's" },
  { id: "MSIT", name: "Master of Science in Information Technology", level: "Master's" },
  { id: "MSITHM", name: "Master of Science in International Tourism and Hospitality Management", level: "Master's" },
  { id: "MSMath", name: "Master of Science in Mathematics", level: "Master's" },
  { id: "MSME", name: "Master of Science in Mechanical Engineering", level: "Master's" },
  { id: "MSND", name: "Master of Science in Nutrition and Dietetics", level: "Master's" },
  { id: "PSMREM", name: "Professional Science Masters in Railway Engineering Management", level: "Master's" },

  // Graduate School – Diploma
  { id: "GDipPM", name: "Graduate Diploma in Project Management", level: "Diploma" },

  // Open University System – Doctorate & Master's & Diploma
  { id: "DBA", name: "Doctor in Business Administration", level: "Doctorate" },
  { id: "D_Eng", name: "Doctor in Engineering Management", level: "Doctorate" },
  { id: "PhDEM", name: "Doctor of Philosophy in Education Management", level: "Doctorate" },
  { id: "DPA", name: "Doctor in Public Administration", level: "Doctorate" },
  { id: "MC", name: "Master in Communication", level: "Master's" },
  { id: "MBA", name: "Master in Business Administration", level: "Master's" },
  { id: "MAEM", name: "Master of Arts in Education Management", level: "Master's" },
  { id: "MIT", name: "Master in Information Technology", level: "Master's" },
  { id: "MPA", name: "Master in Public Administration", level: "Master's" },
  { id: "MSCM", name: "Master of Science in Construction Management", level: "Master's" },
  { id: "PBDIT", name: "Post Baccalaureate Diploma in Information Technology", level: "Diploma" },

  // College of Business Administration
  // (DBA and MBA already included above under OUS)

  // College of Education
  { id: "PhDEM_COED", name: "Doctor of Philosophy in Education Management", level: "Doctorate" },
  { id: "MAEM_COED", name: "Master of Arts in Education Management", level: "Master's" },
  { id: "MBE", name: "Master in Business Education", level: "Master's" },
  { id: "MLIS", name: "Master in Library and Information Science", level: "Master's" },
  { id: "MAELT", name: "Master of Arts in English Language Teaching", level: "Master's" },
  { id: "MAEd_ME", name: "Master of Arts in Education major in Mathematics Education", level: "Master's" },
  { id: "MAPES", name: "Master of Arts in Physical Education and Sports", level: "Master's" },
  { id: "MAED_TCA", name: "Master of Arts in Education major in Teaching in the Challenged Areas", level: "Master's" },
  { id: "PBDE", name: "Post-Baccalaureate Diploma in Education", level: "Diploma" },

  // College of Political Science and Public Administration
  { id: "DPA_CPSPA", name: "Doctor in Public Administration", level: "Doctorate" },
  { id: "MPA_CPSPA", name: "Master in Public Administration", level: "Master's" },

  // College of Law
  { id: "JD", name: "Juris Doctor", level: "Doctorate" },
];
