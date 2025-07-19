// src/controllers/appointmentController.ts
import { Request, Response } from "express";
import { AppointmentService } from "../services/AppointmentService";
import { Appointment } from "../models/appointment";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.findAll();
    return res.json(appointments);
  } catch (error) {
    console.error("getAllAppointments error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    return res.json(appt);
  } catch (error) {
    console.error("getAppointmentById error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const newAppt = await AppointmentService.create(req.body);
    return res.status(201).json(newAppt);
  } catch (error) {
    console.error("createAppointment error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });
    await appt.update(req.body);
    return res.json(appt);
  } catch (error) {
    console.error("updateAppointment error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const deleted = await Appointment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Appointment not found" });
    return res.status(204).send();
  } catch (error) {
    console.error("deleteAppointment error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
