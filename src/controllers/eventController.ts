import type { Request, Response } from 'express';
import { prisma } from '../lib/db.js';

// 1. GET ALL WITH RELATION DATA
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const allEvents = await prisma.event.findMany({
            include: {
                category: true,
                pembicara: true
            },
            orderBy: { createdAt: "desc" },
        });
        res.json(allEvents);
    } catch (error) {
        res.status(500).json({ message: "gagal mengambil data event", error });
    }
};

// 2. CREATE EVENT
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { nama, tanggal, lokasi, description, categoryId, pembicaraId } = req.body;

        if (!nama || !tanggal || !lokasi || !categoryId || !pembicaraId) {
            return res.status(400).json({ message: "Semua parameter wajib diisi!" });
        }

        const newEvent = await prisma.event.create({
            data: {
                nama,
                lokasi,
                description,
                tanggal: new Date(tanggal),
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId)
            }
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat membuat event", error });
    }
};

// 3. GET EVENT BY ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const eventItem = await prisma.event.findUnique({
            where: { id },
            include: { category: true, pembicara: true }
        });
        if (!eventItem) return res.status(404).json({ message: "Event tidak ditemukan" });
        res.json(eventItem);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error });
    }
};

// 4. UPDATE EVENT
export const updateEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { nama, tanggal, lokasi, description, categoryId, pembicaraId } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                nama,
                lokasi,
                description,
                tanggal: new Date(tanggal),
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId)
            }
        });
        res.json(updatedEvent);
    } catch (error) {
        res.status(404).json({ message: "Event gagal diupdate, pastikan ID valid", error });
    }
};

// 5. DELETE EVENT
export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await prisma.event.delete({ where: { id } });
        res.json({ message: "Event berhasil dihapus", deleted });
    } catch (error) {
        res.status(404).json({ message: "Event gagal dihapus", error });
    }
};