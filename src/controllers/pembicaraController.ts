import type { Request, Response } from "express";
import type { Pembicara } from "../types/pembicara.js";

type CreatePembicaraBody = {
  nama?: string;
  jabatan?: string;
  sosialMedia?: string;
};

let pembicara: Pembicara[] = [];

export const getAllPembicara = (req: Request, res: Response) => {
  res.json(pembicara);
};

export const createPembicara = (req: Request, res: Response) => {
  try {
    const { nama, jabatan, sosialMedia } = req.body as CreatePembicaraBody;

    if (!nama || !jabatan) {
      return res.status(400).json({ message: "nama dan jabatan wajib diisi" });
    }

    const newPembicara: Pembicara = {
      id: pembicara.length + 1,
      nama,
      jabatan,
      ...(sosialMedia ? { sosialMedia } : {}),
    };

    pembicara.push(newPembicara);
    return res.status(201).json(newPembicara);
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
};

export const getPembicaraById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = pembicara.find((p) => p.id === id);

  if (!item) return res.status(404).json({ message: "Pembicara tidak ditemukan" });
  return res.json(item);
};

export const updatePembicaraById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = pembicara.findIndex((p) => p.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Pembicara tidak ditemukan" });

  const { nama, jabatan, sosialMedia } = req.body as CreatePembicaraBody;

  if (!nama || !jabatan) {
    return res.status(400).json({ message: "nama dan jabatan wajib diisi" });
  }

  pembicara[index] = {
    ...pembicara[index]!,
    id: pembicara[index]!.id,
    nama,
    jabatan,
    ...(sosialMedia ? { sosialMedia } : {}),
  };

  return res.json(pembicara[index]);
};

export const deletePembicaraById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = pembicara.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Pembicara tidak ditemukan" });

  const removed = pembicara.splice(index, 1)[0];
  return res.json(removed);
};


