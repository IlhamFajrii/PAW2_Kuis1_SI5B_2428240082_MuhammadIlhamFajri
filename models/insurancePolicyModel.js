let insurancePolicies = [
  {
    id: 1,
    nomorPolis: "POL-001",
    namaPemegang: "Muhammad Ilham Fajri",
    jenis: "Kesehatan",
    premiBulanan: 250000,
    tanggalMulai: "2026-01-10"
  },
  {
    id: 2,
    nomorPolis: "POL-002",
    namaPemegang: "Andi Saputra",
    jenis: "Jiwa",
    premiBulanan: 350000,
    tanggalMulai: "2026-02-15"
  }
];

let nextId = 3;

const getAll = () => {
  return insurancePolicies;
};

const getById = (id) => {
  return insurancePolicies.find((policy) => policy.id === id);
};

const create = (data) => {
  const newPolicy = {
    id: nextId++,
    ...data
  };

  insurancePolicies.push(newPolicy);

  return newPolicy;
};

const update = (id, data) => {
  const index = insurancePolicies.findIndex(
    (policy) => policy.id === id
  );

  if (index === -1) {
    return null;
  }

  insurancePolicies[index] = {
    ...insurancePolicies[index],
    ...data
  };

  return insurancePolicies[index];
};

const remove = (id) => {
  const index = insurancePolicies.findIndex(
    (policy) => policy.id === id
  );

  if (index === -1) {
    return null;
  }

  return insurancePolicies.splice(index, 1)[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};