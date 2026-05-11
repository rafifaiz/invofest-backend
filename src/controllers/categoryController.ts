import type { Request, Response } from "express";
import type { Category } from "../types/category.js";

type CreateCategoryBody = {
  nama?: string;
};

let categories: Category[] = [];

// GET ALL
export const getAllCategories = (req: Request, res: Response) => {
  res.json(categories);
};

// menyimpan data category baru
export const createCategory = (req: Request, res: Response) => {
  try {
    const { nama } = req.body as CreateCategoryBody;

    if (!nama) {
      return res.status(400).json({ message: "nama wajib diisi" });
    }

    const newCategory: Category = {
      id: categories.length + 1,
      nama,
    };

    categories.push(newCategory);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

// menampilkan category berdasarkan id
export const getCategoryById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  return res.json(category);
};

// mengupdate data kategori berdasarkan id
export const updateCategoryById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  const { nama } = req.body as CreateCategoryBody;

  if (!nama) {
    return res.status(400).json({ message: "nama wajib diisi" });
  }

  categories[index] = {
    id: categories[index]!.id,
    nama,
  };
  return res.json(categories[index]);
};

// menghapus data category berdasarkan id
export const deleteCategoryById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Kategori tidak ditemukan" });
  }

  const removed = categories.splice(index, 1)[0];
  return res.json(removed);
};


