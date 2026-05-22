import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL
export const getAllPembicara = async (req: Request, res: Response) => {
  try {
    const listPembicara = await prisma.pembicara.findMany({ orderBy: { id: "asc" } });
    res.json(listPembicara);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error });
  }
};

// CREATE
export const createPembicara = async (req: Request, res: Response) => {
  try {
    const { nama, jabatan, sosialMedia } = req.body;
    if (!nama || !jabatan) return res.status(400).json({ message: "nama dan jabatan wajib diisi" });

    const newPembicara = await prisma.pembicara.create({
      data: { nama, jabatan, sosialMedia }
    });
    return res.status(201).json(newPembicara);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// GET BY ID
export const getPembicaraById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const item = await prisma.pembicara.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Pembicara tidak ditemukan" });
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// UPDATE
export const updatePembicaraById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nama, jabatan, sosialMedia } = req.body;

    if (!nama || !jabatan) return res.status(400).json({ message: "nama dan jabatan wajib diisi" });

    const updated = await prisma.pembicara.update({
      where: { id },
      data: { nama, jabatan, sosialMedia }
    });
    return res.json(updated);
  } catch (error) {
    return res.status(404).json({ message: "Pembicara tidak ditemukan", error });
  }
};

// DELETE
export const deletePembicaraById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const removed = await prisma.prisma.pembicara.delete({ where: { id } });
    return res.json(removed);
  } catch (error) {
    return res.status(404).json({ message: "Pembicara tidak ditemukan", error });
  }
};