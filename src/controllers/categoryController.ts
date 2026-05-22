import type { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categoryEvent.findMany({
      orderBy: { id: "asc" }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kategori", error });
  }
};

// CREATE
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { nama } = req.body;
    if (!nama) return res.status(400).json({ message: "nama wajib diisi" });

    const newCategory = await prisma.categoryEvent.create({
      data: { nama }
    });
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// GET BY ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const category = await prisma.categoryEvent.findUnique({ where: { id } });

    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// UPDATE BY ID
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nama } = req.body;

    if (!nama) return res.status(400).json({ message: "nama wajib diisi" });

    const updated = await prisma.categoryEvent.update({
      where: { id },
      data: { nama }
    });
    return res.json(updated);
  } catch (error) {
    return res.status(404).json({ message: "Kategori tidak ditemukan atau gagal diupdate", error });
  }
};

// DELETE BY ID
export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const removed = await prisma.categoryEvent.delete({ where: { id } });
    return res.json(removed);
  } catch (error) {
    return res.status(404).json({ message: "Kategori tidak ditemukan atau gagal dihapus", error });
  }
};