// src/services/AppointmentService.ts
import {
    Appointment,
    AppointmentCreationAttributes
  } from "../models/appointment";
  import { notificationService } from "./notificationService";
  
  interface CreateAppointmentDTO
    extends AppointmentCreationAttributes {
    clientEmail: string;
    date: string;
    time: string;
  }
  
  export class AppointmentService {
    static async create(payload: CreateAppointmentDTO) {
      // strip out notification‑only fields
      const { clientEmail, date, time, ...modelData } = payload;
  
      const newAppt = await Appointment.create(modelData);
  
      await notificationService.sendEmail({
        to: clientEmail,
        subject: `Appointment confirmed for ${date}`,
        text: `Your appointment on ${date} at ${time} is confirmed.`,
      });
  
      return newAppt;
    }
  }
  