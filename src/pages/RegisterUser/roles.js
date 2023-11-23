export const roles = [
  { id: "admin", value: "ADMIN", name: "Administrador" },
  { id: "coord", value: "COORDENADOR_DE_CURSO", name: "Coordenador" },
  { id: "prof", value: "PROFESSOR", name: "Professor" },
];

export const formatRoles = (role) => {
  switch (role) {
    case "ADMIN":
      return "Administrador";
    case "COORDENADOR_DE_CURSO":
      return "Coordenador";
    case "PROFESSOR":
      return "Professor";
    case "ALUNO":
      return "Aluno";
    default:
      return "Não definido";
  }
};
