const insurancePolicyModel = require("../models/insurancePolicyModel");

const getAll = (req, res, next) => {
  try {
    const policies = insurancePolicyModel.getAll();

    res.status(200).json({
      success: true,
      data: policies
    });
  } catch (error) {
    next(error);
  }
};

const getById = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      const error = new Error("ID harus berupa angka");
      error.status = 400;
      throw error;
    }

    const policy = insurancePolicyModel.getById(id);

    if (!policy) {
      const error = new Error("Polis tidak ditemukan");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: policy
    });
  } catch (error) {
    next(error);
  }
};

const create = (req, res, next) => {
  try {
    const {
      nomorPolis,
      namaPemegang,
      jenis,
      premiBulanan,
      tanggalMulai
    } = req.body;

    if (
      !nomorPolis ||
      !namaPemegang ||
      !jenis ||
      premiBulanan === undefined ||
      !tanggalMulai
    ) {
      const error = new Error(
        "Data tidak lengkap. Semua field wajib diisi."
      );

      error.status = 400;
      throw error;
    }

    if (typeof premiBulanan !== "number" || premiBulanan <= 0) {
      const error = new Error(
        "premiBulanan harus berupa angka lebih dari 0"
      );

      error.status = 400;
      throw error;
    }

    const newPolicy = insurancePolicyModel.create({
      nomorPolis,
      namaPemegang,
      jenis,
      premiBulanan,
      tanggalMulai
    });

    res.status(201).json({
      success: true,
      message: "Polis berhasil ditambahkan",
      data: newPolicy
    });
  } catch (error) {
    next(error);
  }
};

const update = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      const error = new Error("ID harus berupa angka");
      error.status = 400;
      throw error;
    }

    const existingPolicy = insurancePolicyModel.getById(id);

    if (!existingPolicy) {
      const error = new Error("Polis tidak ditemukan");
      error.status = 404;
      throw error;
    }

    const {
      nomorPolis,
      namaPemegang,
      jenis,
      premiBulanan,
      tanggalMulai
    } = req.body;

    if (
      !nomorPolis ||
      !namaPemegang ||
      !jenis ||
      premiBulanan === undefined ||
      !tanggalMulai
    ) {
      const error = new Error(
        "Data tidak lengkap. Semua field wajib diisi."
      );

      error.status = 400;
      throw error;
    }

    const updatedPolicy = insurancePolicyModel.update(id, {
      nomorPolis,
      namaPemegang,
      jenis,
      premiBulanan,
      tanggalMulai
    });

    res.status(200).json({
      success: true,
      message: "Polis berhasil diperbarui",
      data: updatedPolicy
    });
  } catch (error) {
    next(error);
  }
};

const remove = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      const error = new Error("ID harus berupa angka");
      error.status = 400;
      throw error;
    }

    const deletedPolicy = insurancePolicyModel.remove(id);

    if (!deletedPolicy) {
      const error = new Error("Polis tidak ditemukan");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Polis berhasil dihapus",
      data: deletedPolicy
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};