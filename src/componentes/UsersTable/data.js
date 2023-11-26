export const roles = {
  ADMIN: "Administrador",
  COORDENADOR_DE_CURSO: "Coordenador de Curso",
  PROFESSOR: "Professor",
  ALUNO: "Aluno",
};

export const status = {
  APPROVED: "Aprovado",
  DENIED: "Negado",
  WAITING_APPROVAL: "Aguardando Aprovação",
  EMAIL_CHECK: "Verificação de Email",
};

export const roleFilterOptions = [
  { id: "allFilterId", value: "ALL", name: "Todos" },
  { id: "adminFilterId", value: "ADMIN", name: "Administrador" },
  {
    id: "coordenadorFilterId",
    value: "COORDENADOR_DE_CURSO",
    name: "Coordenador",
  },
  { id: "professorFilterId", value: "PROFESSOR", name: "Professor" },
  { id: "alunoFilterId", value: "ALUNO", name: "Aluno" },
];

export const roleShowByPageOptions = [
  { id: "showAll", value: 0, name: "Todos" },
  { id: "5", value: 5, name: "5" },
  { id: "10", value: 10, name: "10" },
  { id: "15", value: 15, name: "15" },
  { id: "20", value: 20, name: "20" },
];
