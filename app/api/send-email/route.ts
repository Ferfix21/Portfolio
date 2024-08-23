import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Configura el transportador de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes cambiarlo según tu servicio de correo
    auth: {
      user: process.env.EMAIL_USER, // Tu correo electrónico
      pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación (no la contraseña de la cuenta)
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // Tu correo electrónico (donde recibirás los mensajes)
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `
        <h3>Tienes un nuevo mensaje de contacto</h3>
        <p><strong>Nombre: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Mensaje: </strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Extrae información relevante del error
      console.error('Error enviando correo:', error.message);
      console.error('Detalles del error:', error);
      // También puedes imprimir el error.stack si es útil
      console.error('Stack del error:', error.stack);
      return NextResponse.json({ message: 'Error enviando correo', error: error.message }, { status: 500 });
    } else {
      console.error('Error desconocido:', error);
      return NextResponse.json({ message: 'Error enviando correo', error: 'Error desconocido' }, { status: 500 });
    }
  }
}